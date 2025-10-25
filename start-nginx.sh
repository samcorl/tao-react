#!/bin/sh

# Set default port if not provided
export PORT=${PORT:-8080}

echo "Starting nginx on port $PORT"

# Substitute the PORT environment variable in nginx config
envsubst '${PORT}' < /etc/nginx/nginx.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/nginx.conf

# Test nginx configuration
nginx -t

# Start nginx
nginx -g "daemon off;"