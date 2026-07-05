#!/bin/bash
set -e

echo "📦 Publishing @vte-js/core..."
pnpm --filter @vte-js/core publish --no-git-checks --access public

echo "📦 Publishing @vte-js/vite-plugin..."
pnpm --filter @vte-js/vite-plugin publish --no-git-checks --access public

echo "📦 Publishing @vte-js/cli..."
pnpm --filter @vte-js/cli publish --no-git-checks --access public

echo "📦 Publishing @vte-js/compiler..."
pnpm --filter @vte-js/compiler publish --no-git-checks --access public

echo "📦 Publishing @vte-js/react..."
pnpm --filter @vte-js/react publish --no-git-checks --access public

echo "📦 Publishing @vte-js/language-server..."
pnpm --filter @vte-js/language-server publish --no-git-checks --access public

echo "📦 Publishing @vte-js/playground..."
pnpm --filter @vte-js/playground publish --no-git-checks --access public

echo "📦 Publishing @vte-js/vscode..."
pnpm --filter @vte-js/vscode publish --no-git-checks --access public

echo "✅ All packages published!"
