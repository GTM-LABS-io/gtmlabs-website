#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../" && pwd)"
GUARD_DIR="$ROOT_DIR/.guard"

rm -f "$GUARD_DIR/unlock.key" "$GUARD_DIR/unlock.expires" || true

echo "[guard] Locked guarded files. Commits touching guarded files will be blocked until unlocked."
exit 0
