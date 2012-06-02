#!/bin/bash

sudo nginx -s stop

cd /vagrant
export NODE_PATH=/usr/lib/node_modules

cleanupEnvironment() {
  echo "---------------------------------------------------------------------"
  echo "Killing all node processes (sry if you had others :/ )"
  killall -9 node

  echo "Stopping mongod"
  killall -2 mongod

#  echo "Stopping nginx"
#  sudo nginx -s stop

  echo "Everything Stopped. G2G!"

  exit
}

# Run the stuff!
mongod --config $PWD/config/vagrant/mongod.conf --fork --logpath $PWD/logs/mongodb.log --logappend
sudo supervisor -e 'hbs|json|js' $PWD/server.js
# sudo nginx -c $PWD/config/vagrant/nginx.conf

echo ""
echo "Everything loaded. Press any key (or CTRL-C) to turn it all off: "
echo ""
trap cleanupEnvironment INT
read -p "---------------------------------------------------------------------"
cleanupEnvironment
