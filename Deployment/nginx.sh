#!/bin/bash

sudo cp -rf nginx_proxy/dms_django_9001.conf /etc/nginx/sites-available/dms_django_9001.conf
chmod 777 /var/www/html/DMS_goa/

sudo ln -s /etc/nginx/sites-available/dms_django_9001.conf /etc/nginx/sites-enabled
sudo nginx -t
 
sudo systemctl start nginx
sudo systemctl enable nginx

echo "Nginx has been started"

sudo systemctl status nginx
sudo systemctl restart nginx