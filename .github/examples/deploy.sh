#!/bin/zsh
set -euo pipefail

echo "📦 Start deploying SuzuBlog ..."

# Load Environment (With nvm)
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

cd "$(dirname "$0")"

# Make sure the tarball exists
if [[ ! -f build.tar.gz ]]; then
  echo "❌ build.tar.gz not found. Deployment aborted."
  exit 1
fi

# Clean old build files (excluding this script)
echo "🧹 Cleaning old build files ..."
rm -rf .next public package.json pnpm-lock.yaml .node-version LICENSE

# Extract new build
echo "📂 Extracting build files ..."
tar -xzf build.tar.gz
rm build.tar.gz

echo "📄 Files after extraction:"
ls -alh

# Install production dependencies
echo "📦 Installing dependencies ..."
pnpm install --frozen-lockfile --ignore-scripts

echo "🕓 Writing build timestamp ..."
TIMESTAMP=$(date +"%F %T %Z")
echo "$TIMESTAMP" > .version

# Restart PM2 process
echo "🔁 Restarting PM2 process ..."
pm2 restart suzu-blog || pm2 start "pnpm start" --name suzu-blog

# Persist PM2 state across reboot
pm2 save

echo "✅ Deployment successful!"
