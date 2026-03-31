#!/bin/bash

cd '/Users/carl/Dropbox/AI experiments/carlosfandango'

echo "📦 Staging changes..."
git add -A

echo "💬 Enter a commit message:"
read message

git commit -m "$message"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Done! Cloudflare Pages will deploy in ~30 seconds."
