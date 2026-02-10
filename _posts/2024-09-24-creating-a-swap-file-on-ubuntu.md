---
title: "Creating a Swap File on Ubuntu and Configuring Swappiness"
date: 2024-09-24
description: "In this post, I demonstrate how to create a swap file and configure swap space on Linux"
categories: [linux]
tags: [ubuntu, linux, swap, swappiness]
---

In this post, I describe how to create a swap file and enable swap space.

I prefer not to dedicate an entire disk partition to swap.
Using a file offers more flexibility.

## Creating a file for swap
First of all, you need to create a file that will act as the swap space:
* `sudo fallocate -l 1G /swap`

Where:
* `1G` - the size of the file.
* `/swap` - the filename and location.

Next, set the correct permissions on the file to ensure only the root user can read it:
* `sudo chmod 600 /swap`

To check the created file and its permissions, use `ls`:
* `ls -lh /swap`

## Enabling the swap file
To turn the file into swap space, use `mkswap` and `swapon`:
1. `sudo mkswap /swap`
2. `sudo swapon /swap`

To check the current swap status, use `swapon` and `free`:
* `swapon --show`
* `free -h`

## Making swap persistent
The swap space created above is not persistent and will vanish after reboot.
To prevent this, you need to modify the `fstab` file.

First, it's a good practice to create a backup of the existing `fstab` file:
* `sudo cp /etc/fstab /etc/fstab.bak`

Then, add the created swap file to the file system table (`fstab`).
This is done by modifying the `/etc/fstab` file and appending a line that describes the swap file location and its properties.

Use `sudo nano /etc/fstab` to modify the file.
Add the following line at the end of the file:
* `/swap none swap sw 0 0`

Where:
* `/swap` - the location of the swap file.

## Modifying swappiness

The kernel parameter `vm.swappiness` controls how aggressively the Linux kernel swaps memory pages.
The default value is usually `60`, but I find that my servers sometimes become unresponsive during heavy compilation tasks with this setting.
I prefer this setting to be `10` (which means 10%).

To change swappiness immediately (until the next reboot), use `sysctl`:
* `sudo sysctl vm.swappiness=10`

To make this change persistent across reboots, you need to modify the `sysctl.conf` file:
* `sudo nano /etc/sysctl.conf`
    * Add or modify: `vm.swappiness=10`

To check the current swappiness value, run `cat /proc/sys/vm/swappiness`.

## Summary
1. Create the file: `sudo fallocate -l 1G /swap`
2. Set permissions: `sudo chmod 600 /swap`
3. Initialize swap: `sudo mkswap /swap`
4. Enable swap: `sudo swapon /swap`
5. Backup fstab: `sudo cp /etc/fstab /etc/fstab.bak`
6. Edit fstab: `sudo nano /etc/fstab`
    * Add: `/swap none swap sw 0 0`
7. Set runtime swappiness: `sudo sysctl vm.swappiness=10`
8. Set persistent swappiness: `sudo nano /etc/sysctl.conf`
    * Add: `vm.swappiness=10`
