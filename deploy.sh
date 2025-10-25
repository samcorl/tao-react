#!/bin/bash

# Tao Te Ching Docker Deployment Script

set -e

echo "🐳 Building Tao Te Ching Docker Image..."

# Build the Docker image
docker build -t tao-te-ching:latest .

echo "✅ Docker image built successfully!"

echo "🚀 Starting container..."

# Stop existing container if running
docker stop tao-te-ching 2>/dev/null || true
docker rm tao-te-ching 2>/dev/null || true

# Run the container
docker run -d \
  --name tao-te-ching \
  --restart unless-stopped \
  -p 3000:80 \
  tao-te-ching:latest

echo "✅ Container started successfully!"
echo "🌐 Your Tao Te Ching app is now running at http://localhost:3000"

# Show container status
echo ""
echo "📊 Container Status:"
docker ps | grep tao-te-ching

echo ""
echo "📝 To view logs: docker logs tao-te-ching"
echo "📝 To stop: docker stop tao-te-ching"
echo "📝 To restart: docker restart tao-te-ching"