#!/bin/sh

echo "Setting $BASE_PATH as API base path..."
ESCAPED_BASE_PATH=$(echo "$BASE_PATH" | sed 's#/#\\/#g')
sed -i "s/###BASE_PATH###/$ESCAPED_BASE_PATH/g" /usr/share/nginx/html/assets/*

echo "Starting nginx..."
nginx -g "daemon off;"