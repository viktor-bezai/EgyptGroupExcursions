server {
    listen 80;
    server_name anna-egypt.com www.anna-egypt.com;

    client_max_body_size 25M;

    # Maintenance mode - serve maintenance page if flag exists
    set $maintenance 0;
    if (-f /var/www/maintenance-egypt.flag) {
        set $maintenance 1;
    }

    # Maintenance page location
    location @maintenance {
        root /var/www;
        rewrite ^(.*)$ /maintenance-egypt.html break;
    }

    location /static/ {
        alias /home/deploy/EgyptGroupExcursions/backend/staticfiles/;
        expires 1y;
    }

    location /media/ {
        alias /home/deploy/EgyptGroupExcursions/backend/media/;
        expires 1d;
    }

    location /api/ {
        if ($maintenance) {
            return 503;
        }
        proxy_pass http://127.0.0.1:8003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /admin/ {
        # Allow admin access during maintenance
        proxy_pass http://127.0.0.1:8003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /ckeditor5/ {
        proxy_pass http://127.0.0.1:8003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /_next/ {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        expires 1y;
    }

    location / {
        if ($maintenance) {
            return 503;
        }
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Custom error page for 503 (maintenance)
    error_page 503 @maintenance;
}
