#!/bin/bash

# Script to format all code in the project
# Run from anywhere in the project

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Starting code formatting...${NC}"
echo -e "${YELLOW}Project root: $PROJECT_ROOT${NC}"
echo ""

# Format Frontend Code
echo -e "${BLUE}Formatting Frontend (JavaScript/TypeScript)...${NC}"

if [[ -d "$PROJECT_ROOT/frontend" ]]; then
    cd "$PROJECT_ROOT/frontend"

    if command -v npm &> /dev/null; then
        echo "Running Prettier..."
        npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"
        echo -e "${GREEN}Frontend formatting complete${NC}"
    else
        echo -e "${RED}npm not found. Please install Node.js to format frontend code.${NC}"
        exit 1
    fi
else
    echo -e "${RED}Frontend directory not found at $PROJECT_ROOT/frontend${NC}"
    exit 1
fi

echo ""

# Format Backend Code
echo -e "${BLUE}Formatting Backend (Python)...${NC}"

if [[ -d "$PROJECT_ROOT/backend" ]]; then
    cd "$PROJECT_ROOT"

    if command -v ruff &> /dev/null; then
        echo "Running ruff check with fixes..."
        ruff check backend --fix

        echo "Running ruff format..."
        ruff format backend

        echo -e "${GREEN}Backend formatting complete${NC}"
    else
        echo -e "${RED}ruff not found. Install with: pip install ruff${NC}"
        exit 1
    fi
else
    echo -e "${RED}Backend directory not found at $PROJECT_ROOT/backend${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}All formatting complete!${NC}"
