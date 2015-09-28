if hash puppet 2>/dev/null; then
    echo "puppet already installed, skipping"
else
    wget --quiet https://apt.puppetlabs.com/puppetlabs-release-trusty.deb
	sudo dpkg -i puppetlabs-release-trusty.deb
	sudo apt-get update
	sudo apt-get -y install puppet-common
fi
