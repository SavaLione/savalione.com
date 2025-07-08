---
layout: post
type: posts
title: "Cloud-Powered C++: Building a Dev Environment with Incus, Clang, and VS Code in Your Browser"
date: 2025-06-11
description: "Build a powerful, browser-accessible C++ development environment. This guide walks you through setting up Incus, Clang, and VS Code for remote coding."
categories: [devops-infrastructure]
tags: [C++, Incus, Remote Development, VS Code, code-server, Clang, LLVM, Development Environment, Tutorial, Linux, Ubuntu, DevOps, Containerization, Nginx, CMake, clangd]
---

It's hard to overestimate the influence of the C++ programming language on the whole software development field.
C++ has been a key element of many systems for the past 35 years and with standards like SYCL and C++26 there is no doubt that C++ will continue to be one of the most important general-purpose programming languages.

Due to the rich history of this programming language, many compilers and dialects have been created.
Besides the 'Big Three' (GCC, Clang, and MSVC), which are the most widely used compilers, there are many others, such as the Intel C++ Compiler, Emscripten, and the ARM C/C++ Compiler, applicable in specific situations.
Not to mention the different standard library implementations - such as libstdc++, libc++, MSVC CRT, EASTL, etc. - that also can be used in different scenarios.
It's the task of the developer to choose the right compiler and libraries before developing a new project.

Owing to the vast amount of possibilities that C++ provides, sometimes it becomes hard to manage all combinations of specific compilers and libraries that are used in different projects.
Of course, it is possible to create a set of scripts that can modify environment variables, so that only certain compilers and libraries are used at a given time, but it can still be hard to keep track of all these changes and scripts.
Not to mention that from time to time particular projects require particular distributions and versions of kernels and libraries, making it even more complicated to configure a single workstation to support every project.

To solve this issue, I'm going to describe a simple solution that is based on Incus containers.

Also, in this post I'm planning to show a simple setup of the Visual Studio Code editor working in a browser, configured to work with C++ projects and use clangd as its main language server.
I believe this setup solves many issues and is a convenient way to develop C++ software, because it allows you to:
* Connect to your projects via a browser from anywhere.
* Have a fully configured `clangd` language server with code completion and navigation.
* Easily swap between projects, compilers, and libraries.
* Provide project access to friends or colleagues.

In this post, I will:
1. Create and set up an Incus container.
2. Install the Clang compiler and additional tools and libraries for C++ development, including:
    * `libc++` - is a new implementation of the C++ standard library by LLVM.
    * `CMake` - a software build system.
    * `ninja` - a small build system with a focus on speed.
    * `git` - a version control system.
    * `openssh-server` - OpenSSH server.
3. Set up environment variables so the Clang compiler is used as the default compiler for the current user.
4. Install and set up Visual Studio Code for the web. This will be achieved by using [code-server](https://github.com/coder/code-server). Optional plugins, such as clang language server support, will also be installed.
5. Proxy the Visual Studio Code via Nginx so it is possible to connect to the VS Code remotely.

The final section provides a step-by-step guide so you can skip to that section if you are proficient in Incus and Ubuntu or just want to see a short version of all commands and settings that were used in this post.

## Used ports, IPs and names
* `incus-cpp-clang` - the name of an Incus container on which a C++ compiler with additional tools will be installed.
* `images:ubuntu/24.04` - the Incus container image (Ubuntu 24.04 LTS). Can be different. See the [Default Incus Image Server](https://images.linuxcontainers.org/).
* `--storage incus-pool-fast` - the storage pool where the container will be created (optional).
* `--network br0` - the network bridge the container will connect to (optional).
* `192.168.205.16/24` - the IP address and subnet for the Incus container.
* `192.168.205.1` - the gateway or router in the local network (this will likely differ in your setup).
* `8080` - the port that will be used in order to connect to the Visual Studio Code in the browser.
* `clang-19.ide.savalione.com` - the hostname for Nginx proxy that will allow you to connect to your Visual Studio Code in the browser.
* `clang 19.1.7` - the version of Clang to be installed (optional). The version and compiler can be different (for example, you can install GCC).

Versions:
* Ubuntu LTS 24.04 - host operating system.
* Incus version 6.0.0.
* Nginx version 1.24.0 (optional).

## The Full Guide with Explanations
This guide consists of five steps.
You don't have to strictly follow every step, because a lot depends on your particular use case and what you actually need.
Here I've tried to explain every step as much as possible, so you get the general idea of what is going on.
I hope that this will help you to create your ideal setup for developing C++ applications.
The steps are:
1. Creating and setting up an Incus container.
2. Installing required and optional tools for the C++ development.
3. Creating a user account and setting up environment variables.
4. Installing and setting up Visual Studio Code in the browser.
5. Proxying the Visual Studio Code in the browser via Nginx.

### Step 1: Creating and setting up an Incus container
First, an Incus container needs to be created.
Even though it's possible to use an existing container, it would defeat the purpose of this post and you also may face some challenges managing containers.
In this step, an Incus container will be created and set up.

To create a container, run the following command:
* `incus launch images:ubuntu/24.04 incus-cpp-clang --storage incus-pool-fast --network br0`

Where:
* `images:ubuntu/24.04` - the Incus container image (Ubuntu 24.04 LTS). This can be different. See the [Default Incus Image Server](https://images.linuxcontainers.org/).
* `incus-cpp-clang` - the name of an Incus container on which a C++ compiler with additional tools will be installed.
* `--storage incus-pool-fast` - the storage pool where the container will be created (optional).
* `--network br0` - the network bridge the container will connect to (optional).

Enter a bash shell in the created container:
* `incus exec incus-cpp-clang -- bash`

Set up the network interface by editing `/etc/netplan/10-lxc.yaml` with your preferred editor (e.g., nano):
```yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      dhcp6: false
      addresses:
        - 192.168.205.16/24
      nameservers:
        addresses:
          - 192.168.205.1
      routes:
        - to: default
          via: 192.168.205.1
      dhcp-identifier: mac
```

Where:
* `dhcp4: false` and `dhcp6: false` - disable the DHCP protocol (automatic assignment of IP, subnet, name servers and gateway).
* `192.168.205.16/24` - the IP address and subnet for the Incus container.
* `192.168.205.1` - the gateway or router in the local network (this will likely differ in your setup).

Notice: when configuring Netplan configuration files and YAML in general, indentation is important.

Apply the new Netplan settings:
* `netplan apply`

Notice: In this post, an Ubuntu 24.04 LTS container is used.
Ubuntu typically uses Netplan for network configuration.
If you're using a different Linux distribution, your network manager and the way you configure your network interfaces might vary.

### Step 2: Installing required and optional tools for the C++ development
In this step required and optional tools for C++ development will be installed.
Here the Clang LLVM compiler was chosen as the main C++ compiler, but you can install any other compiler depending on your particular use case.

This post uses the official Clang automatic installation script that is available here:
* [LLVM Debian/Ubuntu nightly packages](https://apt.llvm.org/)

Before executing the script, some required tools should be installed, because many official Incus containers that are downloaded from the default image server don't have these tools preinstalled.
By executing the following command in the terminal, all necessary tools for installing Clang will be installed:
* `apt install wget lsb-release software-properties-common gnupg curl`

Where:
* `wget` - a tool for retrieving files (used to download the automatic installation script).
* `lsb-release` - a tool that prints certain Linux Standard Base and Distribution information (used by the script to determine the current kernel and distribution).
* `software-properties-common` - a package that allows you to manage your distribution software sources (used to properly add LLVM apt repositories).
* `gnupg` - an open source implementation of the OpenPGP standard (used in order to work with signing keys for LLVM apt repositories).
* `curl` - a tool for transferring data.

Download and execute the official Clang automatic installation script:
* `bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)"`

By doing the previous steps, the Clang compiler should've been installed.

But I would also suggest installing a new implementation of the C++ standard library by LLVM:
* `apt install libc++-19-dev`

Notice: the new implementation is called: `libc++`, but the `libc++-19-dev` package has been suggested.
* `19` - 19 is the version of the library (should probably be the same as the version of Clang compiler).
* `dev` - means that all development packages and includes should also be installed.

Also, I suggest installing additional tools for software development:
* `apt install cmake ninja-build git openssh-server`

Where:
* `CMake` - a software build system. I often use it instead of Makefiles because it's easier for me to declare a C++ project.
* `ninja` - a small build system with a focus on speed. This cross-platform tool is an alternative to the make build system which is somewhat faster.
* `git` - a version control system.
* `openssh-server` - OpenSSH server. Can be handy when you need to connect to the container or when you need to set up a Jenkins agent.

### Step 3: Creating a user account and setting up environment variables
Even though it is possible to compile and develop C++ applications as a root user, it is generally not recommended due to the risk of damaging the container's contents.
Here I describe how to create a user and set up environment variables so that build systems like CMake and make choose Clang as the default compiler.

To create a user, `savalione` for example, simply type this in your terminal, answer all questions and choose an appropriate password:
* `adduser savalione`

Additionally allow the created user to use `sudo` (the ability to execute certain commands as a root user) by adding the user to the sudo group:
* `usermod -aG sudo savalione`

Then, environment variables should be set up.
To do so, log in as the created user:
* `su - savalione`

Edit `~/.bashrc` or `~/.zshrc` with your preferred editor (e.g., nano) and add the following:
```bash
# Set LLVM/Clang as the default C and C++ compiler
# The -19 suffix is important. It represents current version of the Clang toolchain.
export CC=/usr/bin/clang-19
export CXX=/usr/bin/clang++-19

# For a more complete LLVM toolchain experience (optional).
# Use lld (the LLVM linker). This is much faster than the default GNU ld.
export LDFLAGS="-fuse-ld=lld"

# Use LLVM's archiver and ranlib (optional).
export AR=/usr/bin/llvm-ar-19
export RANLIB=/usr/bin/llvm-ranlib-19

# Add flags for the C++ compiler (optional).
# This tells clang++ to use the libc++ standard library.
export CXXFLAGS="-stdlib=libc++"
```

Where:
* `CC` - the C compiler to use.
* `CXX` - the C++ compiler to use.
* `LDFLAGS` - the linker to use (optional).
* `AR` - the archiver to use (optional).
* `RANLIB` - the ranlib to use (optional, generating an index for one or more archives).
* `CXXFLAGS` - the additional C++ flags (optional).

After modifying environment variables, apply the changes by running `source ~/.bashrc` or `source ~/.zshrc`.

At this point you should be able to compile C++ code using CMake and Ninja as a build system and LLVM Clang as a compiler.

### Step 4: Installing and setting up Visual Studio Code in the browser
This step is straightforward.
Here I describe how to install Visual Studio Code in the browser using [code-server](https://github.com/coder/code-server).
Additionally, I show how to set up some useful C++ plugins within Visual Studio Code that may make your life easier.

To install code-server you can check the official documentation that is available here: [code-server - install](https://coder.com/docs/code-server/install).

But by using the official install script the entire process is simple.
You need to download and execute the script:
* `curl -fsSL https://code-server.dev/install.sh | sh`

Now you can run and stop the VS Code by using the `code-server` command so all settings are automatically generated.

Then edit the code-server configuration file `~/.config/code-server/config.yaml` with your preferred editor (e.g., nano):
```yaml
bind-addr: 192.168.205.16:8080
auth: password
password: <your-auto-generated-password-here>
cert: false
```

Where:
* `192.168.205.16` - the IP on which the Visual Studio Code in the browser will be available.
* `8080` - the port to connect to the Visual Studio Code in the browser.
* `<your-auto-generated-password-here>` - the password. This will and should be different. It should be generated automatically upon the first run.

Essentially, you have now set up VS Code in the browser.
The next thing you should do is to choose the way the editor starts.
There are at least two ways to start the VS Code:
1. You can start and stop the server manually by executing `code-server` in the terminal.
2. You can create a Systemd service that will automatically start VS Code in the browser as a current user (or any other user depending on your choice). To do so, use the following command:
    * `sudo systemctl enable --now code-server@$USER`

Notice: `$USER` will typically be the user you are currently logged in as, e.g., `savalione` in this case.

Visual Studio Code in the browser should be available at: `192.168.205.16:8080`.

In addition, I would like to recommend some Visual Studio Code plugins I often use for C++ software development.
The plugins are:
* Clang-Format (identifier: `xaver.clang-format`) - a tool to format C++ code. It also supports C, Java, JavaScript, Objective-C, Objective-C++, and Protobuf code.
* clangd (identifier: `llvm-vs-code-extensions.vscode-clangd`) - clangd language server support.
* CMake (identifier: `twxs.cmake`) - a CMake syntax highlighter.

The clangd and Clang-Format plugins need to be set up.
To do so, add the following to your `.vscode/settings.json` configuration file:
```
// clangd setting
// You can add "-log=verbose" for verbose logging
"clangd.path": "/usr/bin/clangd-19",
"clangd.arguments": [
    "--pretty",
    "--background-index",
    "--query-driver=/usr/bin/clang++-19"
],
"clang-format.executable": "/usr/bin/clang-format-19",
"clang-format.style": "file",
```

Where:
* `clangd.path` - the path to clangd language server.
* `clangd.arguments` - clangd arguments.
    * `--pretty` - tells clangd to output diagnostic messages in a more human-readable format.
    * `--background-index` - clangd builds an index of your entire project (a crucial performance and feature-enhancement flag).
    * `--query-driver=/usr/bin/clang++-19` - tells clangd how to figure out the compiler flags.
* `clang-format.executable` - the path to the clang-format.
* `clang-format.style` - custom style options. Configures how clang-format determines the coding style to apply. `file` means that clang-format will try to find the .clang-format file that has configurable formatting style options. Instead of `file`, it can be `LLVM`, `Google`, `Mozilla`, etc.

### Step 5: Proxying the Visual Studio Code in the browser via Nginx
The final step is completely optional but may be required if you want to access your Visual Studio Code by connecting to a hostname securely.
Here I will show you how to set up your Nginx proxy that may be located on the Incus host or elsewhere in the same local network.

First of all, you need to have a domain.
Although, you can use your root domain for this purpose, I would suggest using a subdomain so you'll be able to set up multiple services on your domain without additional hassle.
For example, create a DNS record (on your domain name registrar's side):
* `clang-19.ide.savalione.com`

Where:
* `savalione.com` - your root domain.
* `clang-19.ide` - your sub domain. I used sub-subdomain in this case.

Optionally add the record with your domain to your local DNS server so you won't have to wait until the domains are delegated or to be able to connect to the server without setting up a transparent NAT firewall.
If you use Windows, you need to edit the `C:\Windows\System32\drivers\etc\hosts` file.
If you use Ubuntu, then edit the `/etc/hosts` file.

In either case, you need to add the following to any of these files:
```
192.168.205.16 clang-19.ide.savalione.com
```

In case you use pfSense as your router, navigate to your DNS Resolver and add a new host:
* Services -> DNS Resolver -> General Settings -> Host Overrides:
    * Host: `clang-19`
    * Domain: `ide.savalione.com`
    * IP Address: `192.168.205.16`
    * `Save`

Then you need to set up your Nginx proxy.
On the server that has Nginx, create a virtual host configuration file.
There are two common methods for creating a virtual host, both achieving a similar result.

The first method is the Ubuntu style.
You need to:
1. Create the `clang-19.ide.savalione.com` file in the `/etc/nginx/sites-available/` directory
2. Then link the file from: `/etc/nginx/sites-available/` to `/etc/nginx/sites-enabled/` so Nginx knows that the configuration file exists:
    * `sudo ln -s /etc/nginx/sites-available/clang-19.ide.savalione.com /etc/nginx/sites-enabled/`

The second way is to just create the `clang-19.ide.savalione.com` file in the `/etc/nginx/conf.d/` directory.

No matter which way you choose, add the following to your Nginx virtual host configuration file:
```
# clang-19.ide.savalione.com
server {
    listen 80;
    server_name clang-19.ide.savalione.com;

    # This is for Let's Encrypt / Certbot challenges
    location ~/.well-known/acme-challenge/ {
        root /www/net.savalione.com;
        allow all;
    }

    location / {
        proxy_pass http://192.168.205.16:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket Support
        # Required for applications that use WebSockets (like many IDEs and real-time apps)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Optional but recommended for large uploads
    client_max_body_size 1024M;
}
```

Then I recommend checking whether the Nginx configuration files are fine by executing:
* `nginx -t`

If everything is fine, reload Nginx:
* `systemctl reload nginx`

Next, I strongly suggest issuing a HTTPS certificate.
Here, I'll use Certbot.
Issue the certificate:
* `certbot --nginx -d clang-19.ide.savalione.com`

If the certificate was issued, reload Nginx one more time:
* `systemctl reload nginx`

## Notice: Securing your connection to the Visual Studio Code server
It is not secure to access your VS Code via HTTP, because all passed data (code, passwords, changes, etc.) could be intercepted by your network provider or network router.
If you plan to access the VS Code via the Internet, at least set up a HTTPS certificate.
A proper VPN connection to your local network is another effective solution.

## Notice: about `apt update` and `apt upgrade` after creating an Incus container
I haven't used `apt update` and `apt upgrade` after launching an Incus container because there is generally no immediate need to do so.
Many default Incus configurations assume that you use the Incus Default Image Server and that the Incus host will automatically update all images.

## Notice: How to check a container's network interfaces and settings
You can check the container's current network interfaces and assigned IPs by executing: `ip addr`.
In my case the output of this command looks like that:
```text
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
30: eth0@if31: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 00:16:3e:ff:5a:a7 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 192.168.205.16/24 brd 192.168.205.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::216:3eff:feff:5aa7/64 scope link
       valid_lft forever preferred_lft forever
```

Where:
* `lo` - a local loopback network interface. Should always exist. Used when the system tries to connect to local IPs like: `127.0.0.1/8`, `fc00::/7`.
* `eth0@if31` - a network interface with the `192.168.205.16/24` IP address.

## Notice: How to check all available Incus containers and virtual machines and their IPs
You can check all available Incus containers and virtual machines by executing: `incus list` on your Incus host.
For me it looks like that:
```bash
savalione@r720 ~ » incus list
+-------------------------+---------+------------------------+------+-----------------+-----------+
|          NAME           |  STATE  |          IPV4          | IPV6 |      TYPE       | SNAPSHOTS |
+-------------------------+---------+------------------------+------+-----------------+-----------+
| incus-cpp-clang         | RUNNING | 192.168.205.16 (eth0)  |      | CONTAINER       | 0         |
+-------------------------+---------+------------------------+------+-----------------+-----------+
```

Where:
* `savalione` - the username of the user that is connected to the host. 
* `r720` - the name of the host server.
* `incus-cpp-clang` - is the name of a container or virtual machine.
* `RUNNING` - the current state of a container or VM.
* `192.168.205.16` - the assigned IPv4 address.
* `eth0` - the internal network interface.
* `CONTAINER` - the type.
* `0` - the number of snapshots. 

## Step by step guide
I wrote a simple step-by-step guide, in case you know what every described command does:

1. Create and setup an Incus container:
    1. `incus launch images:ubuntu/24.04 incus-cpp-clang --storage incus-pool-fast --network br0`
    2. `incus exec incus-cpp-clang -- bash`
    3. Edit the `/etc/netplan/10-lxc.yaml` with your preferred editor (e.g., nano):
        ```yaml
        network:
          version: 2
          ethernets:
            eth0:
              dhcp4: false
              dhcp6: false
              addresses:
                - 192.168.205.16/24
              nameservers:
                addresses:
                  - 192.168.205.1
              routes:
                - to: default
                  via: 192.168.205.1
              dhcp-identifier: mac
        ```
    4. `netplan apply`
2. Install tools for C++ development:
    1. `apt install wget lsb-release software-properties-common gnupg curl`
    2. `bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)"`
    3. `apt install libc++-19-dev`
    4. `apt install cmake ninja-build git openssh-server`
3. Create a user and set up environment variables:
    1. `adduser savalione`
    2. `usermod -aG sudo savalione`
    3. Log in as the created user (`su - savalione`)
    4. Edit the `~/.bashrc` or `~/.zshrc` with your preferred editor (e.g., nano):
        ```bash
        # Set LLVM/Clang as the default C and C++ compiler
        # The -19 suffix is important. It represents current version of the Clang toolchain.
        export CC=/usr/bin/clang-19
        export CXX=/usr/bin/clang++-19

        # For a more complete LLVM toolchain experience (optional).
        # Use lld (the LLVM linker). This is much faster than the default GNU ld.
        export LDFLAGS="-fuse-ld=lld"

        # Use LLVM's archiver and ranlib (optional).
        export AR=/usr/bin/llvm-ar-19
        export RANLIB=/usr/bin/llvm-ranlib-19

        # Add flags for the C++ compiler (optional).
        # This tells clang++ to use the libc++ standard library.
        export CXXFLAGS="-stdlib=libc++"
        ```
    5. Update environment variables: `source ~/.bashrc` or `source ~/.zshrc`
4. Install and set up Visual Studio Code in a browser (code-server):
    1. `curl -fsSL https://code-server.dev/install.sh | sh`
    2. Edit the code-server configuration file `~/.config/code-server/config.yaml` with your preferred editor (e.g., nano):
        ```yaml
        bind-addr: 192.168.205.16:8080
        auth: password
        password: <your-auto-generated-password-here>
        cert: false
        ```
        * Change the IP, port and password to your desired settings
    3. Start code-server:
        * Start code-server now and restart on boot: `sudo systemctl enable --now code-server@$USER`
        * or
        * Start in the terminal: `code-server`
    4. Visual Studio Code should be available at: `192.168.205.16:8080`
    5. Set up Visual Studio Code to work with C++ projects:
        1. Install Clang-Format (identifier: `xaver.clang-format`)
        2. Install clangd (identifier: `llvm-vs-code-extensions.vscode-clangd`)
        3. Install CMake (identifier: `twxs.cmake`)
        4. Set up clangd language server and formatter by adding the following to the `.vscode/settings.json` configuration file:
            ```
                // clangd setting
                // You can add "-log=verbose" for verbose logging
                "clangd.path": "/usr/bin/clangd-19",
                "clangd.arguments": [
                    "--pretty",
                    "--background-index",
                    "--query-driver=/usr/bin/clang++-19"
                ],
                "clang-format.executable": "/usr/bin/clang-format-19",
                "clang-format.style": "file",
            ```
5. Proxy VS Code via Nginx:
    1. Create a DNS record (on your domain name registrar's side):
        * `clang-19.ide.savalione.com`
    2. Add the record to your local DNS server (optional):
        * For Windows, edit `C:\Windows\System32\drivers\etc\hosts`:
            ```
            192.168.205.16 clang-19.ide.savalione.com
            ```
        * For Ubuntu, edit `/etc/hosts`:
            ```
            192.168.205.16 clang-19.ide.savalione.com
            ```
        * For pfSense: Services -> DNS Resolver -> General Settings -> Host Overrides:
            * Host: `clang-19`
            * Domain: `ide.savalione.com`
            * IP Address: `192.168.205.16`
            * `Save`
    3. Create a Nginx configuration file:
        * For Ubuntu style:
            1. Create the file `/etc/nginx/sites-available/clang-19.ide.savalione.com`
            2. `sudo ln -s /etc/nginx/sites-available/clang-19.ide.savalione.com /etc/nginx/sites-enabled/`
        * For regular style:
            1. Create `/etc/nginx/conf.d/clang-19.ide.savalione.com`
    4. Add the following to the Nginx virtual host configuration file:
        ```
        # clang-19.ide.savalione.com
        server {
            listen 80;
            server_name clang-19.ide.savalione.com;

            # This is for Let's Encrypt / Certbot challenges
            location ~/.well-known/acme-challenge/ {
                root /www/net.savalione.com;
                allow all;
            }

            location / {
                proxy_pass http://192.168.205.16:8080;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

                # WebSocket Support
                # Required for applications that use WebSockets (like many IDEs and real-time apps)
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
            }

            # Optional but recommended for large uploads
            client_max_body_size 1024M;
        }
        ```
    5. `systemctl reload nginx`
    6. Issue a HTTPS certificate via certbot:
        1. `certbot --nginx -d clang-19.ide.savalione.com`
        2. `systemctl reload nginx`

## Additional links
* [Default Incus Image Server](https://images.linuxcontainers.org/)
* [libc++ C++ Standard Library](https://libcxx.llvm.org/)
* [VS Code in the browser - code-server](https://github.com/coder/code-server)
* [code-server - install](https://coder.com/docs/code-server/install)
* [LLVM Debian/Ubuntu nightly packages](https://apt.llvm.org/)
* [Install code-server: OS Instructions for VS Code](https://coder.com/docs/code-server/install#installsh)
* [What is clangd?](https://clangd.llvm.org/)
