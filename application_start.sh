#!/bin/bash
cd /ecomm-express-api
pm2 start npm --name "ecomm-express-api" -- run server -- --port 80 --host