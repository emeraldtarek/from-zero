#!/usr/bin/env bash
# install-origin-cert.sh — install a Cloudflare Origin CA cert + the project
# Caddyfile on a remote VPS, then reload Caddy.
#
# Run from your laptop:
#   bash deploy/install-origin-cert.sh <cert.pem> <key.pem> <server-ip> [ssh-user]
#
# Idempotent. Safe to rerun on cert rotation.
#
# Assumes:
#   - The deploy/Caddyfile in this repo references /etc/caddy/tls/origin.{pem,key}
#   - You have ssh access to the box as root (or the supplied user) by key
#   - The server has caddy installed (deploy/bootstrap.sh handles that)

set -euo pipefail

CERT="${1:-}"
KEY="${2:-}"
SERVER_IP="${3:-}"
SSH_USER="${4:-root}"

if [[ -z "${CERT}" || -z "${KEY}" || -z "${SERVER_IP}" ]]; then
  cat >&2 <<USAGE
usage: $0 <cert.pem> <key.pem> <server-ip> [ssh-user=root]

example:
  $0 /tmp/cf-origin/from-zero.emeraldlake.io.pem /tmp/cf-origin/from-zero.emeraldlake.io.key 178.105.102.91
USAGE
  exit 1
fi

for f in "${CERT}" "${KEY}"; do
  [[ -f "${f}" ]] || { echo "Missing file: ${f}" >&2; exit 1; }
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CADDYFILE="${SCRIPT_DIR}/Caddyfile"
[[ -f "${CADDYFILE}" ]] || { echo "Missing ${CADDYFILE}" >&2; exit 1; }

# Sanity-check the cert + key pair before sending it anywhere.
CERT_PUB=$(openssl x509 -in "${CERT}" -pubkey -noout 2>/dev/null | openssl md5 | awk '{print $NF}')
KEY_PUB=$(openssl pkey -in "${KEY}" -pubout 2>/dev/null | openssl md5 | awk '{print $NF}')
if [[ "${CERT_PUB}" != "${KEY_PUB}" ]]; then
  echo "Cert and key do not match — aborting." >&2
  echo "  cert pubkey md5: ${CERT_PUB}" >&2
  echo "  key  pubkey md5: ${KEY_PUB}" >&2
  exit 1
fi
echo "==> cert + key pair verified (pubkey md5 ${CERT_PUB})"

REMOTE_CERT="/tmp/origin.pem.$$"
REMOTE_KEY="/tmp/origin.key.$$"
REMOTE_CADDYFILE="/tmp/Caddyfile.$$"

echo "==> scp cert, key, Caddyfile to ${SSH_USER}@${SERVER_IP}"
scp -q "${CERT}" "${SSH_USER}@${SERVER_IP}:${REMOTE_CERT}"
scp -q "${KEY}"  "${SSH_USER}@${SERVER_IP}:${REMOTE_KEY}"
scp -q "${CADDYFILE}" "${SSH_USER}@${SERVER_IP}:${REMOTE_CADDYFILE}"

echo "==> install + reload Caddy"
ssh "${SSH_USER}@${SERVER_IP}" "REMOTE_CERT='${REMOTE_CERT}' REMOTE_KEY='${REMOTE_KEY}' REMOTE_CADDYFILE='${REMOTE_CADDYFILE}' bash -s" <<'REMOTE'
set -euo pipefail

install -d -m 0750 -o caddy -g caddy /etc/caddy/tls
install -m 0640 -o caddy -g caddy "${REMOTE_CERT}" /etc/caddy/tls/origin.pem
install -m 0600 -o caddy -g caddy "${REMOTE_KEY}"  /etc/caddy/tls/origin.key
install -m 0644 -o root  -g root  "${REMOTE_CADDYFILE}" /etc/caddy/Caddyfile
rm -f "${REMOTE_CERT}" "${REMOTE_KEY}" "${REMOTE_CADDYFILE}"

caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy || systemctl restart caddy
sleep 1
echo "---- recent caddy logs ----"
journalctl -u caddy -n 12 --no-pager
REMOTE

echo
echo "==> done."
echo "    Visitors hit Cloudflare's edge cert; origin presents this Origin CA cert."
echo "    Next steps (if a fresh harden): flip CF SSL to strict, proxy DNS,"
echo "    then run deploy/lock-origin-to-cloudflare.sh on the box."
