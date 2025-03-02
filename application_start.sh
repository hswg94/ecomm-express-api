#!/bin/bash
# Retrieve secrets from Secrets Manager
MONGO_URI=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .MONGO_URI)
JWT_SECRET=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .JWT_SECRET)
PAYPAL_CLIENT_ID=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .PAYPAL_CLIENT_ID)
PAYPAL_APP_SECRET=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .PAYPAL_APP_SECRET)
CLOUDINARY_CLOUD_NAME=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .CLOUDINARY_CLOUD_NAME)
CLOUDINARY_API_KEY=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .CLOUDINARY_API_KEY)
CLOUDINARY_API_SECRET=$(aws secretsmanager get-secret-value --secret-id ECOMM --query SecretString --output text | jq -r .CLOUDINARY_API_SECRET)

# Set environmental variables
export NODE_ENV=production
export PORT=80
export PAYPAL_API_URL=https://api-m.sandbox.paypal.com
export MONGO_URI
export JWT_SECRET
export PAYPAL_CLIENT_ID
export PAYPAL_APP_SECRET
export CLOUDINARY_CLOUD_NAME
export CLOUDINARY_API_KEY
export CLOUDINARY_API_SECRET

cd /ecomm-express-api
pm2 start npm --name "ecomm-express-api" -- run server -- --port 80 --host