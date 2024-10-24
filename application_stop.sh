#!/bin/bash
pm2 stop ecomm-express-api
pm2 delete ecomm-express-api
rm -rf /ecomm-express-api