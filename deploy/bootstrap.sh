#!/usr/bin/env bash
# bootstrap.sh — one-shot bootstrap for a fresh Ubuntu box (Hetzner CX23).
#
# Run as root:
#   scp deploy/bootstrap.sh root@<server-ip>:/tmp/
#   ssh root@<server-ip> bash /tmp/bootstrap.sh
#
# What it does:
#   1. Installs system deps (Node 20, Caddy, build tools for better-sqlite3)
#   2. Creates the `lithium` user, app dir, persistent state dirs
#   3. Configures ufw, swap, sudoers (lithium → systemctl restart lithium)
#   4. Drops systemd unit, Caddyfile, env skeleton in their final locations
#
# After it finishes, follow the printed "Next steps" to clone the repo,
# fill in the env file, and trigger the first deploy.

set -euo pipefail

if [ "$EUID" -ne 0 ]; then
  echo "Run as root (use: sudo bash $0)" >&2
  exit 1
fi

DOMAIN="from-zero.emeraldlake.io"
APP_USER="lithium"
APP_DIR="/srv/lithium"
STATE_DIR="/var/lib/lithium"
ENV_DIR="/etc/lithium"
ENV_FILE="${ENV_DIR}/lithium.env"

echo "==> Updating apt"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y

echo "==> Installing base packages"
apt-get install -y \
  build-essential \
  ca-certificates \
  curl \
  git \
  gnupg \
  python3 \
  rsync \
  sqlite3 \
  ufw

echo "==> Installing Node.js 20 (NodeSource)"
if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q '^v20\.'; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

echo "==> Installing Caddy"
if ! command -v caddy >/dev/null 2>&1; then
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -y
  apt-get install -y caddy
fi

echo "==> Creating user '${APP_USER}'"
if ! id -u "${APP_USER}" >/dev/null 2>&1; then
  useradd --system --create-home --shell /bin/bash "${APP_USER}"
fi

echo "==> Creating directories"
install -d -o "${APP_USER}" -g "${APP_USER}" -m 0755 "${APP_DIR}"
install -d -o "${APP_USER}" -g "${APP_USER}" -m 0755 "${STATE_DIR}" "${STATE_DIR}/data" "${STATE_DIR}/zero"
install -d -m 0755 "${ENV_DIR}"

echo "==> Configuring swap (2 GB)"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  if ! grep -q '^/swapfile' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
  fi
fi
sysctl -w vm.swappiness=10 >/dev/null
grep -q '^vm.swappiness' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf

echo "==> Configuring ufw"
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Granting '${APP_USER}' password-less restart of lithium.service"
cat > /etc/sudoers.d/lithium <<'EOF'
lithium ALL=(root) NOPASSWD: /bin/systemctl restart lithium, /bin/systemctl status lithium, /bin/systemctl stop lithium, /bin/systemctl start lithium, /bin/systemctl reload caddy
EOF
chmod 0440 /etc/sudoers.d/lithium
visudo -c -f /etc/sudoers.d/lithium >/dev/null

echo "==> Installing systemd unit"
cp "$(dirname "$0")/lithium.service" /etc/systemd/system/lithium.service
systemctl daemon-reload
systemctl enable lithium.service

echo "==> Installing Caddyfile"
cp "$(dirname "$0")/Caddyfile" /etc/caddy/Caddyfile
systemctl restart caddy

echo "==> Seeding env file at ${ENV_FILE} (chmod 600, owner ${APP_USER})"
if [ ! -f "${ENV_FILE}" ]; then
  cp "$(dirname "$0")/lithium.env.example" "${ENV_FILE}"
  chown "${APP_USER}:${APP_USER}" "${ENV_FILE}"
  chmod 600 "${ENV_FILE}"
fi

cat <<EOF

==============================================================================
Bootstrap complete.

Next steps:

1. Point DNS A-record  ${DOMAIN}  →  this server's IP. Caddy will fetch a
   Let's Encrypt cert automatically on the next request.

2. Generate a deploy SSH key on this box (as root or as ${APP_USER}):

     sudo -u ${APP_USER} ssh-keygen -t ed25519 -f /home/${APP_USER}/.ssh/id_ed25519 -N ''
     sudo -u ${APP_USER} cat /home/${APP_USER}/.ssh/id_ed25519.pub >> /home/${APP_USER}/.ssh/authorized_keys
     sudo -u ${APP_USER} chmod 600 /home/${APP_USER}/.ssh/authorized_keys
     sudo -u ${APP_USER} cat /home/${APP_USER}/.ssh/id_ed25519       # private — paste into GH secret SSH_KEY

3. Add these GitHub repository secrets at
   https://github.com/emeraldtarek/from-zero/settings/secrets/actions:

     SSH_HOST  =  ${DOMAIN}
     SSH_USER  =  ${APP_USER}
     SSH_KEY   =  <contents of id_ed25519 (the private key)>

4. Fill in ${ENV_FILE} — at minimum set CLAUDE_CODE_OAUTH_TOKEN.
   Generate the token on your laptop with:  claude setup-token
     (paste the sk-ant-oat01-… value into the env file)

5. First deploy (run as ${APP_USER}):

     sudo -u ${APP_USER} -H bash -c '
       cd ${APP_DIR} &&
       git clone https://github.com/emeraldtarek/from-zero.git . &&
       bash deploy/deploy.sh
     '

6. From now on, every push to main triggers GH Actions → SSH → deploy.sh.

App will be live at:  https://${DOMAIN}
==============================================================================
EOF
