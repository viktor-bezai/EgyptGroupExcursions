#!/bin/bash
# Backup production PostgreSQL database from EgyptGroupExcursions server
# Usage: ./scripts/backup_prod_db.sh

set -e

SERVER_IP="64.227.119.29"
DB_NAME="egypttours"
DB_USER="egypttours"
DB_PASS='X9!rA7v@qW#2LzP$kT6hM77'
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${DB_NAME}_${TIMESTAMP}.sql"

echo "=== EgyptGroupExcursions Database Backup ==="
mkdir -p "$BACKUP_DIR"

echo "1. Creating backup from ${SERVER_IP}..."

ssh root@${SERVER_IP} "echo '${SERVER_IP}:5432:${DB_NAME}:${DB_USER}:${DB_PASS}' > /tmp/.pgpass && chmod 600 /tmp/.pgpass && PGPASSFILE=/tmp/.pgpass pg_dump -h ${SERVER_IP} -U ${DB_USER} -d ${DB_NAME} && rm /tmp/.pgpass" > "${BACKUP_DIR}/${BACKUP_FILE}"

if [ -f "${BACKUP_DIR}/${BACKUP_FILE}" ] && [ -s "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
    echo "2. Backup successful!"
    echo "   File: ${BACKUP_DIR}/${BACKUP_FILE}"
    echo "   Size: $(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)"
    echo ""
    echo "3. To restore locally:"
    echo "   ./scripts/restore_db.sh"
else
    echo "ERROR: Backup failed"
    exit 1
fi
