#!/bin/bash

sudo nginx -s stop
cd /vagrant
mkdir -p logs
export NODE_PATH=/usr/lib/node_modules
sudo mkdir -p /usr/local/var/mongodb
sudo chmod 777 /usr/local/var/mongodb

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
sudo supervisor -p 5000 -n error -e 'hbs|json|js' $PWD/server.js &
# sudo nginx -c $PWD/config/vagrant/nginx.conf

echo ""
echo "Everything loaded. Press any key (or CTRL-C) to turn it all off: "
echo ""
trap cleanupEnvironment INT
read -p "---------------------------------------------------------------------"
cleanupEnvironment
