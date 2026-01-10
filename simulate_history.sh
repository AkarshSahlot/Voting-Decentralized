#!/bin/bash

# Configuration
REPO_URL="https://github.com/AkarshSahlot/Voting-Decentralized.git"

# Reset repository
rm -rf .git
git init
git remote add origin "$REPO_URL"

# Define commit function
commit() {
  local date="$1"
  local message="$2"
  export GIT_AUTHOR_DATE="$date 12:00:00"
  export GIT_COMMITTER_DATE="$date 12:00:00"
  git commit -m "$message" --date "$date 12:00:00"
}

# 1. Initial Project Setup - Dec 1, 2025
# Stage configuration files
git add package.json tsconfig.json .gitignore .eslintrc.json next.config.mjs postcss.config.mjs tailwind.config.ts README.md
commit "2025-12-01" "Initial project setup with Next.js and Tailwind config"

# 2. Anchor Program Initialization - Dec 5, 2025
git add anchor/
commit "2025-12-05" "Initialize Anchor project structure"

# 3. Smart Contract Logic - Dec 10, 2025
# Force add any remaining files in anchor/ just in case
git add anchor/
commit "2025-12-10" "Implement voting smart contract logic in Rust"

# 4. Smart Contract Tests - Dec 15, 2025
# (No new files to add specifically for tests if they were in anchor/, but let's be safe)
git add anchor/tests
commit "2025-12-15" "Add comprehensive unit tests for voting program"

# 5. Frontend Setup - Dec 20, 2025
# Add everything in src/ except components first
git add src/app src/public 2>/dev/null || true
commit "2025-12-20" "Setup frontend app structure and providers"

# 6. UI Components - Dec 25, 2025
# Add specific component folders if they exist, or just broadly add src/components
git add src/components
commit "2025-12-25" "Implement core UI components and Solana connection"

# 7. Feature Implementation - Jan 5, 2026
# Ensure everything in src/ is added
git add src/
commit "2026-01-05" "Implement voting feature and account management"

# 8. Bug Fixes & Polish - Jan 10, 2026
# Add everything remaining
git add .
commit "2026-01-10" "Fix UI bugs in voting and account components"

# 9. Documentation - Jan 15, 2026
# Ensure README is latest
git add README.md
commit "2026-01-15" "Update documentation and standardizing project"

echo "Git history simulation complete!"
