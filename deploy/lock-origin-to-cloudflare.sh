#!/usr/bin/env bash
# lock-origin-to-cloudflare.sh
#
# Replaces the wide-open ufw rules for ports 80/443 with allow-lists scoped
# to Cloudflare's published IP ranges (cloudflare.com/ips-v4 + ips-v6).
# Port 22 stays open to the world so you don't lock yourself out and so
# GitHub Actions can still SSH in.
#
# Run as root:
#   sudo bash /srv/lithium/deploy/lock-origin-to-cloudflare.sh
#
# Idempotent: rerun monthly (or via cron) to pick up Cloudflare IP changes.
# A state file at /var/lib/cloudflare-ufw.list tracks the last applied set so
# stale entries can be pruned cleanly.
#
# Pre-reqs:
#   - DNS for your hostname is proxied through Cloudflare (orange cloud)
#   - Cloudflare SSL/TLS mode is "Full (strict)"
#   - You've already verified the site is reachable via Cloudflare.
#     If any of these aren't true yet, do NOT run this script — you'll
#     cut off legitimate traffic.

set -euo pipefail

if [ "$EUID" -ne 0 ]; then
  echo "Run as root (sudo bash $0)" >&2
  exit 1
fi

CF_V4_URL="https://www.cloudflare.com/ips-v4"
CF_V6_URL="https://www.cloudflare.com/ips-v6"
STATE_FILE="/var/lib/cloudflare-ufw.list"
COMMENT="cloudflare-origin"

command -v ufw >/dev/null || { echo "ufw not installed" >&2; exit 1; }
command -v curl >/dev/null || { echo "curl not installed" >&2; exit 1; }

# 1. Fetch fresh Cloudflare IP ranges. Fail BEFORE touching the firewall.
echo "==> Fetching Cloudflare IP ranges"
CF_V4=$(curl -fsSL --max-time 10 "${CF_V4_URL}")
CF_V6=$(curl -fsSL --max-time 10 "${CF_V6_URL}")

if [ -z "${CF_V4// }" ]; then
  echo "Empty IPv4 list — aborting" >&2
  exit 1
fi

NEW_LIST=$(printf "%s\n%s\n" "${CF_V4}" "${CF_V6}" | grep -E '^[0-9a-fA-F:.]+/[0-9]+$' | sort -u)
NEW_COUNT=$(echo "${NEW_LIST}" | wc -l | tr -d ' ')
echo "    got ${NEW_COUNT} ranges"

# 2. Add the new allow-list rules FIRST (additive, no window of exposure loss).
echo "==> Adding allow rules for Cloudflare ranges"
while IFS= read -r ip; do
  [ -z "${ip}" ] && continue
  ufw allow proto tcp from "${ip}" to any port 80,443 comment "${COMMENT}" >/dev/null
done <<< "${NEW_LIST}"

# 3. Remove the wide-open 80/443 rules from bootstrap (if still present).
echo "==> Removing wide-open port 80/443 rules"
ufw delete allow 80/tcp >/dev/null 2>&1 || true
ufw delete allow 443/tcp >/dev/null 2>&1 || true
ufw delete allow 80 >/dev/null 2>&1 || true
ufw delete allow 443 >/dev/null 2>&1 || true

# 4. Prune stale CF rules (IPs in old state file but not in new list).
if [ -f "${STATE_FILE}" ]; then
  STALE=$(comm -23 <(sort "${STATE_FILE}") <(echo "${NEW_LIST}" | sort))
  if [ -n "${STALE}" ]; then
    echo "==> Pruning $(echo "${STALE}" | wc -l | tr -d ' ') stale CF ranges"
    while IFS= read -r ip; do
      [ -z "${ip}" ] && continue
      ufw delete allow proto tcp from "${ip}" to any port 80,443 >/dev/null 2>&1 || true
    done <<< "${STALE}"
  fi
fi

# 5. Persist current list for next run.
install -d -m 0755 "$(dirname "${STATE_FILE}")"
echo "${NEW_LIST}" > "${STATE_FILE}"

# 6. Reload.
ufw reload >/dev/null

echo
echo "==> Done. ufw status:"
ufw status verbose | head -40
