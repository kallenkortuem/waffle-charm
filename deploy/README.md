## Setup server
```
apt update
apt upgrade
adduser starcadian
usermod -aG sudo starcadian
cd ~
mkdir -p ~/.ssh
vi ~/.ssh/authorized_keys
// insert the public ssh key
exit 
exit
// back to PC terminal
ssh starcadian@IP_ADDRESS
chmod 644 ~/.ssh/authorized_keys
sudo vi /etc/ssh/sshd_config
// set PermitRootLogin to no
sudo service sshd restart
// 
```
then run all the commands from https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04
