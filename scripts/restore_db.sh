#!/bin/bash
# Restore database backup to local docker-compose PostgreSQL
# Usage: ./scripts/restore_db.sh [backup_file]

set -e

BACKUP_DIR="./backups"

if [ -n "$1" ]; then
    BACKUP_FILE="$1"
else
    BACKUP_FILE=$(ls -t ${BACKUP_DIR}/*.sql 2>/dev/null | head -1)
fi

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
    echo "ERROR: No backup file found"
    echo "Usage: ./scripts/restore_db.sh [backup_file]"
    echo "Run ./scripts/backup_prod_db.sh first"
    exit 1
fi

echo "=== Restore Database ==="
echo "File: $BACKUP_FILE"

# Start db container if not running
if ! docker ps | grep -q egypt-db; then
    echo "Starting database container..."
    docker-compose up -d db
    echo "Waiting for PostgreSQL..."
    sleep 5
fi

# Recreate database
echo "Recreating database..."
docker exec egypt-db psql -U postgres -c "DROP DATABASE IF EXISTS egypttours;"
docker exec egypt-db psql -U postgres -c "CREATE DATABASE egypttours;"

# Restore - filter out restrict line and owner references
echo "Restoring data..."
grep -v '\\restrict' "$BACKUP_FILE" | sed 's/Owner: egypttours/Owner: postgres/g' | docker exec -i egypt-db psql -U postgres -d egypttours

echo ""
echo "Done! Run 'docker-compose up' to start all services."
