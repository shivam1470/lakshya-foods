#!/bin/bash

# Quick Deploy Script for Lakshya Foods
# Usage: ./quick-deploy.sh "Your commit message"

set -e

# Default commit message
COMMIT_MSG=${1:-"update: latest changes"}

echo "🚀 Quick deploying with message: '$COMMIT_MSG'"

# Add all changes
git add .

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    # Commit
    git commit -m "$COMMIT_MSG"
    echo "✅ Changes committed"
else
    echo "ℹ️  No changes to commit"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main
echo "✅ Pushed to GitHub successfully!"

# If Vercel CLI is available, deploy
if command -v vercel &> /dev/null; then
    echo "🌐 Deploying to Vercel..."
    vercel --prod
else
    echo "ℹ️  Install Vercel CLI with: npm i -g vercel"
fi

echo "🎉 Deployment complete!"