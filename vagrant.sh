#!/bin/bash

# This is the provisioning script


which node
if [ "$?" -ne "0" ]; then
  echo "Installing Node..."
  #!/bin/bash

  # This is the Vagrant provisioning script

  sudo apt-get update

  # Let's install everything...
  sudo apt-get install -y nginx make python-software-properties mongodb

  # Install Node JS (need to add special repo)
  sudo apt-add-repository ppa:chris-lea/node.js
  sudo apt-get update
  sudo apt-get install -y nodejs npm

  # Install Node modules
  sudo npm install -g express hbs node-inspector supervisor
  sudo npm install -g mongodb --mongodb:native

  # Setup MongoDB data dir
  #sudo mkdir -p /usr/local/var/mongodb
  #sudo chmod 777 /usr/local/var/mongodb

fi