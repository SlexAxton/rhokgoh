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
# Run run.sh with sudo since it runs on port 80
sudo ./run.sh
```



The VM will be available at http://192.168.50.10 from the host machine

We suggest that you set up a nicer name for this.

`sudo vim /etc/hosts`

and then add

`192.168.50.10  local.rhokgoh.com`

The access the site at: [local.rhokgoh.com](http://local.rhokgoh.com/)
