# Lithium — From Zero (learning workbench)

Next.js + SQLite app that wraps the `zero/` curriculum into an interactive
learning surface: read the corpus, track concepts, persist Q&A and a glossary,
and chat with Claude using the current page as context.

## Quick start

```bash
cd web
npm install
npm run dev
# open http://localhost:3717
```

## Authenticating the chat

The chat tries two providers, in order:

1. **Anthropic API key** — set `ANTHROPIC_API_KEY` in `web/.env.local`. This
   path also unlocks tool use (Claude can persist glossary entries, Q&A,
   concept promotions, and progress logs autonomously).
2. **Claude Code Max subscription** — falls back to
   `@anthropic-ai/claude-agent-sdk`. Two ways to authenticate:
   - Run `claude setup-token` in a terminal, copy the `sk-ant-oat01-…` token,
     and put `CLAUDE_CODE_OAUTH_TOKEN=…` in `web/.env.local`. Recommended for a
     long-lived dev-server setup.
   - Or run `claude /login` (interactive OAuth). Both routes use your
     subscription. Tool use is NOT exposed via this path.

The reading, progress tracking, glossary, Q&A, and Markdown sync all work
without any chat credentials.

## What persists where

| Artifact | DB table | Markdown mirror |
|---|---|---|
| Concepts + status | `concepts` | `zero/04-learning/knowledge-tracker.md` (regen) |
| Q&A pairs | `qa` | `zero/04-learning/questions-and-answers.md` (append) |
| Glossary | `glossary` | `zero/04-learning/glossary.md` (regen) |
| Session logs | `progress_logs` | `zero/05-meta/progress-log.md` (append) |
| Chats | `chat_sessions` / `chat_messages` | _(DB only)_ |
| Pages | `pages` (mirror of `.md`) | _read from `zero/`_ |

The DB lives at `web/data/lithium.db`. Re-sync from disk anytime via the
**Settings → Re-sync from zero/** button or `npm run ingest`.

## User-data files (the `.env.example` pattern)

The four Markdown mirrors above are **per-environment runtime state**, not
source code. They get rewritten by the app every time you chat. Treat them
like `.env` files:

- `zero/04-learning/glossary.example.md`, `knowledge-tracker.example.md`,
  `questions-and-answers.example.md`, `zero/05-meta/progress-log.example.md`
  → **committed** seed templates.
- The live files (same paths without `.example`) → **gitignored**, copied
  from the templates on first run by `bootstrapUserData()` in
  `src/lib/content-loader.ts`. You don't have to do anything manually.

**To reset to a clean slate** (locally or on a fresh deploy): delete the
live files, delete `web/data/lithium.db`, then hit any route. The next
request re-bootstraps everything from the templates + the corpus.

**On the VPS**: `git clone` gives you only the `.example.md` files. The
first chat request copies them into place, seeds the DB from the corpus,
and the app is live. No setup step needed beyond `npm install` and
setting auth in `web/.env.local`.

## Folder layout

```
web/
├── package.json
├── next.config.ts
├── src/
│   ├── app/
│   │   ├── api/           # /chat, /concepts, /glossary, /qa, /progress, /sessions, /sync
│   │   ├── read/[...slug] # markdown reader + chat sidebar
│   │   ├── progress/      # toggleable concept tracker + session log
│   │   ├── glossary/      # search + CRUD
│   │   ├── qa/            # Q&A history
│   │   ├── chat/          # full-page chat sessions
│   │   ├── settings/
│   │   └── page.tsx       # dashboard
│   ├── components/
│   │   ├── sidebar.tsx
│   │   ├── markdown-view.tsx
│   │   ├── concept-toggle.tsx
│   │   └── chat-panel.tsx
│   └── lib/
│       ├── db.ts                # sqlite + migrations
│       ├── content-loader.ts    # reads zero/ → DB
│       ├── markdown-sync.ts     # DB → zero/*.md
│       ├── repos.ts             # CRUD
│       ├── llm.ts               # streaming chat (Anthropic + Claude Code SDK)
│       ├── tutor-prompt.ts      # system prompt + tool schemas
│       └── paths.ts
└── scripts/ingest.ts            # `npm run ingest`
```
