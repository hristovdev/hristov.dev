#!/bin/sh
# Keeps the dev volumes honest before handing over to the dev server.
#
# `dev_node_modules` and `dev_next` outlive image rebuilds: Docker seeds a named
# volume only when it is first created and never refreshes it afterwards. So a
# dependency change leaves both holding state from the previous lockfile.
#
# Turbopack's filesystem cache is the sharp edge. It is on by default for
# `next dev` (.next/dev/cache/turbopack) and restores the previous compilation
# on restart — including a resolution failure for a package that has since been
# installed, which then surfaces as a misleading "you first need to install X".
set -e

LOCK=/app/package-lock.json

if ! cmp -s "$LOCK" /app/node_modules/.lockstamp; then
  echo '> package-lock.json changed — reinstalling dependencies'
  npm ci
  cp "$LOCK" /app/node_modules/.lockstamp
fi

if ! cmp -s "$LOCK" /app/.next/.lockstamp; then
  echo '> dependencies changed — discarding the Turbopack cache'
  find /app/.next -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  cp "$LOCK" /app/.next/.lockstamp
fi

exec "$@"
