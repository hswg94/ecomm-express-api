#!/bin/bash
set -x  #enables debug mode, which causes each command to be printed to the terminal before it is executed.
yum install -y nodejs unzip wget aws-cli jq
npm install -g pm2
cd /ecomm-express-api
npm i