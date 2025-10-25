#!/bin/bash

# Simple Google Cloud Run Deployment Script

set -e

# Get project ID from command line or prompt
if [ -z "$1" ]; then
    echo "Usage: $0 <PROJECT_ID>"
    echo ""
    echo "📋 Available projects:"
    gcloud projects list --format="table(projectId,name)"
    echo ""
    read -p "Enter Project ID: " PROJECT_ID
else
    PROJECT_ID="$1"
fi

# Configuration
SERVICE_NAME="tao-te-ching"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "☯️  Deploying Tao Te Ching to Google Cloud Run..."
echo "📋 Project: $PROJECT_ID"
echo "🌍 Region: $REGION"
echo ""

# Set project
gcloud config set project $PROJECT_ID

# Build and submit container
echo "🏗️  Building container image..."
echo "⏳ This may take a few minutes on first build..."

gcloud builds submit --tag $IMAGE_NAME .

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
  --min-instances 0

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    
    # Get the service URL
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")
    
    echo "🌐 Your Tao Te Ching app is live at:"
    echo "   $SERVICE_URL"
    echo ""
    echo "📊 Useful commands:"
    echo "   View logs:     gcloud run services logs read $SERVICE_NAME --region=$REGION"
    echo "   Check status:  gcloud run services describe $SERVICE_NAME --region=$REGION"
    echo "   Update app:    ./deploy-gcp-simple.sh $PROJECT_ID"
    echo "   Delete app:    gcloud run services delete $SERVICE_NAME --region=$REGION"
    echo ""
    echo "💰 This should stay within Google Cloud's generous free tier!"
    echo "☯️  Share the wisdom of the Tao Te Ching with the world!"
    
else
    echo "❌ Deployment failed. Check the error messages above."
    echo "💡 Common issues:"
    echo "   - Billing not enabled (required even for free tier)"
    echo "   - APIs not enabled (run setup-gcp.sh first)"
    echo "   - Insufficient permissions"
    exit 1
fi