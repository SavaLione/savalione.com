---
layout: post
type: posts
title: "Changing hostname on Ubuntu"
date: 2024-09-23
description: "One of the ways to change hostname on a Ubuntu machine"
categories: [linux]
tags: [ubuntu, linux, hostname]
---

Here I show one of the ways to change hostname on a Ubuntu machine.

## Checking current hostname
In order to check the current ubuntu machine hostname you can use these commands:
* `hostname`
* `hostnamectl`

## Changing hostname
### /etc/hosts
The first place where I change hostname is the `hosts` file:
* `sudo nano /etc/hosts`

I change line with `127.0.1.1` local ip.
Where the first part is a local ip, second is the FQDN (fully qualified domain name) hostname and the last one is the machine hostname itself.
Example:
```
127.0.1.1      w.savalione.com w
```

### /etc/hostname
The second place where I change hostname is the `hostname` file:
* `sudo nano /etc/hostname`

Here I use a FQDN machine name (something like that: `w.savalione.com`).

### hostnamectl
Also, after changing configuration files, I use `hostnamectl` tool:
* `sudo hostnamectl set-hostname w.savalione.com`

### reboot
In the end I reboot the machine:
* `sudo systemctl reboot`

## Summing up
1. `sudo nano /etc/hosts`
2. `sudo nano /etc/hostname`
3. `sudo hostnamectl set-hostname hostname.example.com`
4. `sudo systemctl reboot`
