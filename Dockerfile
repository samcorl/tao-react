# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY start-nginx.sh /usr/local/bin/start-nginx.sh
RUN chmod +x /usr/local/bin/start-nginx.sh

# Expose port 8080 (default, but Cloud Run will override)
EXPOSE 8080

# Start with our script that handles PORT substitution
CMD ["/usr/local/bin/start-nginx.sh"]