#!/bin/bash
cd /home/ec2-user/ecomm-express-api-main || { echo "Directory not found"; exit 1; }
npm run server -- --port 5000 --host 0.0.0.0 || { echo "npm run failed"; exit 1; }