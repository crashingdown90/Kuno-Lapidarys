# 🚀 VPS Deployment Guide - KUNO Lapidary

## 📋 Overview

This guide covers deploying the KUNO Lapidary website to your VPS (Virtual Private Server). The application is built with **Astro** and configured for **Node.js** deployment.

---

## ✅ Prerequisites

### VPS Requirements:
- **OS**: Ubuntu 20.04+ or Debian 11+ (recommended)
- **RAM**: Minimum 1GB, Recommended 2GB+
- **Node.js**: v18.x or v20.x (LTS)
- **PM2**: Process manager for Node.js
- **Nginx**: Web server & reverse proxy
- **Git**: For deployment
- **Domain**: Pointed to your VPS IP

### Local Requirements:
- Git repository connected to VPS
- SSH access to VPS

---

## 🔧 Server Setup (One-Time)

### 1. Connect to VPS

```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

### 2. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Install Node.js (v20 LTS)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### 4. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### 5. Install Nginx

```bash
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### 6. Install Git (if not already)

```bash
sudo apt install -y git
git --version
```

### 7. Setup Deployment Directory

```bash
# Create directory for the application
sudo mkdir -p /var/www/kunolapidary
sudo chown -R $USER:$USER /var/www/kunolapidary

# Navigate to directory
cd /var/www/kunolapidary
```

---

## 📦 Deploy Application

### 1. Clone Repository

```bash
cd /var/www/kunolapidary

# Clone your repository
git clone https://github.com/crashingdown90/Kuno-Lapidarys.git .

# Or if already cloned, pull latest changes
git pull origin claude/analisa-c-011CV5cLHtnuq1R1XUkaSRKY
```

### 2. Setup Environment Variables

```bash
# Create .env file
nano .env

# Add the following (replace with your actual values):
```

```env
# Sanity CMS Configuration
SANITY_PROJECT_ID=ggfp8446
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=your_optional_read_token_here

# Google Analytics (Optional)
PUBLIC_GA4_ID=G-XXXXXXXXXX

# Email Configuration (Choose one provider)
# EMAIL_API_KEY=your_email_api_key
# EMAIL_FROM=info@kunolapidary.com
# EMAIL_TO=info@kunolapidary.com

# Site Configuration
PUBLIC_SITE_URL=https://kunolapidary.com

# Node Environment
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

**Save and exit** (Ctrl+X, then Y, then Enter)

### 3. Install Dependencies

```bash
npm install --production
```

### 4. Build Application

```bash
npm run build
```

Expected output:
```
✓ Completed in X.XXs
Server built in X.XXs
Complete!
```

### 5. Test Application

```bash
# Start in preview mode to test
npm run preview

# Open another terminal and test
curl http://localhost:4321

# If successful, stop the preview (Ctrl+C)
```

### 6. Start with PM2

```bash
# Start the application
pm2 start npm --name "kunolapidary" -- run preview

# Or for custom port:
pm2 start npm --name "kunolapidary" -- run preview -- --port 3000 --host 0.0.0.0

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Copy and run the command PM2 outputs

# Check status
pm2 status
pm2 logs kunolapidary --lines 50
```

---

## 🌐 Configure Nginx

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/kunolapidary.com
```

### 2. Add Configuration

```nginx
# HTTP Server (redirects to HTTPS)
server {
    listen 80;
    listen [::]:80;
    server_name kunolapidary.com www.kunolapidary.com;

    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name kunolapidary.com www.kunolapidary.com;

    # SSL Configuration (Let's Encrypt certificates)
    ssl_certificate /etc/letsencrypt/live/kunolapidary.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kunolapidary.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Root directory
    root /var/www/kunolapidary/dist/client;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript image/svg+xml;

    # Serve static files
    location /_astro/ {
        alias /var/www/kunolapidary/dist/client/_astro/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        alias /var/www/kunolapidary/dist/client/images/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # API routes and dynamic content - proxy to Node.js
    location / {
        try_files $uri $uri/ @nodejs;
    }

    location @nodejs {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Contact form API
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Logs
    access_log /var/log/nginx/kunolapidary-access.log;
    error_log /var/log/nginx/kunolapidary-error.log;
}
```

**Save and exit** (Ctrl+X, Y, Enter)

### 3. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/kunolapidary.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If test successful, reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 Setup SSL with Let's Encrypt

### 1. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
# Get certificate for your domain
sudo certbot --nginx -d kunolapidary.com -d www.kunolapidary.com

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect option (2) for HTTPS
```

### 3. Test Auto-Renewal

```bash
# Dry run renewal
sudo certbot renew --dry-run
```

Certificates will auto-renew every 90 days.

---

## 🔄 Update Deployment (When Code Changes)

### Method 1: Manual Git Pull

```bash
# SSH to VPS
ssh user@your-vps-ip

# Navigate to project
cd /var/www/kunolapidary

# Pull latest changes
git pull origin claude/analisa-c-011CV5cLHtnuq1R1XUkaSRKY

# Install any new dependencies
npm install --production

# Rebuild
npm run build

# Restart PM2
pm2 restart kunolapidary

# Check logs
pm2 logs kunolapidary --lines 50
```

### Method 2: Deployment Script

Create `/var/www/kunolapidary/deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code from Git..."
git pull origin claude/analisa-c-011CV5cLHtnuq1R1XUkaSRKY

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart kunolapidary

# Show status
pm2 status

echo "✅ Deployment complete!"
echo "📊 Check logs with: pm2 logs kunolapidary"
```

Make executable and run:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Method 3: GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ claude/analisa-c-011CV5cLHtnuq1R1XUkaSRKY ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/kunolapidary
            git pull origin claude/analisa-c-011CV5cLHtnuq1R1XUkaSRKY
            npm install --production
            npm run build
            pm2 restart kunolapidary
```

Add secrets in GitHub repository settings:
- `VPS_HOST`: Your VPS IP
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Your SSH private key

---

## 📊 Monitoring & Maintenance

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs kunolapidary
pm2 logs kunolapidary --lines 100
pm2 logs kunolapidary --err  # Error logs only

# Monitor resources
pm2 monit

# Restart
pm2 restart kunolapidary

# Stop
pm2 stop kunolapidary

# Delete process
pm2 delete kunolapidary

# List all processes
pm2 list
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View access logs
sudo tail -f /var/log/nginx/kunolapidary-access.log

# View error logs
sudo tail -f /var/log/nginx/kunolapidary-error.log
```

### System Monitoring

```bash
# Disk usage
df -h

# Memory usage
free -h

# CPU and process monitoring
htop  # or: top

# Check open ports
sudo netstat -tulpn | grep LISTEN
```

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Find process using port
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>

# Restart PM2
pm2 restart kunolapidary
```

### Issue: Application Not Starting

```bash
# Check PM2 logs
pm2 logs kunolapidary --err

# Check environment variables
cat .env

# Rebuild application
npm run build

# Restart with logs
pm2 restart kunolapidary && pm2 logs kunolapidary
```

### Issue: 502 Bad Gateway

```bash
# Check if Node.js is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/kunolapidary-error.log

# Verify proxy_pass port matches application port
sudo nano /etc/nginx/sites-available/kunolapidary.com
```

### Issue: SSL Certificate Errors

```bash
# Renew certificates
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal

# Restart Nginx
sudo systemctl restart nginx
```

### Issue: High Memory Usage

```bash
# Check memory
free -h

# Restart application
pm2 restart kunolapidary

# Set memory limit (e.g., 512MB)
pm2 restart kunolapidary --max-memory-restart 512M
pm2 save
```

---

## 🔐 Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key authentication enabled
- [ ] Root login disabled
- [ ] SSL/TLS certificates installed
- [ ] Security headers configured in Nginx
- [ ] Environment variables secured (.env not in Git)
- [ ] Regular system updates scheduled
- [ ] Fail2ban installed (optional)
- [ ] Regular backups configured
- [ ] Monitoring/alerts setup

---

## 📈 Performance Optimization

### 1. Enable HTTP/2

Already enabled in Nginx config with `http2` directive.

### 2. Configure PM2 Clustering

```bash
# Use cluster mode for multiple CPU cores
pm2 delete kunolapidary
pm2 start npm --name "kunolapidary" -i max -- run preview
pm2 save
```

### 3. Setup Redis Caching (Optional)

```bash
# Install Redis
sudo apt install -y redis-server

# Start Redis
sudo systemctl start redis
sudo systemctl enable redis
```

### 4. CDN Integration

Consider using Cloudflare for:
- Global CDN
- DDoS protection
- Additional caching
- Automatic HTTPS

---

## 📋 Quick Command Reference

```bash
# Deploy updates
cd /var/www/kunolapidary && git pull && npm install --production && npm run build && pm2 restart kunolapidary

# View logs
pm2 logs kunolapidary --lines 100

# Check status
pm2 status && sudo systemctl status nginx

# Restart services
pm2 restart kunolapidary && sudo systemctl restart nginx

# Check SSL expiry
sudo certbot certificates

# System resource check
df -h && free -h && pm2 monit
```

---

## 🎯 Post-Deployment Checklist

- [ ] Application accessible at https://kunolapidary.com
- [ ] HTTPS redirect working (http → https)
- [ ] All pages loading correctly
- [ ] Contact form submitting successfully
- [ ] Images loading properly
- [ ] Blog posts displaying with content
- [ ] Demo page accessible
- [ ] Mobile responsive
- [ ] SSL certificate valid
- [ ] PM2 auto-starts on reboot
- [ ] Nginx logs rotating properly
- [ ] Performance acceptable (Lighthouse 90+)

---

## 📞 Support

For issues or questions:
- Check PM2 logs: `pm2 logs kunolapidary`
- Check Nginx logs: `sudo tail -f /var/log/nginx/kunolapidary-error.log`
- Review this guide's Troubleshooting section

---

**Last Updated:** November 2024
**Version:** 1.0
**Branch:** claude/analisa-c-011CV5cLHtnuq1R1XUkaSRKY

**🎉 Your KUNO Lapidary website is now live on VPS!**
