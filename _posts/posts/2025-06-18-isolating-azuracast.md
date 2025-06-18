---
layout: post
type: posts
title: "Isolating AzuraCast: Running Docker within an Incus VM for a Cleaner Host"
date: 2025-06-18
last_modified_at: 2025-06-18 10:34:00
description: "Isolate your AzuraCast Docker deployment by running it inside an Incus VM for a cleaner, more organized host."
categories: [self-hosting]
tags: [AzuraCast, Docker, Incus, Isolation, Ubuntu, Linux, Self-hosting, System Administration, Open Source, Server Management, Tutorial]
author: Savelii Pototskii
---

Docker is a great tool for managing applications and services across heterogeneous servers.
However, managing numerous or complex Docker containers can become challenging.
Personally, I also prefer to avoid the proliferation of network interfaces and threads from individual Docker containers cluttering my `htop` (or `top`) output.

The official AzuraCast installation process involves several components.
It requires you to install Docker and Docker Compose on the host system.
Then, you'll need to download and execute a bash script.
Ultimately, this can lead to the host system being populated with numerous network interfaces and processes.

A straightforward way to mitigate this is to create an Incus virtual machine, install Docker within it, and then install AzuraCast using the official recommended guide inside the VM.

While Incus allows setting up containers with the security.nesting property (see: [Frequently asked questions - How can I run Docker inside an Incus container?](https://linuxcontainers.org/incus/docs/main/faq/#how-can-i-run-docker-inside-an-incus-container)), this post focuses on using a full virtual machine for maximum isolation.
While Incus containers can run Docker with `security.nesting`, this doesn't offer the same level of isolation as a full virtual machine, and you might still see resource clutter (like network interfaces and processes) appearing on the host system, albeit namespaced.

In this post, I will guide you through:
1. Creating and setting up an Incus virtual machine.
2. Installing Docker in that virtual machine.
3. Deploying AzuraCast in the virtual machine.

## Used ports, IPs and names
* `ubuntu/22.04` - the Incus VM image (Ubuntu 22.04 LTS). This is one of the images suitable for AzuraCast; alternatives are listed in their documentation (see: [Install AzuraCast with Docker](https://www.azuracast.com/docs/getting-started/installation/docker/)).
* `incus-vm-azuracast` - the name of an Incus virtual machine.
* `--storage incus-pool-fast` - the storage pool where the VM will be created (optional).
* `--network br0` - the network bridge the VM will connect to (optional).
* `192.168.205.9/24` - the IP address for the Incus VM.
* `192.168.205.1` - the gateway or router in the local network (this will likely differ in your setup).

Versions:
* Ubuntu LTS 24.04 - host operating system.
* Incus version 6.0.0.

## The Complete Guide with Explanations
This guide is divided into three main steps.
I've aimed to explain each command and flag used.
The steps are:
1. Creating an Incus virtual machine.
2. Installing Docker in the VM.
3. Installing AzuraCast within Docker, running inside the VM.

### Step 1: Creating an Incus virtual machine
First, we need to create an Incus virtual machine.
It's possible to use an existing virtual machine that already has Docker in it, but this can make it more complex to manage the host, VMs, and various container instances.
Additionally, attaching an existing music library to AzuraCast might be less straightforward in such a setup.

Incus is a convenient and simple tool.
To create the virtual machine, run the following command in your terminal:
* `incus launch images:ubuntu/22.04 incus-vm-azuracast --storage incus-pool-fast --network br0 --vm`

Where:
* `ubuntu/22.04` - the Incus VM image (Ubuntu 22.04 LTS). This is one of the images suitable for AzuraCast; alternatives are listed in their documentation (see: [Install AzuraCast with Docker](https://www.azuracast.com/docs/getting-started/installation/docker/)).
* `incus-vm-azuracast` - the name of an Incus virtual machine.
* `--storage incus-pool-fast` - the storage pool where the VM will be created (optional).
* `--network br0` - the network bridge the VM will connect to (optional).
* `--vm` - this crucial flag instructs Incus to create a virtual machine rather than a system container.

Then, enter the created VM:
* `incus exec incus-vm-azuracast -- bash`

Set up the network interface by editing `/etc/netplan/10-lxc.yaml` with your preferred editor (e.g., nano):
```yaml
network:
  version: 2
  ethernets:
    enp5s0:
      dhcp4: false
      dhcp6: false
      addresses:
        - 192.168.205.9/24
      nameservers:
        addresses:
          - 192.168.205.1
      routes:
        - to: default
          via: 192.168.205.1
      dhcp-identifier: mac
```

Where:
* `192.168.205.9/24` - the Incus VM IP address.
* `192.168.205.1` - a router in a local network (can be different in your particular case).

Apply Netplan settings:
* `netplan apply`


Exit the VM and restart it:
1. To exit use:
    * `exit` or press `Ctrl + D`
2. Stop the VM:
    * `incus stop incus-vm-azuracast`
3. Start the VM:
    * `incus start incus-vm-azuracast`

Note: Your IP addresses will likely differ.

Note: Ubuntu typically uses Netplan for network configuration.
If you're using a different Linux distribution, your network manager might vary.

### Step 2: Installing Docker in the VM
This next step is quite straightforward.
You just need to install Docker in the created virtual machine.
I'll demonstrate one method here, but you can also follow Docker's official installation guide:
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

To install Docker inside the Incus VM, enter the VM:
* `incus exec incus-vm-azuracast -- bash`

Run the following command to uninstall all conflicting packages:
* `for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do apt-get remove $pkg; done`

Install Docker using the `apt` repository (these steps are adapted from the official Docker documentation):
```bash
# Add Docker's official GPG key:
apt-get update
apt-get install ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
```

Install the Docker packages (latest):
* `apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

Verify that the installation is successful by running the `hello-world` image:
* `docker run hello-world`

With this step complete, Docker should be installed and operational.

### Step 3: Installing AzuraCast in the Docker
The final step is also straightforward: installing AzuraCast using Docker within our VM.
The official guide is available here:
* [Install AzuraCast with Docker](https://www.azuracast.com/docs/getting-started/installation/docker/)

Enter the VM:
* `incus exec incus-vm-azuracast -- bash`

Pick a base directory for AzuraCast.
This directory can be almost any location you choose.
It's even possible to mount a directory from the host to the Incus virtual machine as a device and use this directory as a base for an AzuraCast installation and music libraries.
For this guide, we'll use `/var/azuracast` located inside the VM.

Create this directory:
* `mkdir -p /var/azuracast`

Enter the created directory:
* `cd /var/azuracast`

Download AzuraCast's Docker Utility Script:
* `curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh > docker.sh`

Make the script executable:
* `chmod a+x docker.sh`

Install AzuraCast:
* `./docker.sh install`

After completing these installation steps, you should be able to access your AzuraCast instance.
In my case (the IP used in this post), the address is:
* `http://192.168.205.9/`

## Step by step guide
For those familiar with the commands, or for a quick reference, here's a brief summary of the steps:

1. Create and set up an Incus virtual machine:
    1. `incus launch images:ubuntu/22.04 incus-vm-azuracast --storage incus-pool-fast --network br0 --vm`
    2. `incus exec incus-vm-azuracast -- bash`
    3. Edit `/etc/netplan/10-lxc.yaml` with your preferred editor (e.g., nano):
        ```
        network:
          version: 2
          ethernets:
            enp5s0:
              dhcp4: false
              dhcp6: false
              addresses:
                - 192.168.205.9/24
              nameservers:
                addresses:
                  - 192.168.205.1
              routes:
                - to: default
                  via: 192.168.205.1
              dhcp-identifier: mac
        ```
    4. `netplan apply`
    5. Exit from the VM
    6. `incus stop incus-vm-azuracast`
    7. `incus start incus-vm-azuracast`
2. Install Docker inside the created Incus virtual machine:
    1. `incus exec incus-vm-azuracast -- bash`
    2. `for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do apt-get remove $pkg; done`
    3. `apt-get update`
    4. `apt-get install ca-certificates curl`
    5. `install -m 0755 -d /etc/apt/keyrings`
    6. `curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc`
    7. `chmod a+r /etc/apt/keyrings/docker.asc`
    8. Run the following:
        ```bash
        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
          $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
          tee /etc/apt/sources.list.d/docker.list > /dev/null
        ```
    9. `apt-get update`
    10. `apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`
    11. `docker run hello-world`
3. Install AzuraCast:
    1. `mkdir -p /var/azuracast`
    2. `cd /var/azuracast`
    3. `curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh > docker.sh`
    4. `chmod a+x docker.sh`
    5. `./docker.sh install`

## Autostart the VM (optional)
To configure the VM to start automatically when the Incus daemon initializes, set the following property:
* `incus config set incus-vm-azuracast boot.autostart=true`

## Notice - the use of sudo
`sudo` is omitted from the commands in this post, although official documentation often includes it.
This is because when you execute commands within an Incus instance using `incus exec ... -- bash`, you are typically operating as the root user by default, which already provides the necessary privileges.

## Share host's directories with AzuraCast (optional)
For many users, uploading music manually via the AzuraCast web interface will suffice.
But it may be more convenient to store a music library somewhere outside the Docker container and the Incus virtual machine.
All my music is stored on a separate ZFS dataset on my host.

To learn how to share directories from your host system through the Incus VM to your AzuraCast Docker container, refer to my post:
* [AzuraCast Music Library: Host Passthrough with ZFS, Incus, and Docker](https://savalione.com/posts/2025/06/04/azuracast-host-passthrough/).

## Additional links
* [Frequently asked questions - How can I run Docker inside an Incus container?](https://linuxcontainers.org/incus/docs/main/faq/#how-can-i-run-docker-inside-an-incus-container)
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* [Docker Compose](https://docs.docker.com/compose/)
* [Install AzuraCast with Docker](https://www.azuracast.com/docs/getting-started/installation/docker/)
* [What is Sudo?](https://www.sudo.ws/)
