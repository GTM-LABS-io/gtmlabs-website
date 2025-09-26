#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   npm run guard:unlock -- <KEY> [--ttl-minutes 60]
# Example:
#   npm run guard:unlock -- my-secret-key --ttl-minutes 45

KEY=""
TTL_MINUTES=60

while [[ $# -gt 0 ]]; do
  case "$1" in
    --ttl-minutes)
      TTL_MINUTES="$2"; shift 2 ;;
    *)
      if [[ -z "$KEY" ]]; then KEY="$1"; shift; else shift; fi ;;
  esac
done

if [[ -z "$KEY" ]]; then
  echo "[guard] Missing key. Usage: npm run guard:unlock -- <KEY> [--ttl-minutes 60]" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/../../" && pwd)"
GUARD_DIR="$ROOT_DIR/.guard"
mkdir -p "$GUARD_DIR"

NOW_TS=$(date +%s)
EXP_TS=$(( NOW_TS + TTL_MINUTES * 60 ))

echo "$KEY" > "$GUARD_DIR/unlock.key"
echo "$EXP_TS" > "$GUARD_DIR/unlock.expires"

echo "[guard] Unlocked guarded files for $TTL_MINUTES minutes (until $(date -r "$EXP_TS"))"
exit 0
