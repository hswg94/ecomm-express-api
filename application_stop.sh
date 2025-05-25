#!/bin/bash
set -x  #enables debug mode, which causes each command to be printed to the terminal before it is executed.
pm2 stop ecomm-express-api
pm2 delete ecomm-express-api
rm -rf /ecomm-express-api