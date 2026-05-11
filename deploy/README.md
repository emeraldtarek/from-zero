# Deployment runbook

Target: **`from-zero.emeraldlake.io`** on a Hetzner CX23 (2 vCPU / 4 GB / 40 GB).

This directory contains everything needed to bring up the box and keep it
deploying on every push to `main`.

## Files

| File                  | Purpose                                                    |
|-----------------------|------------------------------------------------------------|
| `bootstrap.sh`        | One-shot system bootstrap. Run as root on a fresh server. Leaves Caddy on default config; TLS arrives via the harden playbook. |
| `deploy.sh`           | Idempotent deploy. Run as `lithium` user. Called by GHA.   |
| `install-origin-cert.sh` | Installs a Cloudflare Origin CA cert + the project Caddyfile on the box. Verifies cert/key pair match first. |
| `lock-origin-to-cloudflare.sh` | Replaces wide-open ufw 80/443 rules with allow-lists scoped to Cloudflare's published IP ranges. |
| `lithium.service`     | systemd unit for the Next.js process.                      |
| `Caddyfile`           | Reverse proxy + Cloudflare Origin CA TLS for the domain.   |
| `lithium.env.example` | Template for `/etc/lithium/lithium.env` (secrets live here).|

For the end-to-end Cloudflare hardening sequence (Origin CA + Full strict +
orange-cloud + UFW lockdown + Zero Trust Access), see the project skill at
[`.claude/skills/cloudflare-harden/SKILL.md`](../.claude/skills/cloudflare-harden/SKILL.md).
In Claude Code, say "harden the box" to invoke it.

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

### 1. DNS (grey cloud, temporary)

Point an `A` record for `from-zero.emeraldlake.io` at the Hetzner box's
public IP. Start in **DNS-only (grey cloud)** mode — the hardening
playbook flips it to proxied later, once the Origin CA cert is in place.

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
in place. It intentionally leaves Caddy on its default config — the
project Caddyfile references an Origin CA cert that doesn't exist yet,
so installing the Caddyfile here would crash Caddy. TLS arrives via the
harden playbook in step 7.

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

The app is now listening on `127.0.0.1:3717` but not reachable from the
internet yet — Caddy is still on its default config.

### 7. Cloudflare hardening

Open this repo in Claude Code and say **"harden the box"**, or follow
[`.claude/skills/cloudflare-harden/SKILL.md`](../.claude/skills/cloudflare-harden/SKILL.md)
manually. The playbook walks through:

1. Generate Origin CA cert (RSA 2048, valid 15 years) via Cloudflare MCP.
2. Install cert + Caddyfile on the box (`deploy/install-origin-cert.sh`).
3. Set Cloudflare SSL/TLS mode to **Full (strict)**.
4. Flip DNS to **proxied (orange cloud)**.
5. Lock UFW to Cloudflare IP ranges only (`deploy/lock-origin-to-cloudflare.sh`).
6. (Optional) Add a **Cloudflare Access** application + policy so visitors
   must authenticate before any request reaches the origin.

After this, visit <https://from-zero.emeraldlake.io>.

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
