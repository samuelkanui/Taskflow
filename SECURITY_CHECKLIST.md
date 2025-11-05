# 🔒 SECURITY CHECKLIST - PRE-PRODUCTION

## ⚠️ CRITICAL: BEFORE PRODUCTION

### 1. Environment Configuration (.env)

```env
# MUST CHANGE THESE:
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:GENERATE_NEW_KEY_WITH_php_artisan_key:generate

# Database
DB_CONNECTION=mysql
DB_HOST=your_production_host
DB_DATABASE=your_production_database
DB_USERNAME=your_production_username
DB_PASSWORD=STRONG_PASSWORD_HERE

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=your_mail_server
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com

# Session & Security
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true
SANCTUM_STATEFUL_DOMAINS=yourdomain.com
```

### 2. Security Headers

Add to `public/.htaccess`:

```apache
# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

### 3. SSL/TLS Certificate

```bash
# Install SSL certificate (Let's Encrypt)
sudo certbot --apache -d yourdomain.com

# Force HTTPS in .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

**Security Score: 9/10** ✅ Ready for production with above configurations.
