#!/usr/bin/env bash
# Installs the packed tarball into a throwaway VitePress site — the way a real
# consumer would, from node_modules, with no workspace links — and builds it.
#
#   scripts/smoke-consumer.sh <vitepress-version>
#
# This is what catches a missing file in `files`, an export that points at
# nothing, or a theme that only compiles because the workspace resolves it
# from source.
set -euo pipefail

VITEPRESS="${1:?usage: smoke-consumer.sh <vitepress-version>}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

(cd "$ROOT" && pnpm pack --pack-destination "$WORK" >/dev/null)
TARBALLS=("$WORK"/vaam-apps-vitepress-md3-*.tgz)
TARBALL="${TARBALLS[0]}"

cp -R "$ROOT/test/consumer" "$WORK/site"
cd "$WORK/site"
cat >package.json <<JSON
{ "name": "consumer", "private": true, "type": "module" }
JSON
npm install --no-audit --no-fund --loglevel=error "$TARBALL" "vitepress@$VITEPRESS" vue >/dev/null
npx vitepress build . >/dev/null

HTML=".vitepress/dist/page.html"
grep -q 'data-md3-style="standard"' "$HTML" || {
  echo "::error::style not stamped on <html>"
  exit 1
}
grep -q 'id="md3-tokens"' "$HTML" || {
  echo "::error::token sheet not inlined"
  exit 1
}
grep -q -- '--md-sys-color-primary:' "$HTML" || {
  echo "::error::colour tokens missing"
  exit 1
}
grep -q 'project-card' "$HTML" || {
  echo "::error::ProjectGrid did not render"
  exit 1
}
grep -q -- '--md3-shape-cookie-9' .vitepress/dist/assets/style.*.css || {
  echo "::error::theme CSS missing from the bundle"
  exit 1
}
echo "consumer site built with vitepress@$VITEPRESS"
