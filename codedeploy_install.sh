#!/bin/bash
cd /home/ec2-user/ecomm-express-api-main || { echo "Directory not found"; exit 1; }
npm i || { echo "npm install failed"; exit 1; }