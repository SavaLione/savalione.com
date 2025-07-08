---
layout: post
type: posts
title: "Basic ZFS commands and tricks that I use often on Ubuntu"
date: 2024-10-12
description: "This post is about a way I use ZFS on Ubuntu"
categories: [linux]
tags: [ubuntu, linux, zfs]
---

Here I describe a way I use ZFS on Ubuntu.
Usually I just create mirror partition (RAID 1) for storing and sharing some data.

**Using almost any of given command will probably erase some data.**
**If you're not sure what you're doing, check any good documentation or guide.**
* [OpenZFS documentation](https://openzfs.github.io/openzfs-docs/)
* [fdisk (8) documentation on due.net](https://linux.die.net/man/8/fdisk)

**BE EXTREMELY CAREFUL.**
It's very simple to lose data.
If you don't understand something or you want to just create a partition, don't be afraid of asking questions on any resource you prefer, like stackoverflow or reddit.

## Erasing partitions from a drive
First of all you need to erase all partitions from every drive.
In order to do so I use `fdisk`.

Via `fdisk -l` you can see all drives and partition tables assigned to them.
To erase all partitions you can simply do the following:
1. Find correct drive:
    * `sudo fdisk -l`
    * (for example let's use `/dev/sdf`)
2. Open the drive using `fdisk`:
    * `sudo fdisk /dev/sdf`
    * (now you're using `fdisk` application)
3. In order to check whether you're using the right drive you can print the drive info and all partitions that are on current drive by pressing `p`.
4. Delete partitions:
    * Press `d` for each partition that drive has or until `fdisk` prints the error that there are no partitions left.
5. Write all changes by pressing `w`

After erasing partitions you can create a ZFS pool.

## Creating a simple pool
It's not recommended to create a ZFS pool via `/dev/sd*` devices because Ubuntu may reassign drives after reboot.
But using drives by their id will eliminate this issue.

Drives ids are stored in `/dev/disk/by-id/` directory.
As a way to find required drive, just use `ls` and `grep`:
* `ls -l /dev/disk/by-id/ | grep sd`

Usually drives are named using following convention: `type-id-partition`.
* Example: `scsi-SATA_ST2000DM008-2FR1_ZFL16E1K-part1`
* Type may be: `ata`, `scsi`, `wwn`, etc. Usually it doesn't matter what you choose. I prefer using `scsi`.
* ID may include following characters: `_`, `-`.
* If you've erased partitions from a drive, you won't see `-part*`.

You don't want to create a ZFS pool out of disk partitions.

To create a ZFS pool you need to use `zpool` tool.

Example of creating a ZFS pool out of a single drive:
* `sudo zpool create -f zfs-pool-something /dev/disk/by-id/scsi-SATA_ST2000DM008-2FR1_ZFL16E1K`

Where:
* `zfs-pool-something` - the name of the pool.
* `/dev/disk/by-id/scsi-SATA_ST2000DM008-2FR1_ZFL16E1K` - the drive by id.

Also, you can create a pool with different RAID level:
* `sudo zpool create -f zfs-pool-something mirror /dev/disk/by-id/scsi-SATA_ST2000DM008-2FR1_ZFL16E1K /dev/disk/by-id/wwn-0x5000c50087237149`

Where:
* `zfs-pool-something` - the name of the pool.
* `mirror` - type of the RAID.
    * It can be:
        * `mirror` - RAID 1, mirror.
        * nothing - RAID 0, stripe.
        * `raidz`, `raidz2`, `raidz3` - RAID-Z, where 1, 2 or 3 drives can be broken or replaced without loosing data.
* `/dev/disk/by-id/scsi-SATA_ST2000DM008-2FR1_ZFL16E1K` and `/dev/disk/by-id/wwn-0x5000c50087237149` - used drives.

In order to check the pool you can use following commands:
* `zpool status`
* `zpool list`
* `zfs list`

## Creating a pool with tuning
The default ZFS setting are good, but depending on the situation I may change some of them.

Generally I create a zfs pool like that:
1. I erase all partitions from a drive.
2. `sudo zpool create -o ashift=12 -f zfs-pool-something /dev/disk/by-id/`
3. `sudo zfs set recordsize=128k zfs-pool-something`
4. `sudo zfs set compression=lz4 zfs-pool-something`
5. `sudo zfs set xattr=sa zfs-pool-something`
6. `sudo zfs set atime=off zfs-pool-something`
7. I create datasets with tuning.

Alignment Shift (`ashift`) determines the size of a block that ZFS will use.
`ashift` is a number that represents power of 2 (ashift=2^x).

|ashift|size       |description|
|:-----|:----------|:----------|
|0     |auto-detect|zfs should auto-detect the sector size.|
|9     |512b       |I don't recommend using it at all|
|12    |4096b      |Good default value|
|13    |8192b      |Good value that sometimes is supported by special SSDs (some of samsung SSDs may support this value)|

Record size (`recordsize`) - maximum size of a logical block in a ZFS dataset.

|recordsize|description|
|:---------|:----------|
|64k       |I use it rarely|
|128k      |Default good value|
|1M        |Good value for media and torrent pools|

Compression (`compression`).

|compression|description|
|:----------|:----------|
|off        |Disables compression, I don't recommend it|
|on         |zfs should use and choose compression (usually it's lz4)|
|lz4        |Great default compression that I use all the time|
|gzip       |gzip compression which may provide better compression ratio but generally requires more resources in order to compress data. It's good on systems with external compression hardware (like Intel QuickAssist)|

Check a documentation and run some tests if you need to have some sophisticated compression.
On my system I have approximately 5 compression algorithms with tuning:
* I can use any of the next values: `on`, `off`, `lzjb`, `gzip`, `gzip-[1-9]`, `zle`, `lz4`, `zstd`, `zstd-[1-19]`, `zstd-fast` and `zstd-fast-[1-10,20,30,40,50,60,70,80,90,100,500,1000]`.

Extended Attributes (`xattr`) - how zfs should handle Linux extended attributes in a file system.
I use `xattr=sa`.

Access time (`atime`) - updating atime on a file read.
I turn it off `atime=off`.

You can see the list of all available zfs settings by using `zfs get`.

In order to see what settings are used by the pool or dataset, you can use `zfs get`:
1. `zpool get all | grep ashift`
2. `zfs get recordsize zfs-pool-something`
3. `zfs get compression zfs-pool-something`
4. `zfs get xattr zfs-pool-something`
5. `zfs get atime zfs-pool-something`

## Creating a dataset with tuning
It's simple.
Just choose the tuning settings and use `zfs create`:
* `sudo zfs create -o recordsize=128k -o compression=lz4 -o dedup=off -o sync=standard -o atime=off -o xattr=sa zfs-pool-something/dataset`

Where:
* `zfs-pool-something` - the name of the pool on which you want to create a dataset.
* `dataset` - the name of the dataset.

## Creating an encrypted dataset with tuning
There are different ways to create an encrypted dataset.
It's possible to use certs and hardware keys, but easiest one is to use a passphrase:
* `sudo zfs create -o recordsize=128k -o compression=lz4 -o dedup=off -o sync=standard -o atime=off -o xattr=sa -o encryption=on -o keyformat=passphrase zfs-pool-something/encrypted-dataset`

Where `encryption=on` and `keyformat=passphrase` tell zfs that you want to use encryption and use a passphrase as a key.

To mount an encrypted partition do the following:
1. `sudo zpool import zfs-pool-something/encrypted-dataset`
2. `sudo zfs load-key zfs-pool-something/encrypted-dataset`
3. `sudo zfs mount zfs-pool-something/encrypted-dataset`

To unmount an encrypted partition:
1. `sudo zfs umount zfs-pool-something/encrypted-dataset`
2. `sudo zfs unload-key zfs-pool-something/encrypted-dataset`

## Deleting and exporting a pool
To destroy a pool use `zpool destroy`.
It will destroy the chosen pool.

Sometimes you want to just disconnect the pool from a system.
One of the most often reasons I do so when I want to move a pool from one server to another.
And to do so I use `zpool export zfs-pool-something`.

## Creating a snapshot
`zfs snapshot` allows you to create a snapshot.
In order to create a recursive snapshot (a snapshot for all descendent file systems) you need to add `-r` option.

Example: `zfs snapshot -r zfs-pool-something@2024-10-09`
Where:
* `zfs snapshot -r` - create a recursive snapshot.
* `zfs-pool-something` - the name of the pool.
*  `2024-10-09` - the name of the snapshot.

## A simple script for creating snapshots
Snapshots are useful when you need to save a read-only copy of a file system or volume.
Even though you can create snapshots manually, there are at least two simple ways that can help you automate this process:
* Can create a bash script and crontab job.
* Use something similar to [zfs_autobackup](https://github.com/psy0rz/zfs_autobackup).

My bash script for creating recursive snapshots looks like that:
```bash
#!/bin/bash

date=$(date '+%Y-%m-%d_%H:%M')

/usr/sbin/zfs snapshot -r zfs-pool-something@$date
```

This script will create recursive snapshots of the `zfs-pool-something` pool with the name of the date they were taken and it will look like this: `zfs-pool-something@2024-10-09_01:00`.

In order to show snapshots for the specific pool you can use `zfs list`:
* `zfs list -t snapshot zfs-pool-something`

And to show all snapshots of all pools, simply write the following:
* `zfs list -t snapshot -o name`

## Deleting snapshots
Snapshots will be deleted by `zfs destroy` command with specifying the snapshot you want to delete: `zfs destroy zfs-pool-something@snapshot`.

If you created snapshots with the script from above, you would be able to destroy a range of snapshots that follow a certain pattern.
Usually I delete snapshots recursively except the last 16 or the last one.

To keep only the last 16 I use the following command:
* `zfs list -t snapshot -o name | grep ^zfs-pool-something@2024-10- | tac | tail -n +16 | xargs -n 1 zfs destroy -r`

And to keep only the last one:
* `zfs list -t snapshot -o name | grep ^zfs-pool-something@2024-10- | tac | tail -n +2 | xargs -n 1 zfs destroy -r`

Where:
* `zfs-pool-something` - the name of the pool.
* `2024-10-` - a period of time that follows a specific pattern.
Sometimes I want to delete all snapshots except the last one for a certain month (in this example for October 2024). Sometimes the last one of a certain year. Then the pattern will look equivalent to `2024-`.
* `tail -n +16` and `tail -n +2` - describe the amount of snapshots to keep.
