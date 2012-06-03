rhokgho
=======

Glimmer Of Hope Donation Site for Random Hacks of Kindness Austin

Running
-------

1. Install Vagrant: http://vagrantup.com/
2. Install VirtualBox: https://www.virtualbox.org/
3. Get the rhok32.box Vagrant instance from a team member (Mac versions of Vagrant and VirtualBox can probably be copied as well)
4. ```vagrant box add rhok-lucid32 rhok32.box```
5. Within this git project, ```vagrant up```
6. After the instance has started, ```vagrant ssh``` to SSH into the VM

```
cd /vagrant
mkdir -p config/local
cp config/sample/* config/local
./run.sh
```

Create a host override for the VM on your host:

`sudo vim /etc/hosts`

and then add

`192.168.50.10  local.rhokgoh.com`

The access the site at: [local.rhokgoh.com](http://local.rhokgoh.com/)

Configure twilio in ./config/local/twilio.js.

example:
---START: config/local/twilio.js---
var twilioconfig = {};
twilioconfig.accountsid = 'Account SID';
twilioconfig.authtoken = 'Auth Token';
twilioconfig.hostname = 'example.com';
twilioconfig.mynumber = '+15551234455';
module.exports = twilioconfig;
---END--

Facebook Application ID - 438527712837758

Mongo

If your MongoDB gets messed up, you can drop the challenges collection by running ```dropchallenges.sh```
