#!/usr/bin/env bash
# deploy.sh — idempotent deploy. Runs as the `lithium` user inside /srv/lithium.
#
# Invoked by:
#   - GitHub Actions (.github/workflows/deploy.yml) on every push to main
#   - Manually for a first deploy or recovery:  bash deploy/deploy.sh

set -euo pipefail

APP_DIR="/srv/lithium"
WEB_DIR="${APP_DIR}/web"
STATE_DIR="/var/lib/lithium"
ZERO_STATE="${STATE_DIR}/zero"
ENV_FILE="/etc/lithium/lithium.env"

cd "${APP_DIR}"

echo "==> [deploy] git fetch + reset to origin/main"
git fetch --prune origin
git reset --hard origin/main

echo "==> [deploy] First-run seed of ${ZERO_STATE} (if empty)"
if [ -z "$(ls -A "${ZERO_STATE}" 2>/dev/null)" ]; then
  echo "    seeding from ${APP_DIR}/zero"
  rsync -a --delete "${APP_DIR}/zero/" "${ZERO_STATE}/"
else
  echo "    already populated — leaving live state untouched"
fi

echo "==> [deploy] npm ci"
cd "${WEB_DIR}"
npm ci --include=dev --no-audit --no-fund

echo "==> [deploy] next build"
NEXT_TELEMETRY_DISABLED=1 npm run build

echo "==> [deploy] re-ingest curriculum into SQLite"
# `npm run ingest` now also: bootstraps the user-data live files from
# their .example.md siblings, builds the corpus_node + corpus_fts tree
# (PageIndex-style nav index), and regenerates the live mirror files.
set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a
npm run ingest

echo "==> [deploy] (re)generate LLM summaries for corpus nodes"
# Idempotent — skips any node whose content_hash already has a cached
# summary. Falls back gracefully when auth is missing.
# Disable entirely with LITHIUM_SKIP_SUMMARIZE=1 in the env file.
if [ "${LITHIUM_SKIP_SUMMARIZE:-0}" = "1" ]; then
  echo "    LITHIUM_SKIP_SUMMARIZE=1 set, skipping"
elif [ -z "${ANTHROPIC_API_KEY:-}" ] && [ -z "${CLAUDE_CODE_OAUTH_TOKEN:-}" ]; then
  echo "    no ANTHROPIC_API_KEY or CLAUDE_CODE_OAUTH_TOKEN — skipping (app uses first-sentence summaries)"
else
  # Soft-fail: a transient auth/rate-limit error must not block the deploy.
  npm run summarize || echo "    [warn] summarize failed, continuing deploy"
fi

echo "==> [deploy] restart lithium.service"
sudo systemctl restart lithium

echo "==> [deploy] done"
systemctl --no-pager --lines=10 status lithium || true
