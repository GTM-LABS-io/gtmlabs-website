#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../" && pwd)"
GUARD_DIR="$ROOT_DIR/.guard"
KEY_FILE="$GUARD_DIR/unlock.key"
EXP_FILE="$GUARD_DIR/unlock.expires"

# Files or globs to guard (space-separated)
GUARDED_FILES=(
  "homepage/components/ui/how-it-works-timeline.tsx"
)

# If none of the guarded files are staged, exit early
CHANGED=$(git diff --cached --name-only || true)
NEEDS_CHECK=0
for f in "${GUARDED_FILES[@]}"; do
  if echo "$CHANGED" | grep -q "^$f$"; then
    NEEDS_CHECK=1
    break
  fi
done

if [[ "$NEEDS_CHECK" -eq 0 ]]; then
  exit 0
fi

# Load optional env-based key from .env.local / .env
for envf in "$ROOT_DIR/.env.local" "$ROOT_DIR/.env"; do
    # shellcheck disable=SC1090
    set -a; . "$envf"; set +a
  fi
done

# ENV toggle takes precedence: simple ON/OFF lock
LOCK_STATE=${GUARD_LOCK:-on}
case "${LOCK_STATE,,}" in
  off|false|0)
    # Unlocked: allow guarded file edits
    exit 0
    ;;
  on|true|1)
    echo "\n[guard] Guard is ON (GUARD_LOCK=on). Edits to guarded files are blocked.\n" >&2
    echo "[guard] To allow edits temporarily, set GUARD_LOCK=off in .env or .env.local, then commit again." >&2
    exit 1
    ;;
  *)
    # Fallback to legacy key-based flow if someone sets a custom value
    :
    ;;
esac

# Legacy key-based flow (kept for backward compatibility)
if [[ ! -f "$KEY_FILE" || ! -f "$EXP_FILE" ]]; then
  if [[ -n "${GUARD_UNLOCK_KEY:-}" ]]; then
    mkdir -p "$GUARD_DIR"
    NOW_TS=$(date +%s)
    TTL_MINUTES=${GUARD_UNLOCK_TTL:-60}
    EXP_TS=$(( NOW_TS + TTL_MINUTES * 60 ))
    echo "$GUARD_UNLOCK_KEY" > "$KEY_FILE"
    echo "$EXP_TS" > "$EXP_FILE"
    echo "[guard] Using GUARD_UNLOCK_KEY from .env for $TTL_MINUTES minutes (until $(date -r \"$EXP_TS\"))." >&2
  else
    echo "\n[guard] Changes to guarded files detected, but no unlock key present.\n" >&2
    echo "[guard] Either set GUARD_LOCK=off in .env (recommended), or unlock via: npm run guard:unlock -- <KEY> --ttl-minutes 60\n" >&2
    exit 1
  fi
fi

NOW_TS=$(date +%s)
if [[ "$NOW_TS" -gt "$EXP_TS" ]]; then
  echo "\n[guard] Unlock key expired. Please request a new key.\n" >&2
  exit 1
fi

# Optional: lightweight sanity check on the key string
KEY=$(cat "$KEY_FILE")
if [[ ${#KEY} -lt 8 ]]; then
  echo "\n[guard] Invalid key (too short).\n" >&2
  exit 1
fi

# Passed
exit 0
