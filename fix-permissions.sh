#!/bin/bash

# Fix permissions for existing Google Cloud project

set -e

PROJECT_ID="tao-te-ching-1757572220"  # Your current project

echo "🔐 Fixing permissions for project: $PROJECT_ID"

# Set project
gcloud config set project $PROJECT_ID

# Get user email
USER_EMAIL=$(gcloud config get-value account)
echo "👤 User: $USER_EMAIL"

# Enable APIs if not already enabled
echo "🔌 Ensuring APIs are enabled..."
gcloud services enable cloudbuild.googleapis.com run.googleapis.com container.googleapis.com --quiet

# Add necessary roles
echo "🔐 Adding required permissions..."

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/cloudbuild.builds.editor" \
    --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/run.admin" \
    --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/storage.admin" \
    --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:$USER_EMAIL" \
    --role="roles/iam.serviceAccountUser" \
    --quiet

echo ""
echo "✅ Permissions fixed!"
echo "🚀 Now try deploying again:"
echo "   ./deploy-gcp-simple.sh $PROJECT_ID"