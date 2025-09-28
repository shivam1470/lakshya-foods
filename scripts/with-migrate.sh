#!/usr/bin/env bash
set -euo pipefail

echo "[with-migrate] NODE_ENV=${NODE_ENV:-}" >&2
if [ -z "${DATABASE_URL:-}" ]; then
  echo "[with-migrate] DATABASE_URL not set; skipping migrate deploy" >&2
  exec "$@"
fi

if echo "$DATABASE_URL" | grep -qiE '^postgresql://|^postgres://'; then
  echo "[with-migrate] Detected postgres connection string. Running prisma migrate deploy..." >&2
  npx prisma migrate deploy || { echo "[with-migrate] migrate deploy failed" >&2; exit 1; }
else
  echo "[with-migrate] DATABASE_URL does not look like postgres; skipping migrate deploy" >&2
fi

exec "$@"
