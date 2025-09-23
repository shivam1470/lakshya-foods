#!/bin/bash

# Lakshya Foods - Deployment Script
# This script handles git operations and deployment to Vercel

set -e  # Exit on any error

echo "🚀 Starting deployment process for Lakshya Foods..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check git configuration
print_status "Checking git configuration..."
GIT_EMAIL=$(git config user.email)
GIT_NAME=$(git config user.name)

print_status "Git configured with:"
print_status "  Email: $GIT_EMAIL"
print_status "  Name: $GIT_NAME"

# Verify it's not a company email
if [[ $GIT_EMAIL == *"@company.com"* ]] || [[ $GIT_EMAIL == *"@work.com"* ]]; then
    print_error "Please configure git with your personal email:"
    print_error "  git config user.email 'your-personal@email.com'"
    exit 1
fi

# Get commit message from user or use default
COMMIT_MSG=${1:-"feat: add admin dashboard system with user and order management"}

print_status "Using commit message: '$COMMIT_MSG'"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_status "Found uncommitted changes. Staging all files..."
    git add .
else
    print_warning "No uncommitted changes found."
fi

# Build the project to check for errors
print_status "Building project to verify everything works..."
if npm run build; then
    print_success "Build successful!"
else
    print_error "Build failed! Please fix errors before deploying."
    exit 1
fi

# Commit changes
if [ -n "$(git status --porcelain --cached)" ]; then
    print_status "Committing changes..."
    git commit -m "$COMMIT_MSG"
    print_success "Changes committed successfully!"
else
    print_warning "No staged changes to commit."
fi

# Push to GitHub
print_status "Pushing to GitHub..."
if git push origin main; then
    print_success "Successfully pushed to GitHub!"
else
    print_error "Failed to push to GitHub. Please check your remote configuration."
    exit 1
fi

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    print_status "Vercel CLI found. Deploying to Vercel..."
    
    # Deploy to Vercel
    if vercel --prod; then
        print_success "Successfully deployed to Vercel!"
    else
        print_warning "Vercel deployment failed or was cancelled."
    fi
else
    print_warning "Vercel CLI not found. Install it with: npm i -g vercel"
    print_status "Manual deployment options:"
    print_status "1. Install Vercel CLI: npm i -g vercel"
    print_status "2. Or connect your GitHub repo to Vercel dashboard"
    print_status "3. Or deploy to other platforms like Netlify, Railway, etc."
fi

# Display helpful information
print_success "Deployment process completed!"
print_status ""
print_status "📋 Next steps:"
print_status "1. Check GitHub repository for the latest code"
print_status "2. Verify deployment on your hosting platform"
print_status "3. Test the admin dashboard at /admin (requires admin user)"
print_status "4. Monitor for any production issues"
print_status ""
print_status "🔗 Useful links:"
print_status "- GitHub Repo: $(git config --get remote.origin.url)"
print_status "- Admin Dashboard: [your-domain]/admin"
print_status "- User Management: [your-domain]/admin/users"
print_status "- Order Management: [your-domain]/admin/orders"
print_status ""
print_success "🎉 Happy deploying!"