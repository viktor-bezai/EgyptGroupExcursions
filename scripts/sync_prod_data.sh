#!/bin/bash

# === PRODUCTION DATA SYNC SCRIPT ===
# This script:
# 1. Exports data from production PostgreSQL database
# 2. Cleans local PostgreSQL database
# 3. Imports production data to local database

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# === CONFIG ===
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$SCRIPT_DIR/backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
EXPORT_FILENAME="prod-export-$DATE.sql"
EXPORT_PATH="$BACKUP_DIR/$EXPORT_FILENAME"

# Ensure we use PostgreSQL 16 tools
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

echo -e "${BLUE}🚀 Starting production data sync for EgyptGroupExcursions...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# === LOAD ENVIRONMENT FILES ===
echo -e "${YELLOW}📖 Loading environment configurations...${NC}"

# Load production environment
if [ ! -f "$PROJECT_ROOT/.env.prod" ]; then
    echo -e "${RED}❌ Error: .env.prod file not found!${NC}"
    echo -e "${YELLOW}💡 Create .env.prod with production database credentials${NC}"
    exit 1
fi

# Load local environment
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    exit 1
fi

# Function to safely read environment variables (handles Windows line endings)
read_env_var() {
    local file="$1"
    local var_name="$2"
    grep "^${var_name}=" "$file" | cut -d'=' -f2- | sed 's/^"\(.*\)"$/\1/' | tr -d '\r'
}

# Read production credentials
PROD_DBNAME=$(read_env_var "$PROJECT_ROOT/.env.prod" "DBNAME")
PROD_DBUSER=$(read_env_var "$PROJECT_ROOT/.env.prod" "DBUSER")
PROD_DBPASS=$(read_env_var "$PROJECT_ROOT/.env.prod" "DBPASS")
PROD_DBHOST=$(read_env_var "$PROJECT_ROOT/.env.prod" "DBHOST")
PROD_DBPORT=$(read_env_var "$PROJECT_ROOT/.env.prod" "DBPORT")

# Read local credentials
LOCAL_DBNAME=$(read_env_var "$PROJECT_ROOT/.env" "DBNAME")
LOCAL_DBUSER=$(read_env_var "$PROJECT_ROOT/.env" "DBUSER")
LOCAL_DBPASS=$(read_env_var "$PROJECT_ROOT/.env" "DBPASS")
LOCAL_DBHOST=$(read_env_var "$PROJECT_ROOT/.env" "DBHOST")
LOCAL_DBPORT=$(read_env_var "$PROJECT_ROOT/.env" "DBPORT")

# Override Docker-internal host/port with host-accessible values
# The .env file uses Docker service names (e.g. "db"), but this script
# runs on the host and needs to connect via the mapped port.
LOCAL_DBHOST=localhost
LOCAL_DBPORT=5433

echo -e "${GREEN}✅ Environment configurations loaded${NC}"
echo -e "   Production DB: ${PROD_DBNAME}@${PROD_DBHOST}:${PROD_DBPORT}"
echo -e "   Local DB: ${LOCAL_DBNAME}@${LOCAL_DBHOST}:${LOCAL_DBPORT}"

# === STEP 1: EXPORT FROM PRODUCTION ===
echo -e "\n${YELLOW}📤 Step 1: Exporting data from production database...${NC}"

# Test production connection first
echo -e "   Testing production database connection..."
PGPASSWORD="$PROD_DBPASS" PGSSLMODE=require pg_isready -h "$PROD_DBHOST" -p "$PROD_DBPORT" -U "$PROD_DBUSER" -d "$PROD_DBNAME"
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Cannot connect to production database!${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Production database connection successful${NC}"

# Export data from production
echo -e "   Exporting to: $EXPORT_PATH"

# Check pg_dump version
PG_DUMP_VERSION=$(pg_dump --version | grep -o '[0-9]\+\.[0-9]\+' | head -1)
echo -e "   Local pg_dump version: $PG_DUMP_VERSION"

# Export data
PGPASSWORD="$PROD_DBPASS" PGSSLMODE=require pg_dump \
    -U "$PROD_DBUSER" \
    -h "$PROD_DBHOST" \
    -p "$PROD_DBPORT" \
    --no-owner \
    --no-privileges \
    --clean \
    --if-exists \
    --no-sync \
    "$PROD_DBNAME" > "$EXPORT_PATH" 2>&1

EXPORT_STATUS=$?

# Check if export was successful
if [ -s "$EXPORT_PATH" ]; then
    EXPORT_SIZE=$(du -h "$EXPORT_PATH" | cut -f1)
    echo -e "${GREEN}✅ Production export successful: $EXPORT_PATH ($EXPORT_SIZE)${NC}"
    if [ $EXPORT_STATUS -ne 0 ]; then
        echo -e "${YELLOW}   Note: Export completed with warnings (likely due to version mismatch)${NC}"
    fi
else
    echo -e "${RED}❌ Production export failed or file is empty!${NC}"
    exit 1
fi

# === STEP 2: PREPARE LOCAL DATABASE ===
echo -e "\n${YELLOW}🧹 Step 2: Preparing local database...${NC}"

# Test local connection
echo -e "   Testing local database connection..."
echo -e "   Host: $LOCAL_DBHOST"
echo -e "   Port: $LOCAL_DBPORT"
echo -e "   Database: $LOCAL_DBNAME"
echo -e "   User: $LOCAL_DBUSER"

if ! PGPASSWORD="$LOCAL_DBPASS" psql -h "$LOCAL_DBHOST" -p "$LOCAL_DBPORT" -U "$LOCAL_DBUSER" -d "$LOCAL_DBNAME" -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${RED}❌ Cannot connect to local database!${NC}"
    echo -e "${YELLOW}💡 Make sure your local PostgreSQL server is running${NC}"
    echo -e "   You can start it with: brew services start postgresql@16"
    exit 1
fi
echo -e "${GREEN}   ✅ Local database connection successful${NC}"

# Clean local database
echo -e "\n${YELLOW}🗑️  Cleaning local database...${NC}"
echo -e "${RED}⚠️  WARNING: This will delete all data in your local database!${NC}"
echo -e "   Local database: ${LOCAL_DBNAME}@${LOCAL_DBHOST}:${LOCAL_DBPORT}"
read -p "Do you want to continue and clean the local database? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🚫 Operation cancelled by user${NC}"
    exit 0
fi

echo -e "   Terminating existing connections..."
# Terminate all connections to the database
PGPASSWORD="$LOCAL_DBPASS" psql -h "$LOCAL_DBHOST" -p "$LOCAL_DBPORT" -U "$LOCAL_DBUSER" -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$LOCAL_DBNAME' AND pid <> pg_backend_pid();" > /dev/null 2>&1

echo -e "   Dropping and recreating database..."
# Drop and recreate the database
PGPASSWORD="$LOCAL_DBPASS" psql -h "$LOCAL_DBHOST" -p "$LOCAL_DBPORT" -U "$LOCAL_DBUSER" -d postgres -c "DROP DATABASE IF EXISTS \"$LOCAL_DBNAME\";"
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to drop database!${NC}"
    exit 1
fi

PGPASSWORD="$LOCAL_DBPASS" psql -h "$LOCAL_DBHOST" -p "$LOCAL_DBPORT" -U "$LOCAL_DBUSER" -d postgres -c "CREATE DATABASE \"$LOCAL_DBNAME\";"
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to create database!${NC}"
    exit 1
fi

echo -e "${GREEN}   ✅ Local database cleaned and recreated${NC}"

# === STEP 3: IMPORT TO LOCAL DATABASE ===
echo -e "\n${YELLOW}📥 Step 3: Importing production data to local database...${NC}"

echo -e "   Source file: $EXPORT_PATH"
echo -e "   Target database: ${LOCAL_DBNAME}@${LOCAL_DBHOST}:${LOCAL_DBPORT}"

# Import data
echo -e "   Importing data..."
PGPASSWORD="$LOCAL_DBPASS" psql \
    -U "$LOCAL_DBUSER" \
    -h "$LOCAL_DBHOST" \
    -p "$LOCAL_DBPORT" \
    -d "$LOCAL_DBNAME" \
    -f "$EXPORT_PATH"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Data import successful!${NC}"
else
    echo -e "${RED}❌ Data import failed!${NC}"
    exit 1
fi

# === STEP 4: POST-IMPORT TASKS ===
echo -e "\n${YELLOW}🔧 Step 4: Post-import recommendations...${NC}"

echo -e "   ${GREEN}✅ Data import completed successfully!${NC}"
echo -e "\n${YELLOW}📋 Recommended next steps:${NC}"
echo -e "   1. Run Django migrations if needed:"
echo -e "      cd backend && python manage.py migrate"
echo -e "   2. Create a superuser if needed:"
echo -e "      cd backend && python manage.py createsuperuser"
echo -e "   3. Verify your application is working correctly"

# === CLEANUP ===
echo -e "\n${YELLOW}🧹 Cleanup...${NC}"

# Ask if user wants to keep the export file
echo -e "Export file created: $EXPORT_PATH"
read -p "Do you want to keep the export file? (Y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]]; then
    rm "$EXPORT_PATH"
    echo -e "${GREEN}   ✅ Export file removed${NC}"
else
    echo -e "${GREEN}   ✅ Export file kept: $EXPORT_PATH${NC}"
fi

# === COMPLETION ===
echo -e "\n${GREEN}🎉 Production data sync completed successfully!${NC}"
echo -e "${BLUE}📊 Summary:${NC}"
echo -e "   • Exported from: ${PROD_DBNAME}@${PROD_DBHOST}"
echo -e "   • Imported to: ${LOCAL_DBNAME}@${LOCAL_DBHOST}"
echo -e "   • Export file: $EXPORT_PATH"

echo -e "\n${GREEN}✨ Happy developing!${NC}"
