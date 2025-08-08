---
title: "How to create a zfs pool out of a file"
date: 2024-10-15
description: "This post is about a way you can create a zfs pool and filesystem out of a single file or series of files"
categories: [linux]
tags: [ubuntu, linux, zfs]
---

One of the neat features that zfs allows you to implement is to create a zfs filesystem out of a file.
It's especially useful when you need to create a secure or portable filesystem.

Usually I use this method in order to create a small secure zfs volume that I may move to another system in the future by simply copying the files that represent a zfs filesystem.

## Creating a pool
I prefer to create a separate directory for pool files:
* `mkdir zfs-pool-something`

Then you need to create a file.
There are two ways you can do so:
* `truncate -s 256M zfs-pool-something-1`
* `dd if=/dev/zero of=zfs-pool-something-1 bs=1M count=256`

Where `256M` and `bs=1M count=256` are equal to 256 megabytes.

And finally, create a pool:
* `sudo zpool create -o ashift=12 -f zfs-pool-something /path/zfs-pool-something-1`

## Importing a pool
To import the pool you ned to specify its name and its path:
* `sudo zpool import -d /path/zfs-pool-something zfs-pool-something`

## Exporting a pool
The idea is the same as for any other zfs pool:
* `sudo zpool export zfs-pool-something`

## Expanding a pool
In order to expand a pool you have at least 2 ways:
1. Create a new file and add it to the pool.
2. Create a new file and replace the old file with the new one.

### Adding a new file to the pool
This it the method I usually use.

To accomplish this you need to:
1. Create a new file:
    * `truncate -s 512M zfs-pool-something-2`
2. Add the file to the pool:
    * `sudo zpool add zfs-pool-something /path/zfs-pool-something-2`

### Replacing an old file with a new one
To increase a zfs pool size by replacing an old file with a new one you need to:
1. Create a new file:
    * `truncate -s 512M zfs-pool-something-2`
2. Replace the old file:
    * `sudo zpool replace zfs-pool-something /path/zfs-pool-something/zfs-pool-something-1 /path/zfs-pool-something/zfs-pool-something-2`

## Creating a pool with secure dataset
To accomplish this goal you need to:
1. Create a new file:
    * `truncate -s 256M zfs-pool-something-1`
    * `dd if=/dev/zero of=zfs-pool-something-1 bs=1M count=256`
2. Create a pool:
    * `sudo zpool create -o ashift=12 -f zfs-pool-something /path/zfs-pool-something-1`
3. Create an encrypted dataset:
    * `sudo zfs create -o encryption=on -o keyformat=passphrase zfs-pool-something/encrypted-dataset`
