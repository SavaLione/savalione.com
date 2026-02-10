---
title: "Installing and Configuring chrony on Ubuntu"
date: 2024-09-23
description: "A guide on how I configure the chrony NTP client on Ubuntu"
categories: [linux]
tags: [ubuntu, linux, chrony, ntp]
---

In this post, I describe how I configure a time server on an Ubuntu machine.

While the default configuration works for most users, I prefer to explicitly set up my upstream NTP servers.

## Installing
The simplest way to install chrony is to download the package from the apt repository:
* `sudo apt install chrony`

## Configuring
The chrony configuration file is located here:
* `/etc/chrony/chrony.conf`

You can keep the default settings provided by the package maintainer, but I usually change the default pool addresses.

Default NTP pool servers:
```
pool ntp.ubuntu.com        iburst maxsources 4
pool 0.ubuntu.pool.ntp.org iburst maxsources 1
pool 1.ubuntu.pool.ntp.org iburst maxsources 1
pool 2.ubuntu.pool.ntp.org iburst maxsources 2
```

I change them to the Google Public NTP servers:
```
server time1.google.com iburst
server time2.google.com iburst
server time3.google.com iburst
server time4.google.com iburst
```

After changing the settings, you need to restart the service:
* `sudo systemctl restart chrony`

## Changing timezone
You can change the system timezone using `timedatectl`:
* `sudo timedatectl set-timezone Etc/UTC`

You can view all available timezones via:
* `timedatectl list-timezones`

## Checking chrony stats
To check the sources chrony is currently using:
* `chronyc sources`

To check the tracking details (system offset, stratum, etc.):
* `chronyc tracking`

## Summary
1. `sudo apt install chrony`
2. `sudo nano /etc/chrony/chrony.conf`
3. Change default NTP pool servers:
```
server time1.google.com iburst
server time2.google.com iburst
server time3.google.com iburst
server time4.google.com iburst
```
4. `sudo systemctl restart chrony`

## Additional links
* [Google Public NTP - Configuring Clients](https://developers.google.com/time/guides)
