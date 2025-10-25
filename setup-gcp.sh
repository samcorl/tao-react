#!/bin/bash

# Simple Google Cloud Setup for Tao Te Ching

echo "☯️  Setting up Google Cloud for Tao Te Ching deployment"
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

echo "📋 Available projects:"
gcloud projects list --format="table(projectId,name,projectNumber)"

echo ""
echo "💡 Options:"
echo "1. Use an existing project from the list above"
echo "2. Create a new project"
echo ""

read -p "Enter your choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    read -p "Enter the Project ID from the list above: " PROJECT_ID
    
    # Validate project exists
    if ! gcloud projects describe $PROJECT_ID &>/dev/null; then
        echo "❌ Error: Project $PROJECT_ID not found or no access"
        exit 1
    fi
    
elif [ "$choice" = "2" ]; then
    echo ""
    read -p "Enter a unique project ID (e.g., tao-te-ching-yourname): " PROJECT_ID
    
    echo "🔧 Creating project: $PROJECT_ID"
    gcloud projects create $PROJECT_ID --name="Tao Te Ching App"
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create project. Project ID might be taken or invalid."
        echo "💡 Try a different project ID (must be globally unique)"
        exit 1
    fi
    
else
    echo "❌ Invalid choice"
    exit 1
fi

# Set the project
echo "📋 Setting active project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Check billing
echo ""
echo "💳 Checking billing status..."
BILLING_ENABLED=$(gcloud billing projects describe $PROJECT_ID --format="value(billingEnabled)" 2>/dev/null || echo "false")

if [ "$BILLING_ENABLED" != "True" ]; then
    echo "⚠️  Billing is not enabled for this project"
    echo "💰 You need to enable billing to use Cloud Run (but it should stay free!)"
    echo "🌐 Enable billing at: https://console.cloud.google.com/billing/projects"
    echo ""
    read -p "Press Enter after enabling billing, or Ctrl+C to exit..."
fi

# Enable APIs
echo "🔌 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com run.googleapis.com container.googleapis.com

# Set up IAM permissions
echo "🔐 Setting up permissions..."
USER_EMAIL=$(gcloud config get-value account)

echo "👤 Adding Cloud Build permissions for: $USER_EMAIL"

# Add necessary roles
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
echo "✅ Setup complete!"
echo "📋 Project ID: $PROJECT_ID"
echo "👤 User: $USER_EMAIL"
echo "🔐 Permissions configured for Cloud Build and Cloud Run"
echo ""
echo "🚀 Now you can deploy with:"
echo "   ./deploy-gcp-simple.sh $PROJECT_ID"