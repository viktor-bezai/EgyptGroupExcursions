# EgyptGroupExcursions Deployment Guide

Deploy to the same droplet as VIB and EnglishPreparation.

## Quick Reference

| | |
|---|---|
| **Server IP** | 174.138.113.224 |
| **SSH** | `ssh root@174.138.113.224` |
| **App path** | /home/deploy/egypt |
| **Backend port** | 8003 |
| **Frontend port** | 3003 |
| **Database** | External PostgreSQL at 64.227.119.29 |

## Port Allocation (Shared Server)

| App                | Backend | Frontend |
|--------------------|---------|----------|
| EnglishPreparation | 8001    | 3001     |
| VIB                | 8002    | 3002     |
| **EgyptGroupExcursions** | **8003** | **3003** |

---

## Step 1: Get a Domain

Purchase a domain (e.g., `egypt-tours.com`) and point it to `174.138.113.224` in Cloudflare:

1. Add A record: `@` → `174.138.113.224` (grey cloud - DNS only)
2. Add A record: `www` → `174.138.113.224` (grey cloud - DNS only)

## Step 2: Get SSL Certificate

```bash
ssh root@174.138.113.224

# Stop nginx temporarily
systemctl stop nginx

# Get SSL certificate (replace YOUR_DOMAIN)
certbot certonly --standalone -d YOUR_DOMAIN -d www.YOUR_DOMAIN

# Start nginx
systemctl start nginx
```

## Step 3: Configure nginx

```bash
# Copy nginx template and replace YOUR_DOMAIN
cd /home/deploy/egypt/server-configs/nginx
sed 's/YOUR_DOMAIN/your-actual-domain.com/g' YOUR_DOMAIN.template > /etc/nginx/sites-available/your-actual-domain.com

# Enable site
ln -s /etc/nginx/sites-available/your-actual-domain.com /etc/nginx/sites-enabled/

# Test and reload
nginx -t
systemctl reload nginx
```

## Step 4: Update Configuration Files

### Update .env.prod
```bash
cd /home/deploy/egypt
nano .env.prod
# Replace YOUR_DOMAIN with actual domain
```

### Update backend/config/settings.py
Add your domain to `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`:
```python
ALLOWED_HOSTS = [
    "your-domain.com",
    "www.your-domain.com",
    ...
]
```

### Update frontend/next.config.js
Add your domain to `images.remotePatterns`.

## Step 5: Clone Repository (First Time)

```bash
ssh root@174.138.113.224
cd /home/deploy
git clone https://github.com/YOUR_USERNAME/EgyptGroupExcursions.git egypt
git config --global --add safe.directory /home/deploy/egypt
```

## Step 6: Configure GitHub Secrets

Go to GitHub → Repository → Settings → Secrets → Actions

| Secret | Value |
|--------|-------|
| `VPS_HOST` | 174.138.113.224 |
| `VPS_USER` | root |
| `VPS_SSH_KEY` | Your SSH private key (id_ed25519) |
| `VPS_PORT` | 22 |
| `SECRET_KEY` | Your Django secret key |
| `DBNAME` | egypttours |
| `DBUSER` | egypttours |
| `DBPASS` | Your database password |
| `DBHOST` | 64.227.119.29 |
| `OPENAI_API_KEY` | Your OpenAI key |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID |
| `NEXT_PUBLIC_API_BASE_URL` | https://your-domain.com/api/v1 |
| `NEXT_PUBLIC_MEDIA_URL` | https://your-domain.com |

## Step 7: First Deployment

```bash
cd /home/deploy/egypt
cp .env.prod .env
# Edit .env with correct values
nano .env

# Build and start
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker ps
```

## Step 8: Enable Cloudflare Proxy

After everything works:
1. Switch DNS records to orange cloud (Proxied)
2. Set SSL mode to "Full (strict)" in Cloudflare

---

## Maintenance Commands

```bash
# View logs
docker logs egypt-backend
docker logs egypt-frontend

# Restart containers
cd /home/deploy/egypt
docker-compose -f docker-compose.prod.yml restart

# Reload nginx
systemctl reload nginx

# Check SSL
certbot certificates
```

## Checklist

- [ ] Domain purchased and DNS configured
- [ ] SSL certificate obtained
- [ ] nginx config created and enabled
- [ ] .env.prod updated with domain
- [ ] backend settings.py updated with domain
- [ ] frontend next.config.js updated with domain
- [ ] GitHub secrets configured
- [ ] First deployment successful
- [ ] Cloudflare proxy enabled
