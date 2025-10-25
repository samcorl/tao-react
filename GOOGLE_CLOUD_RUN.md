# 🌐 Deploy Tao Te Ching to Google Cloud Run

Google Cloud Run is perfect for this app - it's serverless, scales to zero (free when not used), and has a generous free tier!

## 💰 Free Tier Benefits

**Google Cloud Run Free Tier (monthly):**
- 2 million requests
- 360,000 GB-seconds of memory
- 180,000 vCPU-seconds of compute time
- **Your Tao Te Ching app will likely stay completely free!**

## 🚀 Step-by-Step Deployment

### Prerequisites
1. **Google Cloud Account** - [Sign up here](https://cloud.google.com/free) (includes $300 credit)
2. **Google Cloud CLI** - [Install gcloud](https://cloud.google.com/sdk/docs/install)

### Step 1: Setup Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create tao-te-ching-app --name="Tao Te Ching"

# Set the project
gcloud config set project tao-te-ching-app

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

### Step 2: Configure Docker for Google Cloud

```bash
# Configure Docker to use gcloud as credential helper
gcloud auth configure-docker
```

### Step 3: Build and Push Container

```bash
# Set your project ID
export PROJECT_ID=tao-te-ching-app

# Build the container image
gcloud builds submit --tag gcr.io/$PROJECT_ID/tao-te-ching .

# This will:
# 1. Upload your code to Google Cloud Build
# 2. Build the Docker image using your Dockerfile
# 3. Store it in Google Container Registry
```

### Step 4: Deploy to Cloud Run

```bash
# Deploy to Cloud Run
gcloud run deploy tao-te-ching \
  --image gcr.io/$PROJECT_ID/tao-te-ching \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 10 \
  --port 80

# This will:
# 1. Create a Cloud Run service
# 2. Deploy your container
# 3. Give you a public URL
```

## 🎯 One-Command Deployment Script

Create this script for easy redeployment:

```bash
# Create deployment script
cat > deploy-gcp.sh << 'EOF'
#!/bin/bash

set -e

PROJECT_ID="tao-te-ching-app"
SERVICE_NAME="tao-te-ching"
REGION="us-central1"

echo "🌐 Deploying Tao Te Ching to Google Cloud Run..."

# Build and submit
echo "🏗️ Building container..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME .

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 10 \
  --port 80

# Get the URL
echo "✅ Deployment complete!"
echo "🌐 Your app is live at:"
gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)"
EOF

chmod +x deploy-gcp.sh
```

## 🌍 Custom Domain (Optional)

### Add Your Own Domain

```bash
# Map custom domain to your Cloud Run service
gcloud run domain-mappings create \
  --service tao-te-ching \
  --domain your-domain.com \
  --region us-central1
```

### SSL Certificate
Google Cloud Run automatically provides SSL certificates for custom domains!

## 📊 Monitoring and Management

### View Logs
```bash
gcloud run services logs read tao-te-ching --region=us-central1
```

### Check Service Status
```bash
gcloud run services describe tao-te-ching --region=us-central1
```

### Update Environment Variables
```bash
gcloud run services update tao-te-ching \
  --region=us-central1 \
  --set-env-vars="NODE_ENV=production"
```

### Scale Configuration
```bash
# Update scaling and resources
gcloud run services update tao-te-ching \
  --region=us-central1 \
  --memory=512Mi \
  --cpu=2 \
  --max-instances=20 \
  --min-instances=0
```

## 💡 Cloud Run Advantages for Your App

### Perfect for Static React Apps:
- **Scales to zero** - No cost when not used
- **Fast cold starts** - Your app loads quickly
- **Global CDN** - Fast worldwide access
- **HTTPS by default** - Secure automatically
- **No server management** - Fully managed
- **Pay per request** - Only pay for actual usage

### Cost Optimization:
```bash
# Minimal resource configuration for maximum free tier usage
gcloud run services update tao-te-ching \
  --region=us-central1 \
  --memory=128Mi \
  --cpu=1 \
  --max-instances=5 \
  --concurrency=80
```

## 🛠️ Troubleshooting

### Build Issues
```bash
# View build logs
gcloud builds log [BUILD_ID]

# List recent builds
gcloud builds list --limit=5
```

### Service Issues
```bash
# Describe service for troubleshooting
gcloud run services describe tao-te-ching --region=us-central1

# View real-time logs
gcloud run services logs tail tao-te-ching --region=us-central1
```

### Delete and Redeploy
```bash
# Delete the service
gcloud run services delete tao-te-ching --region=us-central1

# Redeploy
./deploy-gcp.sh
```

## 🎯 Expected Results

After deployment, you'll get:
- **Public URL** like `https://tao-te-ching-xxxxx-uc.a.run.app`
- **Automatic HTTPS** with valid SSL certificate
- **Global availability** with low latency
- **Automatic scaling** from 0 to N instances
- **Built-in monitoring** and logging

## 💰 Cost Estimation

For a personal Tao Te Ching app:
- **Expected cost: $0/month** (within free tier)
- **Requests**: Likely under 100,000/month
- **Compute time**: Minimal (fast static serving)
- **Storage**: ~50MB container image

## 🌟 Next Steps After Deployment

1. **Share your URL** - Your app is instantly globally accessible
2. **Monitor usage** in the Google Cloud Console
3. **Set up alerts** for any unexpected costs
4. **Consider custom domain** for a professional touch

Your Tao Te Ching app will be beautifully deployed on Google Cloud Run with zero ongoing maintenance! ☯️✨