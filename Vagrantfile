# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.define :local do |box|
    box.vm.box = "tahr64"
    box.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box"
    box.vm.provision :shell do |shell|
      shell.inline = "touch $1 && chmod 0440 $1 && echo $2 > $1"
      shell.args = %q{/etc/sudoers.d/root_ssh_agent "Defaults    env_keep += \"SSH_AUTH_SOCK\""}
    end
    # box.vm.provision :shell, :path => 'setup/shared_scripts/install_puppet.sh'
    #box.vm.provision :puppet do |puppet|
    #    #puppet.options = '--verbose --debug'
    #    puppet.facter = {
    #      "tpx" => 'true',
    #      "munin_master" => 'false',
    #    }
    #end
    box.vm.provider "virtualbox" do |v|
      v.customize [
        "modifyvm", :id,
        "--memory", "2048",
        "--cpus",   "2"
      ]
    end
    # forward the hosts's ssh keychain
    box.ssh.forward_agent = true

    # apt cache - skip bunch of downloads if ever need to recreate
    # box.vm.synced_folder 'apt-cache', '/var/cache/apt/archives'

    # ssh
    box.vm.network :forwarded_port, id: "ssh", guest: 22, host: 2223
    # box.vm.network :forwarded_port, guest:4444, host:4446
    # munin port forward
    box.vm.network :forwarded_port, guest: 80, host: 8080
    box.vm.network :forwarded_port, guest: 443, host: 8443
    # tpx port
    box.vm.network :forwarded_port, guest: 5000, host: 5000
    # amqp manager port
    box.vm.network :forwarded_port, guest: 15672, host: 15672
    #mongodb port
    box.vm.network :forwarded_port, guest: 27019, host: 27019

    # following line would require mongo on a separate fileshare
    box.vm.synced_folder ".", "/home/vagrant/connect"
    #box.vm.box = "apache"
  end
end
