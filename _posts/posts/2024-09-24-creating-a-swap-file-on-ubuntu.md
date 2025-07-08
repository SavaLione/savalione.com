---
layout: post
type: posts
title: "Creating a swap file on Ubuntu and configuring swappiness"
date: 2024-09-24
description: "In this post I show a way to create a swap file and swap extension"
categories: [linux]
tags: [ubuntu, linux, swap, swappiness]
---

Here I describe a way to create a swap file and swap extension.

I don't prefer to create a swap partition from an entire disk partition and I'm not sure there is a reason for that.

## Creating a file for swap
First of all you need to create a file for a swap partition:
* `sudo fallocate -l 1G /swap_file`

Where:
* `1G` - is size of the file.
* `/swap_file` - filename and location.

Then set rights on the file:
* `sudo chmod 600 /swap_file`

To check the created file and its rights you can use `ls`:
* `ls -lh /swap_file`

## Making the created file a swap
To make a file swap you need to use `mkswap` and `swapon`:
1. `sudo mkswap /swap_file`
2. `sudo swapon /swap_file`

To check current swap extensions you may use `swapon` and `free`:
* `swapon --show`
* `free -h`

## Making swap persistent
Previously created swap won't be persistent and will vanish after system reboot.
To prevent that behavior you need to modify `fstab` file.

First of all, it's a good practice to create a backup version of existent `fstab` file:
* `sudo cp /etc/fstab /etc/fstab.bak`

Then you need to add created swap file to file systems table (`fstab`).
It's usually done by modifying `/etc/fstab` and adding the line that describes swap file location and it's properties.

Use `sudo nano /etc/fstab` to modify `fstab` file.
Add the next line at the end of file:
* `/swap_file none swap sw 0 0`

Where:
* `/swap_file` - location to the swap file.

## Modifying swappiness
Kernel parameter `vm.swappiness` describes the amount of ram will be moved to swap extension if needed.
Usually it's 60% but sometimes my servers stuck when I try to compile something.
I prefer it to be 10%.

First thing I do is to use `sysctl` command to change swappiness right away:
* `sudo sysctl vm.swappiness=10`

But changing swappiness that way won't be persistent so you also need to change `sysctl.conf` file:
* `sudo nano /etc/sysctl.conf`
    * `vm.swappiness=10`

In order to check current swappiness you can write `cat /proc/sys/vm/swappiness` in your terminal.

## Summing up
1. `sudo fallocate -l 1G /swap_file`
2. `sudo chmod 600 /swap_file`
3. `sudo mkswap /swap_file`
4. `sudo swapon /swap_file`
5. `sudo cp /etc/fstab /etc/fstab.bak`
6. `sudo nano /etc/fstab`
    * `/swap_file none swap sw 0 0`
7. `sudo sysctl vm.swappiness=10`
8. `sudo nano /etc/sysctl.conf`
    * `vm.swappiness=10`
