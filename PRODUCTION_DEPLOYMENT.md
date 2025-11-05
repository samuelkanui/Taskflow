# 🚀 PRODUCTION DEPLOYMENT GUIDE

## Quick Deployment Steps

### 1. Prepare Environment

```bash
# Update .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Generate new key
php artisan key:generate
```

### 2. Install Dependencies

```bash
# Production PHP dependencies
composer install --optimize-autoloader --no-dev

# Build frontend assets
npm run build
```

### 3. Optimize Application

```bash
# Cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force
```

### 4. Set File Permissions

```bash
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod -R 775 storage bootstrap/cache
```

### 5. Set Up SSL

```bash
sudo certbot --apache -d yourdomain.com
```

### 6. Configure Web Server

See Apache or Nginx configuration in full documentation.

---

**Deployment Checklist:**
- [ ] Set production environment variables
- [ ] Install SSL certificate
- [ ] Configure database
- [ ] Set up automated backups
- [ ] Test all functionality

For detailed steps, see README.md installation section.
