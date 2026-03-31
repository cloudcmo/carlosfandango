#!/bin/bash
# deploy.sh — push to GitHub (Cloudflare Pages auto-deploys from main)
set -e

MSG="${1:-Update site}"

echo "→ Adding files..."
git add -A

echo "→ Committing: $MSG"
git commit -m "$MSG" || echo "Nothing to commit."

echo "→ Pushing to GitHub..."
git push origin main

echo "✓ Done. Cloudflare Pages will deploy in ~30 seconds."
