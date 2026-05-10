# Lithium — From Zero

A learning workbench that wraps a from-scratch chemistry → lithium-isotope-separation
curriculum into an interactive Next.js + SQLite app, with Claude as a tutor.

## Layout

| Path     | What it is                                                                  |
|----------|-----------------------------------------------------------------------------|
| `web/`   | Next.js 15 + React 19 + Tailwind v4 app. SQLite via `better-sqlite3`.       |
| `zero/`  | Markdown curriculum + learning artefacts. App reads/writes here at runtime. |
| `deploy/`| Server bootstrap, deploy script, systemd unit, Caddyfile, runbook.          |
| `.github/workflows/` | CI (typecheck + build) and CD (SSH deploy to Hetzner).          |

## Local dev

```bash
cd web
npm install
npm run dev          # http://localhost:3717
```

See [`web/README.md`](./web/README.md) for app-level details and chat auth.

## Production

Deployed to `from-zero.emeraldlake.io` on a Hetzner CX23 box. See
[`deploy/README.md`](./deploy/README.md) for the bring-up runbook.

CI runs on every push and PR. Pushes to `main` auto-deploy via SSH.
