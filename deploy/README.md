# Deployment runbook

Target: **`from-zero.emeraldlake.io`** on a Hetzner CX23 (2 vCPU / 4 GB / 40 GB).

This directory contains everything needed to bring up the box and keep it
deploying on every push to `main`.

## Files

| File                  | Purpose                                                    |
|-----------------------|------------------------------------------------------------|
| `bootstrap.sh`        | One-shot system bootstrap. Run as root on a fresh server.  |
| `deploy.sh`           | Idempotent deploy. Run as `lithium` user. Called by GHA.   |
| `lithium.service`     | systemd unit for the Next.js process.                      |
| `Caddyfile`           | Reverse proxy + auto-TLS for the domain.                   |
| `lithium.env.example` | Template for `/etc/lithium/lithium.env` (secrets live here).|

## Architecture

```
internet → :443 → caddy → 127.0.0.1:3717 → next start (lithium.service)
                                                ↓
                                  /var/lib/lithium/zero/   (curriculum, writable)
                                  /var/lib/lithium/data/   (sqlite WAL)

/srv/lithium/   ← git checkout, npm build artefacts (.next/), code
/etc/lithium/   ← env file with secrets (chmod 600)
```

The persistent state lives **outside** `/srv/lithium`, so a `git reset --hard`
during deploy never touches the running app's data.

## Bring-up — one time

### 1. DNS

Point an `A` record for `from-zero.emeraldlake.io` at the Hetzner box's
public IP. Caddy fetches a Let's Encrypt cert on first request.

### 2. System bootstrap

From your laptop:

```bash
# Copy bootstrap.sh + sibling files to the box
scp -r deploy root@<server-ip>:/tmp/

# Run it
ssh root@<server-ip> bash /tmp/deploy/bootstrap.sh
```

This installs Node 20, Caddy, build tools, creates the `lithium` user,
state dirs, swap, ufw rules, sudoers entry, and drops the systemd unit
and Caddyfile into place.

### 3. Generate the deploy SSH key (on the server)

```bash
sudo -u lithium ssh-keygen -t ed25519 -f /home/lithium/.ssh/id_ed25519 -N ''
sudo -u lithium bash -c 'cat /home/lithium/.ssh/id_ed25519.pub >> /home/lithium/.ssh/authorized_keys'
sudo -u lithium chmod 600 /home/lithium/.ssh/authorized_keys
sudo -u lithium cat /home/lithium/.ssh/id_ed25519   # private — copy this
```

### 4. Add GitHub Actions secrets

At <https://github.com/emeraldtarek/from-zero/settings/secrets/actions>:

| Secret     | Value                                          |
|------------|------------------------------------------------|
| `SSH_HOST` | `from-zero.emeraldlake.io`                     |
| `SSH_USER` | `lithium`                                      |
| `SSH_KEY`  | Contents of `id_ed25519` (the private key).    |

### 5. Fill the env file

```bash
# On your laptop
claude setup-token
# Copy the sk-ant-oat01-… token

# On the server
sudo -e /etc/lithium/lithium.env
# paste into CLAUDE_CODE_OAUTH_TOKEN=
```

### 6. First deploy

```bash
sudo -u lithium -H bash -c '
  cd /srv/lithium &&
  git clone https://github.com/emeraldtarek/from-zero.git . &&
  bash deploy/deploy.sh
'
```

Watch logs:

```bash
sudo journalctl -u lithium -f
```

Visit <https://from-zero.emeraldlake.io>.

## Day-2

### Deploy a change

```bash
git push origin main   # GH Actions handles the rest
```

### Inspect

```bash
sudo systemctl status lithium
sudo journalctl -u lithium -n 200 --no-pager
sudo journalctl -u caddy -n 100 --no-pager
```

### Backup the SQLite DB

The deploy script doesn't touch `/var/lib/lithium/data/lithium.db`. To grab
a hot backup:

```bash
sudo -u lithium sqlite3 /var/lib/lithium/data/lithium.db ".backup '/tmp/lithium-$(date +%F).db'"
```

A nightly cron is a good follow-up addition.

### Pull server-side `zero/` changes back into git

The server's `/var/lib/lithium/zero/` diverges from the repo as the app
writes glossary / Q&A / progress markdown. To bring those changes back:

```bash
rsync -avz lithium@from-zero.emeraldlake.io:/var/lib/lithium/zero/ ./zero/
git add zero && git commit -m "sync server zero/ → repo"
```

### Roll back

```bash
ssh lithium@from-zero.emeraldlake.io
cd /srv/lithium
git reset --hard <previous-commit>
bash deploy/deploy.sh
```
