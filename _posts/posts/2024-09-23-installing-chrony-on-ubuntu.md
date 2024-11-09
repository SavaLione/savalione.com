---
layout: post
type: posts
title: "Installing chrony on Ubuntu"
date: 2024-09-23
last_modified_at: 2024-11-09 17:26:00
description: "The way I configure chrony on a Ubuntu machine"
categories: [linux]
tags: [ubuntu, linux, chrony]
author: Savelii Pototskii
---

Here I describe a way I configure time server on a Ubuntu machine.

It's not a preferable or right way but I am just used to set up time servers like that.

## Installing
Simplest way to install chrony is to download package from apt repository:
* `sudo apt install chrony`

## Configuring
chrony configure file is located here:
* `/etc/chrony/chrony.conf`

You can keep default settings that are provided by package maintainer, but I usually change default pool addresses.

Default NTP pool servers:
```
pool ntp.ubuntu.com        iburst maxsources 4
pool 0.ubuntu.pool.ntp.org iburst maxsources 1
pool 1.ubuntu.pool.ntp.org iburst maxsources 1
pool 2.ubuntu.pool.ntp.org iburst maxsources 2
```

I change them to be as follows:
```
server 0.pool.ntp.org iburst
server 1.pool.ntp.org iburst
server 2.pool.ntp.org iburst
server 3.pool.ntp.org iburst
```

After changing setting you need to restart chrony service:
* `sudo systemctl restart chrony`

## Changing timezone
By using `timedatectl set-timezone` you can change timezone.
* `sudo timedatectl set-timezone Etc/UTC`

You can see all available timezones via:
* `timedatectl list-timezones`

## Checking chrony stats
To check chrony stats you can write:
* `chronyc sources`

## Summing up
1. `sudo apt install chrony`
2. `sudo nano /etc/chrony/chrony.conf`
3. Change default NTP pool servers:
    ```
    server 0.pool.ntp.org iburst
    server 1.pool.ntp.org iburst
    server 2.pool.ntp.org iburst
    server 3.pool.ntp.org iburst
    ```
4. `sudo systemctl restart chrony`
