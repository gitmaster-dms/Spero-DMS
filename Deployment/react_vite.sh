#!/bin/bash

REACT_CONF_PATH="/var/www/html/DMS_goa/DMS_client"

cd "${REACT_CONF_PATH}" || { echo "React path not found: ${REACT_CONF_PATH}"; exit 1; }

# Fix permissions
sudo chown -R $USER:$USER .

# Clean stale vite cache
rm -rf node_modules/.vite-temp

if [ -d "node_modules" ]; then
    echo "node_modules exists, running npm install and build..."
else
    echo "node_modules does not exist, installing dependencies..."
fi

npm install
npm run build

echo "React Build Created"
