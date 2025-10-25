# Custom Domain Setup for Google Cloud Run

This guide shows how to connect your custom domain (like `randomtao.com`) to your Google Cloud Run deployed Tao Te Ching app.

## Prerequisites

- Your app is already deployed to Google Cloud Run
- You have a custom domain registered
- Your domain's DNS is managed by AWS Route 53 (or any DNS provider)
- **Domain must be verified in Google Search Console**

## Step 0: Verify Domain in Google Search Console

Before you can map a custom domain to Cloud Run, Google requires domain verification:

1. **Go to [Google Search Console](https://search.google.com/search-console)**
2. **Click "Add property"**
3. **Choose "Domain" (not URL prefix)**
4. **Enter your domain**: `randomtao.com`
5. **Add DNS verification TXT record**:
   - Google will provide a TXT record like: `google-site-verification=abc123...`
   - Add this TXT record to your Route 53 hosted zone
   - **Name**: `randomtao.com` (or leave blank)
   - **Type**: `TXT`
   - **Value**: The verification string from Google
6. **Click "Verify" in Search Console**
7. **Wait for verification** (can take a few minutes to hours)

## Step 1: Map Domain in Google Cloud Run

First, tell Google Cloud Run about your custom domain:

```bash
# Map your domain to the Cloud Run service (requires beta)
gcloud beta run domain-mappings create \
  --service tao-te-ching \
  --domain randomtao.com \
  --region us-central1
```

This command will output DNS records that you need to configure in Route 53.

## Step 2: Update Route 53 DNS Records

The domain mapping command will output something like:
```
Please add the following DNS records:
randomtao.com: CNAME ghs.googlehosted.com
```

### In AWS Route 53:

1. **Go to Route 53 Console** → Hosted Zones → randomtao.com
2. **Delete existing A record** (if pointing to old server)
3. **Create new CNAME record:**
   - **Name**: `randomtao.com` (or leave blank for root)
   - **Type**: `CNAME` 
   - **Value**: `ghs.googlehosted.com`
   - **TTL**: `300` (5 minutes)

### For Root Domain Issues

Route 53 doesn't allow CNAME records for root domains. **Use A records instead:**

**For root domain (randomtao.com):**
- **Name**: (blank for root domain)
- **Type**: `A`
- **Value**: Add these Google Cloud load balancer IPs:
  - `216.239.32.21`
  - `216.239.34.21` 
  - `216.239.36.21`
  - `216.239.38.21`
- **TTL**: `300` (5 minutes)

This points your domain directly to Google's infrastructure without involving AWS services.

## Step 3: Verify SSL Certificate Provisioning

Check the status of your domain mapping and SSL certificate:

```bash
# Check domain mapping status
gcloud run domain-mappings describe randomtao.com --region=us-central1

# This will show SSL certificate provisioning status
```

### Timeline

- **DNS propagation**: 5-15 minutes
- **SSL certificate**: 10-60 minutes after DNS is live
- **Status**: `gcloud` command will show "Certificate provisioning" → "Ready"

## Optional: www Subdomain

If you want both `randomtao.com` and `www.randomtao.com`:

```bash
# Map www subdomain
gcloud run domain-mappings create \
  --service tao-te-ching \
  --domain www.randomtao.com \
  --region us-central1
```

Then add a CNAME in Route 53:
- **Name**: `www`
- **Type**: `CNAME`
- **Value**: `ghs.googlehosted.com`

## What You Get

- **https://randomtao.com** - Your custom domain with automatic SSL
- **Automatic certificate renewal** - Google handles this forever
- **HTTP → HTTPS redirects** - Built-in
- **No additional costs** - Domain mapping is free
- **Global CDN** - Fast worldwide access

## Key Advantages

**Over Traditional Setup:**
- No certbot, no certificate renewals
- No nginx SSL configuration needed  
- No server restarts for certificate updates
- Google's global CDN included
- All handled by Google's infrastructure

**Over AWS S3/CloudFront:**
- Simpler setup (no CloudFront distribution needed)
- Automatic SSL with zero configuration
- Built-in container health monitoring

## Troubleshooting

### Check DNS Propagation
```bash
# Check if DNS has propagated
dig randomtao.com
nslookup randomtao.com
```

### Check SSL Certificate Status
```bash
# Detailed domain mapping info
gcloud run domain-mappings describe randomtao.com \
  --region=us-central1 \
  --format="table(metadata.name,spec.routeName,status.conditions[0].type,status.conditions[0].status)"
```

### Common Issues

1. **DNS not propagating**: Wait 15+ minutes, check TTL settings
2. **SSL pending**: Normal for first 10-60 minutes after DNS is live
3. **Certificate failed**: Verify DNS is pointing to `ghs.googlehosted.com`

## Management Commands

```bash
# List all domain mappings
gcloud run domain-mappings list --region=us-central1

# Delete domain mapping
gcloud run domain-mappings delete randomtao.com --region=us-central1

# Update domain mapping (if needed)
gcloud run domain-mappings update randomtao.com --region=us-central1
```

Your custom domain should be live within 15-60 minutes with automatic HTTPS!