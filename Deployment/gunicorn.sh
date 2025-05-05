#!/bin/bash

PJ_BASE_PATH="/var/www/html/Aggregation_test_project/DMS_goa_test/Deployment"

# Activate virtual environment
echo "Runining gunicorn sh file"
pwd
echo "current dir"

source vvenv/bin/activate
cd DMS_goa

# Django operations
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --noinput

echo "Migrations and static files collected."

# Copy Gunicorn Socket if not present
if [ -f "/etc/systemd/system/dms_gunicorn.socket" ]; then
    echo "Gunicorn Socket already present"
else
    echo "Copying Gunicorn Socket file..."
    sudo cp -rf "$PJ_BASE_PATH/gunicorn_proxy/dms_gunicorn.socket" /etc/systemd/system/
    echo "Gunicorn Socket copied successfully."
fi

# Copy Gunicorn Service if not present
if [ -f "/etc/systemd/system/dms_gunicorn.service" ]; then
    echo "Gunicorn Service already present"
else
    echo "Copying Gunicorn Service file..."
    sudo cp -rf "$PJ_BASE_PATH/gunicorn_proxy/dms_gunicorn.service" /etc/systemd/system/
    echo "Gunicorn Service copied successfully."
fi

# Show user and current directory
echo "Current User: $USER"
echo "Current Directory: $PWD"

# Reload systemd and restart Gunicorn
sudo systemctl daemon-reload
sudo systemctl restart dms_gunicorn
sudo systemctl enable dms_gunicorn

# Check Gunicorn status
sudo systemctl status dms_gunicorn
