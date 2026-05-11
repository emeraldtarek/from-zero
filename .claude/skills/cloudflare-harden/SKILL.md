---
name: cloudflare-harden
description: End-to-end Cloudflare hardening playbook for a self-hosted app on a single VPS reverse-proxied by Caddy. Takes a bootstrapped box from "Let's Encrypt + wide-open firewall + public site" to "Cloudflare Origin CA + Full strict TLS + proxied DNS + UFW locked to Cloudflare IPs + Zero Trust Access". Use when the user says "harden the box", "lock origin to cloudflare", "add cloudflare access", "ufw + cloudflare", "cloudflare proxy + access setup", or describes putting Cloudflare in front of a self-hosted origin. Requires the cloudflare-api MCP server (or a CF API token) and ssh root@ to the origin.
---

# Cloudflare hardening playbook

The exact sequence applied to `from-zero.emeraldlake.io` (Hetzner CX23, Caddy → Next.js). Run from a laptop that has both the Cloudflare MCP connected and SSH access to the origin.

## Parameters to collect from the user before starting

| Var | Example | How to derive |
|---|---|---|
| `HOSTNAME` | `from-zero.emeraldlake.io` | the FQDN to harden |
| `ROOT_DOMAIN` | `emeraldlake.io` | parent zone, for the CF zone lookup |
| `ORIGIN_IP` | `178.105.102.91` | server's public IP (already in DNS if grey-cloud is set) |
| `APP_PORT` | `3717` | what the reverse_proxy target is |
| `ALLOWED_EMAILS` | `tarek.kekhia@emeraldlake.io` | one or more for the Access policy |
| `SESSION_DURATION` | `720h` | CF Access cookie lifetime |
| `ZONE_ID` | `1a8035c3...` | resolved via `GET /zones?name=<ROOT_DOMAIN>` |
| `ACCOUNT_ID` | preset by MCP | exposed as `accountId` in mcp__cloudflare-api__execute |

Ask the user only for the ones that aren't obvious. Use `mcp__cloudflare-api__execute` to look up `ZONE_ID` from `ROOT_DOMAIN`. Confirm `HOSTNAME` and `ALLOWED_EMAILS` explicitly.

## Pre-flight

The origin must already be running Caddy + the app behind it on `127.0.0.1:APP_PORT`. If the box was bootstrapped by `deploy/bootstrap.sh`, Caddy is installed but no Caddyfile is in place yet (that's intentional: we install the TLS-enabled Caddyfile as part of this playbook, after the Origin CA cert exists).

Verify before proceeding:

```bash
ssh root@<ORIGIN_IP> 'systemctl is-active caddy; ss -tlnp | grep -E ":80|:443|:<APP_PORT>"; ls /etc/caddy/tls/ 2>/dev/null'
```

## The 8 steps

### 1. DNS A record (grey cloud, temporary)

```js
// in cloudflare-api MCP
await cloudflare.request({ method: "POST", path: `/zones/${ZONE_ID}/dns_records`, body: {
  type: "A", name: HOSTNAME, content: ORIGIN_IP, proxied: false, ttl: 1,
}});
```

Verify: `dig +short <HOSTNAME> @1.1.1.1` returns `ORIGIN_IP`.

### 2. Generate Origin CA cert

Run on **the laptop** (so the private key is generated locally, never round-tripped through Cloudflare):

```bash
WORK=/tmp/cf-origin-${HOSTNAME}
mkdir -p "$WORK" && cd "$WORK"
openssl req -new -newkey rsa:2048 -nodes -keyout origin.key -out origin.csr \
  -subj "/CN=${HOSTNAME}"
chmod 600 origin.key
```

POST the CSR to Cloudflare via MCP. Capture the returned cert:

```js
const csr = await fs.readFile(`${WORK}/origin.csr`, "utf8");
const r = await cloudflare.request({ method: "POST", path: "/certificates", body: {
  hostnames: [HOSTNAME],
  request_type: "origin-rsa",
  requested_validity: 5475,  // 15 years
  csr,
}});
// save r.result.certificate to ${WORK}/origin.pem
```

**Critical: do NOT use the `Write` tool to save the cert file.** Use `cat > origin.pem <<'CERT' ... CERT` via Bash. Reason: during the first attempt for this project, something clobbered the local private key with the cert content right after Write was called on the cert path. We lost the key and had to revoke + reissue. Always verify with:

```bash
openssl x509 -in origin.pem -pubkey -noout | openssl md5
openssl pkey -in origin.key -pubout 2>/dev/null | openssl md5
# the two hashes MUST match
```

Save the returned `id` from the API response so you can revoke later if needed.

### 3. Install cert + Caddyfile on origin

Use `deploy/install-origin-cert.sh` — it scps the pair and the project Caddyfile, places them with correct ownership/perms, validates Caddyfile, reloads Caddy.

```bash
bash deploy/install-origin-cert.sh /tmp/cf-origin-${HOSTNAME}/origin.pem /tmp/cf-origin-${HOSTNAME}/origin.key ${ORIGIN_IP}
```

Verify Caddy logs are clean (look for `tls.cache.maintenance` lines, ignore the benign `no OCSP stapling for [cloudflare origin certificate]: no URL to issuing certificate` warning — Origin CA certs don't carry OCSP URLs).

Sanity-check the origin is serving the new cert:

```bash
echo | openssl s_client -connect ${ORIGIN_IP}:443 -servername ${HOSTNAME} 2>/dev/null \
  | openssl x509 -noout -issuer -dates
# issuer should be: CloudFlare Origin SSL Certificate Authority
```

### 4. Cloudflare SSL/TLS mode → Full (strict)

```js
await cloudflare.request({ method: "PATCH", path: `/zones/${ZONE_ID}/settings/ssl`,
  body: { value: "strict" }});
```

### 5. Flip DNS to proxied (orange cloud)

Find the DNS record id, then PATCH it:

```js
const dns = await cloudflare.request({ method: "GET", path: `/zones/${ZONE_ID}/dns_records`, query: { name: HOSTNAME } });
const dnsId = dns.result[0].id;
await cloudflare.request({ method: "PATCH", path: `/zones/${ZONE_ID}/dns_records/${dnsId}`, body: { proxied: true } });
```

### 6. Verify edge

```bash
CF_IP=$(dig +short ${HOSTNAME} @1.1.1.1 | head -1)
curl -sS -o /dev/null -D - --resolve ${HOSTNAME}:443:${CF_IP} https://${HOSTNAME}/ \
  | grep -iE '^(http|server|cf-ray):'
# expect: HTTP/2 200, server: cloudflare, cf-ray: ...
```

Confirm visitors see a publicly-trusted edge cert (issuer will be Google Trust Services or similar — Cloudflare's edge cert provider). The Origin CA cert is now only used between Cloudflare and your box.

### 7. Lock UFW to Cloudflare IPs

Already in the repo as `deploy/lock-origin-to-cloudflare.sh`. SCP and run:

```bash
scp deploy/lock-origin-to-cloudflare.sh root@${ORIGIN_IP}:/tmp/
ssh root@${ORIGIN_IP} bash /tmp/lock-origin-to-cloudflare.sh
```

Verify direct origin hits time out:

```bash
curl -sS -o /dev/null -k --resolve ${HOSTNAME}:443:${ORIGIN_IP} \
  -w "Direct: HTTP %{http_code} in %{time_total}s\n" --max-time 10 \
  https://${HOSTNAME}/ 2>&1
# expect: timeout / errno 28 / 10s
```

### 8. Cloudflare Access (optional gate)

Use the **zone-scoped** Access endpoints — the project's MCP token has zone Access scope but not account-level Access scope:

```js
// Create the app
const app = await cloudflare.request({ method: "POST",
  path: `/zones/${ZONE_ID}/access/apps`,
  body: {
    type: "self_hosted",
    name: `Access gate for ${HOSTNAME}`,
    domain: HOSTNAME,
    session_duration: SESSION_DURATION,
    auto_redirect_to_identity: false,
    app_launcher_visible: true,
    allowed_idps: [],   // empty = all available, including the built-in One-time PIN
  },
});
const APP_ID = app.result.id;

// Create the allow policy
await cloudflare.request({ method: "POST",
  path: `/zones/${ZONE_ID}/access/apps/${APP_ID}/policies`,
  body: {
    name: "Allowlist",
    decision: "allow",
    include: ALLOWED_EMAILS.map(email => ({ email: { email } })),
    precedence: 1,
  },
});
```

Verify: unauthenticated request returns 302 to `<team>.cloudflareaccess.com/cdn-cgi/access/login/...`.

```bash
curl -sS -D - -o /dev/null --max-redirs 0 --resolve ${HOSTNAME}:443:${CF_IP} \
  https://${HOSTNAME}/ | head -5
# expect: HTTP/2 302 with location header pointing to cloudflareaccess.com
```

## Pre-existing requirements / setup steps

**Zero Trust enablement** is a one-time, dashboard-only step. If `GET /zones/${ZONE_ID}/access/apps` returns `9999: access.api.error.not_enabled`, tell the user: open https://one.dash.cloudflare.com/ → pick a team subdomain (becomes `<team>.cloudflareaccess.com`) → choose Free plan. Then re-try. No API path exists to enable Zero Trust for the first time.

## Verification checklist (run at the very end)

```bash
dig +short ${HOSTNAME} @1.1.1.1                                    # CF anycast IP
curl -I https://${HOSTNAME}                                        # 302 to <team>.cloudflareaccess.com (or 200 if no Access)
curl -k --resolve ${HOSTNAME}:443:${ORIGIN_IP} https://${HOSTNAME}/ # timeout (UFW dropping)
ssh root@${ORIGIN_IP} 'ufw status verbose | head -25'              # 80,443 only from CF ranges, 22 open
ssh root@${ORIGIN_IP} 'echo | openssl s_client -connect 127.0.0.1:443 -servername '${HOSTNAME}' 2>/dev/null | openssl x509 -noout -issuer'  # CF Origin CA
```

## Rollback recipes

| To undo | Run |
|---|---|
| Access gate | `DELETE /zones/${ZONE_ID}/access/apps/${APP_ID}` |
| UFW lockdown | restore wide-open: `ufw allow 80,443/tcp` then `ufw reload`, plus delete the CF rules (script supports `rm /var/lib/cloudflare-ufw.list` + manual rules cleanup) |
| Cloudflare proxy | PATCH dns_record `proxied: false` (grey cloud) |
| Strict SSL | PATCH `/zones/${ZONE_ID}/settings/ssl` to `"full"` or `"flexible"` |
| Origin CA cert | DELETE `/certificates/${CERT_ID}` (Cloudflare revokes; the operator still needs to swap the Caddyfile back to ACME and reload Caddy) |

## Things that look scary but aren't

- Caddy logs `no OCSP stapling for [cloudflare origin certificate]: no URL to issuing certificate` — Origin CA certs don't have OCSP URLs. Benign.
- During step 5, my local resolver may have cached NXDOMAIN. Bypass with `dig @1.1.1.1` or `curl --resolve`.
- `/user/tokens/verify` returns "Invalid API Token" through the MCP — the MCP uses a non-standard auth path; ignore.

## Things to actually fear

- **Losing the Origin CA private key.** It's never sent to Cloudflare. If lost, the cert is unusable. Revoke + reissue. Always pubkey-match cert + key right after generation.
- **Flipping the proxy on with Let's Encrypt + ACME still active.** Caddy will silently fail renewals (CF intercepts :80 for HTTP-01) and the cert eventually expires. Solution is what this playbook does: replace ACME with the Origin CA cert before flipping orange-cloud.
- **UFW-lockdown before proxy is on.** Will brick the site for everyone including the operator (Caddy can't be reached). Always do step 7 AFTER step 6 verifies the edge route works.

## Related files in this repo

- `deploy/install-origin-cert.sh` — origin-side cert + Caddyfile installer (idempotent)
- `deploy/lock-origin-to-cloudflare.sh` — UFW lockdown (idempotent, has state file)
- `deploy/Caddyfile` — the TLS-enabled Caddyfile that points at `/etc/caddy/tls/origin.{pem,key}`
- `deploy/bootstrap.sh` — fresh-box bootstrap; intentionally does NOT install the Caddyfile or start Caddy
- `deploy/README.md` — runbook that references this skill
