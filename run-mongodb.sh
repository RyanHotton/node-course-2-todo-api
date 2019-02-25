#!/usr/bin/env bash
# this script was designed for the OS X environment, but should work in most Linux environments
# please make this script executable [chmod +x run-mongodb.sh] or [bash/source] run-mongodb.sh
clear
# please change respective paths
~/mongo/bin/mongod --dbpath ~/mongo-data
