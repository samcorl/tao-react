# 🐳 Tao Te Ching - Docker Deployment Guide

## Quick Start

### Option 1: Using the Deploy Script (Recommended)
```bash
./deploy.sh
```

### Option 2: Using Docker Compose
```bash
docker-compose up -d
```

### Option 3: Manual Docker Commands
```bash
# Build the image
docker build -t tao-te-ching:latest .

# Run the container
docker run -d \
  --name tao-te-ching \
  --restart unless-stopped \
  -p 3000:80 \
  tao-te-ching:latest
```

## 🌐 Access Your App

After deployment, your Tao Te Ching app will be available at:
- **Local:** http://localhost:3000
- **Network:** http://[your-server-ip]:3000

## 📋 Docker Configuration Details

### Dockerfile Features
- **Multi-stage build** for optimized production image
- **Node.js 18 Alpine** for building
- **Nginx Alpine** for serving (lightweight)
- **Production build** with optimizations
- **Security headers** and caching

### Container Specifications
- **Port:** 80 (mapped to 3000 on host)
- **Memory limit:** 256MB
- **CPU limit:** 0.5 cores
- **Health check:** Built-in monitoring
- **Auto-restart:** Unless manually stopped

## 🛠️ Management Commands

### View logs
```bash
docker logs tao-te-ching
```

### Stop the container
```bash
docker stop tao-te-ching
```

### Restart the container
```bash
docker restart tao-te-ching
```

### Remove the container
```bash
docker stop tao-te-ching
docker rm tao-te-ching
```

### Update deployment
```bash
# Pull latest code
git pull

# Rebuild and redeploy
./deploy.sh
```

## 🌍 Production Deployment

### For Cloud Deployment (AWS, GCP, Azure)
1. **Push to container registry:**
   ```bash
   docker tag tao-te-ching:latest your-registry/tao-te-ching:latest
   docker push your-registry/tao-te-ching:latest
   ```

2. **Deploy using your platform's container service:**
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances

### For VPS/Server Deployment
1. **Copy files to server:**
   ```bash
   scp -r . user@your-server:/path/to/deployment/
   ```

2. **Run deployment on server:**
   ```bash
   ssh user@your-server
   cd /path/to/deployment/
   ./deploy.sh
   ```

### Environment Variables (Optional)
```bash
# For custom configuration
docker run -d \
  --name tao-te-ching \
  -p 3000:80 \
  -e NODE_ENV=production \
  tao-te-ching:latest
```

## 🔧 Customization

### Custom Port
```bash
# Run on port 8080 instead of 3000
docker run -d \
  --name tao-te-ching \
  -p 8080:80 \
  tao-te-ching:latest
```

### Custom Domain with Reverse Proxy
For production with a custom domain, use a reverse proxy like nginx or traefik to handle SSL and routing.

## 📊 Monitoring

### Health Check
The container includes a built-in health check that monitors the app every 30 seconds.

### Resource Usage
```bash
# Monitor resource usage
docker stats tao-te-ching
```

## 🛡️ Security Features

- **Security headers** for XSS protection
- **Content Security Policy** 
- **No sensitive data** in container
- **Read-only filesystem** (nginx serves static files)
- **Non-root user** execution
- **Minimal attack surface** (Alpine Linux)

## 🎯 Performance Features

- **Gzip compression** for faster loading
- **Static asset caching** (1 year for JS/CSS/images)
- **Optimized nginx configuration**
- **Multi-stage build** for smaller image size
- **Production React build** with minification

Your Tao Te Ching app is now ready for production deployment! ☯️✨