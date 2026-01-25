#!/bin/bash

# Push Local DB to Production
# This script dumps the local database and restores it to production.
# WARNING: This will OVERWRITE all data in production!

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(dirname "$0")"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load production credentials from .env.prod
if [ ! -f "$PROJECT_ROOT/.env.prod" ]; then
    echo -e "${RED}ERROR: .env.prod file not found at $PROJECT_ROOT/.env.prod${NC}"
    exit 1
fi

# Source production environment variables
export $(grep -v '^#' "$PROJECT_ROOT/.env.prod" | grep -E '^DB' | xargs)

# Local DB settings (from docker-compose.yml - exposed on port 5433)
LOCAL_HOST="localhost"
LOCAL_PORT="5433"
LOCAL_DB="egypttours"
LOCAL_USER="postgres"
LOCAL_PASS="postgres"

# Production DB settings (from .env.prod)
PROD_HOST="$DBHOST"
PROD_PORT="${DBPORT:-25060}"
PROD_DB="$DBNAME"
PROD_USER="$DBUSER"
PROD_PASS="$DBPASS"

# Validate production credentials
if [ -z "$PROD_HOST" ] || [ -z "$PROD_DB" ] || [ -z "$PROD_USER" ] || [ -z "$PROD_PASS" ]; then
    echo -e "${RED}ERROR: Missing production database credentials in .env.prod${NC}"
    echo "Required: DBHOST, DBNAME, DBUSER, DBPASS"
    exit 1
fi

# Backup directory
BACKUP_DIR="$PROJECT_ROOT/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="${BACKUP_DIR}/local_dump_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}========================================${NC}"
echo -e "${RED}WARNING: This will OVERWRITE all production data!${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "Local:      $LOCAL_DB @ $LOCAL_HOST:$LOCAL_PORT"
echo "Production: $PROD_DB @ $PROD_HOST:$PROD_PORT"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Aborted.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Step 1: Checking local database connection...${NC}"
PGPASSWORD="$LOCAL_PASS" psql -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -d "$LOCAL_DB" -c "SELECT 1;" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Cannot connect to local database. Is Docker running?${NC}"
    echo "Try: docker-compose up -d db"
    exit 1
fi
echo "Local database connection OK"

echo ""
echo -e "${GREEN}Step 2: Dumping local database...${NC}"
PGPASSWORD="$LOCAL_PASS" pg_dump -h "$LOCAL_HOST" -p "$LOCAL_PORT" -U "$LOCAL_USER" -d "$LOCAL_DB" \
    --no-owner --no-privileges --clean --if-exists \
    -F p -f "$DUMP_FILE"

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Failed to dump local database${NC}"
    exit 1
fi
echo "Dump created: $DUMP_FILE"

echo ""
echo -e "${GREEN}Step 3: Checking production database connection...${NC}"
PGPASSWORD="$PROD_PASS" psql -h "$PROD_HOST" -p "$PROD_PORT" -U "$PROD_USER" -d "$PROD_DB" -c "SELECT 1;" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Cannot connect to production database.${NC}"
    echo "Check your network connection and database credentials."
    exit 1
fi
echo "Production database connection OK"

echo ""
echo -e "${GREEN}Step 4: Restoring to production...${NC}"
PGPASSWORD="$PROD_PASS" psql -h "$PROD_HOST" -p "$PROD_PORT" -U "$PROD_USER" -d "$PROD_DB" -f "$DUMP_FILE"

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Failed to restore to production database${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}SUCCESS! Local database pushed to production.${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Dump file saved at: $DUMP_FILE"
