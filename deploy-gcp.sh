#!/bin/bash

# Google Cloud Run Deployment Script for Tao Te Ching

set -e

# Configuration - Use existing project ID
PROJECT_ID="tao-te-ching-1757654959"
SERVICE_NAME="tao-te-ching"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "☯️  Deploying Tao Te Ching to Google Cloud Run..."
echo "📋 Project: $PROJECT_ID"
echo "🌍 Region: $REGION"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "📥 Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if logged in
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "🔑 Please login to Google Cloud first:"
    gcloud auth login
fi

# Set project
echo "📋 Setting active project to existing project..."
gcloud config set project $PROJECT_ID

# Enable required APIs (if not already enabled)
echo "🔌 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com run.googleapis.com --quiet

# Build and submit container
echo "🏗️  Building container image..."
echo "⏳ This may take a few minutes..."
gcloud builds submit --tag $IMAGE_NAME . --quiet

if [ $? -eq 0 ]; then
    echo "✅ Container built successfully!"
else
    echo "❌ Build failed. Check logs above."
    exit 1
fi

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --port 8080 \
  --quiet

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    
    # Get the service URL
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")
    
    echo "🌐 Your Tao Te Ching app is live at:"
    echo "   $SERVICE_URL"
    echo ""
    echo "📊 Management commands:"
    echo "   Logs:    gcloud run services logs read $SERVICE_NAME --region=$REGION"
    echo "   Status:  gcloud run services describe $SERVICE_NAME --region=$REGION"
    echo "   Delete:  gcloud run services delete $SERVICE_NAME --region=$REGION"
    echo ""
    echo "💰 This deployment should stay within Google Cloud's free tier!"
    echo "☯️  Enjoy sharing the wisdom of the Tao Te Ching!"
    
else
    echo "❌ Deployment failed. Check the logs above."
    exit 1
fi