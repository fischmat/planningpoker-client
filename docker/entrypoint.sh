#!/bin/sh

echo "Setting $BASE_PATH as API base path..."
sed -i "s/###BASE_PATH###/${BASE_PATH}/g" /usr/share/nginx/html/assets/*

echo "Starting nginx..."
nginx -g "daemon off;"