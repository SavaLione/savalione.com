---
title: "AzuraCast Music Library: Host Passthrough with ZFS, Incus, and Docker"
date: 2025-06-04
description: "Integrate your existing ZFS music library with AzuraCast using Incus and Docker. Step-by-step tutorial for host passthrough and separate cache management"
categories: [self-hosting]
tags: [AzuraCast, ZFS, Incus, Docker, Host Passthrough, Music Library, Self-Hosted Radio, Linux, Ubuntu, Tutorial]
---

AzuraCast is a neat tool when you need a self-hosted web radio station.
It's based on various popular open source tools like icecast and recommended to be installed via Docker for simplicity and future streamlined updates.
Although it's possible to upload and manage all music via the web interface, some people may have a music collection that is already categorized and stored in a separate directory or semi-sophisticated ZFS pool.
The official guide explains how to mount a directory that is on the host machine to the AzuraCast docker container ([Docker - Storing Your Station Data on the Host Machine](https://www.azuracast.com/docs/administration/docker/#storing-your-station-data-on-the-host-machine)), but it doesn't cover some additional use cases and requires full read and write access to that directory to store its cache.

For this reason, I decided to show an example of how to manage external paths and pass them through to an Incus virtual machine and then to AzuraCast running inside Docker.

In this post, I will:
1. Create a ZFS dataset for a music library. This is optional if a music library already exists.
2. Create a specific ZFS dataset for AzuraCast cache. It's also optional. It can come in very handy if:
    * the music library's ZFS dataset is Read-only.
    * the pool that stores music is slow. Maybe it uses a high level of compression, or made up of several slow HDD drives.
    * You have a special ZFS dataset for caching. For example, the caching dataset is made of nvme drives.
3. Passthrough the datasets to an Incus virtual machine and the AzuraCast Docker container. 
4. Add the music library to an AzuraCast radio station.

## Used ports, IPs and names
* `zfs-pool-fast` - the name of a root ZFS dataset.
* `zfs-pool-fast/music` - the name of a ZFS dataset for storing a music library.
* `zfs-pool-fast/cache` - the name of a ZFS dataset for storing AzuraCast cache.
* `/zfs-pool-fast/music` - the location to the music library.
* `/zfs-pool-fast/cache` - the location to the place where to store cache.
* `incus-vm-azuracast` - the name of an Incus virtual machine that has Docker with AzuraCast on it.
* `zp7-music` - the name of an attached Incus device.

Versions:
* Ubuntu LTS 24.04 - host operating system.
* Incus version 6.0.0.

## The Full Guide with Explanations
This guide is separated into four steps.
Each step and console command has an explanation.
The steps are:
1. Creating ZFS datasets (optional).
2. Attaching paths to the Incus VM.
3. Attaching paths to the AzuraCast.
4. Setting up AzuraCast in the web interface.

### Step 1: Creating ZFS datasets (optional)
First of all, it is important to understand where the music library is or will be stored.
This step is optional because you may already have a directory with a music library or you don't want to mess with ZFS.
But if you're considering the place where the music library will be stored, a ZFS dataset is a great place for it.
Not only is a ZFS dataset a secure place (in terms of maintaining data consistency), but it also provides neat features such as compression, large block size and great performance.

If you decided to set up ZFS for the music library, you need to create a ZFS dataset for the music library:
* `sudo zfs create -o recordsize=1M -o compression=lz4 -o dedup=off -o sync=standard -o atime=off -o xattr=sa zfs-pool-fast/music`

Where:
* `recordsize` - maximum size of a logical block in a ZFS dataset. 1M is because most of my music tracks are in FLAC format and large. For me, 1M provides better compression ratio and better read speeds.
* `compression` - ZFS compression algorithm. `lz4` is just great and I use it most of the time.
* `dedup` - deduplication. I want to be sure that deduplication is turned off. Deduplication is useful in certain scenarios but it is basically useless when you store different music tracks.
* `sync` - ZFS sync mode. Even for music tracks, I want to ensure that the data is consistent and safe.
* `atime` - update atime on a file read. I disable it for some performance reasons.
* `xattr` - extended attributes. I use `sa` for some performance reasons.
* `zfs-pool-fast/music` - the name of the created ZFS dataset.
    * `zfs-pool-fast` - the name of a root ZFS dataset.
    * `music` - the name of a ZFS dataset for storing a music library.

Next, you need to create ZFS dataset for cache:
* `sudo zfs create -o recordsize=128k -o compression=lz4 -o dedup=off -o sync=standard -o atime=off -o xattr=sa zfs-pool-fast/cache`

Where:
* `cache` - is the name of a ZFS dataset for storing AzuraCast cache.

Note: `recordsize` for cache can be any; 128k is just for possible performance gains.

Note: It is not strictly necessary to create a separate ZFS dataset for the cache.
It's possible to:
* Use local directories in the AzuraCast Docker container.
* Mount the music library as read-write with full access to the Incus VM and the Docker container.

### Step 2: Attaching paths to the Incus virtual machine
Because the main idea of this blog post is that your Docker container with AzuraCast is installed inside a virtual machine (an Incus VM in this case), you need to pass through the paths to the virtual machine.

You also need to decide where to keep your cache.
There are at least three possible ways:
1. On a separate host's ZFS pool specifically created for cache purposes.
2. On some hosts's path.
3. Inside the Incus virtual machine.

This guide follows the first method, but it should be trivial to use another method.
Just change the location to the host's cache directory or passthrough a local path from the Incus virtual machine to the Docker container.

Stop the Incus VM:
* `incus stop incus-vm-azuracast`

Passthrough directories to the Incus VM:
* `incus config device add incus-vm-azuracast zp7-music disk source=/zfs-pool-fast/music path=/zfs-pool-fast/music readonly=true`
* `incus config device add incus-vm-azuracast zp7-music disk source=/zfs-pool-fast/cache path=/zfs-pool-fast/cache` (optional)

Where:
* `incus-vm-azuracast` - the name of an Incus virtual machine that has Docker with AzuraCast on it.
* `source` - the location on the host. This can vary if, for example, you mount ZFS datasets in different locations.
* `path` - location where Incus should mount the directory inside the virtual machine.
* `/zfs-pool-fast/music` - the location to the music library.
* `/zfs-pool-fast/cache` - the location to the place where to store cache.
* `readonly=true` - mount the path as read-only (optional). Can be used for security reasons or to prevent possible issues in the future.

Start the Incus VM:
* `incus start incus-vm-azuracast`

Note: if you haven't created a cache ZFS pool, you can keep the cache inside the Incus virtual machine.

### Step 3: Attaching paths to the AzuraCast Docker container
Next, you need to pass through the paths to the Docker container.
There are useful tricks on the AzuraCast official documentation:
* [Docker - Mounting a Directory Into a Station](https://www.azuracast.com/docs/administration/docker/#mounting-a-directory-into-a-station)
* [Docker - Storing Your Station Data on the Host Machine](https://www.azuracast.com/docs/administration/docker/#storing-your-station-data-on-the-host-machine)


Enter the Incus VM:
* `incus exec incus-vm-azuracast -- bash`

Move to the AzuraCast directory:
* `cd /var/azuracast/`

Create a Docker Compose override file (`docker-compose.override.yml`) to modify the AzuraCast Docker container's behavior:
* `touch docker-compose.override.yml`

Edit `docker-compose.override.yml`, connect music library and cache directory to the AzuraCast Docker container:
```
services:
  web:
    volumes:
      - /zfs-pool-fast/music:/var/azuracast/music
      - /zfs-pool-fast/cache/.albumart:/var/azuracast/music/.albumart
      - /zfs-pool-fast/cache/.covers:/var/azuracast/music/.covers
```

Where:
* `/var/azuracast/music` - the destination of the mounted directory inside the Docker container.
* `.albumart` and `.covers` - are the directories in which AzuraCast is going to create cache.

Note: Even though the music library directory can be mounted as read-only, AzuraCast assumes that it has a full read-write access to this directory.
But it's possible to mount read-write directories for cache so that the music library directory stays read-only and untouched, the cache directories can be separately mounted as read-write and will function correctly.

Note: if you want to use local directories from the Incus VM in the AzuraCast Docker container, you need to:
1. Create directories for the cache:
    * `mkdir /cache`
    * `mkdir /cache/.albumart`
    * `mkdir /cache/.covers`
2. Then, link these created directories in your `docker-compose.override.yml`:
    ```
    services:
      web:
        volumes:
          - /zfs-pool-fast/music:/var/azuracast/music
          - /cache/.albumart:/var/azuracast/music/.albumart
          - /cache/.covers:/var/azuracast/music/.covers
    ```

Note: if you've attached the music library as read-write directory, your `docker-compose.override.yml` may look like this:
```
services:
  web:
    volumes:
      - /zfs-pool-fast/music:/var/azuracast/music
```

If `docker-compose` doesn't exist in the VM, install it:
* `./docker.sh install-docker-compose`

Where:
* `./docker.sh` - is the official script that is distributed with AzuraCast for installing Docker Compose.

Stop the AzuraCast Docker containers:
* `docker-compose down`

Start the containers with the updated configuration:
* `docker-compose up -d`

### Step 4: Adding the music library to an AzuraCast radio station
The last step is pretty trivial.
You just need to use the AzuraCast web interface to add the music library path to the system and to each required radio station.

Add the music library (directory) in the AzuraCast web interface via settings:
* System Administration -> Storage Locations -> Add storage location
    * Storage Adapter: `Local Filesystem`
    * Path/Suffix: `/var/azuracast/music`

Change a station's default music path:
* System Administration -> Stations -> Edit Station -> Administration -> Media Storage Location

Add files to a playlist (optional).

After adding files to the playlist, you just need to wait some time.
AzuraCast may take a significant amount of time to add all music files and generate cache (covers).

By completing this full guide, you added a music library from the host to the AzuraCast with fully working cache.
The whole setup may look like this:
* Bare metal server -> Linux OS -> Incus VM -> Docker -> AzuraCast Container

## Notice - symbolic and hard links
Needless to say, that AzuraCast currently doesn't support linked directories inside a data path.
So you cannot create links for cache directories.
The destination of a mount can be a symbolic link itself, but AzuraCast may not follow symbolic links within the mounted media directory.

## Notice - access rights
The directory that stores the music library can be read-only.
Usually, I set the following permissions on all files:
* `775` - for directories.
* `664` - for files.

On the other hand, if cache directories are located outside of the Incus virtual machine and docker container, the directories should be writable.
To make these directories fully readable and writable, there are different ways:
1. Properly set up rights on the host, within Incus, and for the Docker container. This is the correct way to do it, but it can be a nightmare to maintain.
2. Allow full read-write access to any user (`777`). It's probably not very secure but for me, this method is the way to go.

## Step by step guide
In case you know what every command line does, I wrote a simple step by step guide:

1. Create ZFS datasets:
    1. `sudo zfs create -o recordsize=1M -o compression=lz4 -o dedup=off -o sync=standard -o atime=off -o xattr=sa zfs-pool-fast/music`
    2. `sudo zfs create -o recordsize=128k -o compression=lz4 -o dedup=off -o sync=standard -o atime=off -o xattr=sa zfs-pool-fast/cache`
2. Attach paths to the Incus virtual machine:
    1. `incus stop incus-vm-azuracast`
    2. `incus config device add incus-vm-azuracast zp7-music disk source=/zfs-pool-fast/music path=/zfs-pool-fast/music readonly=true`
    3. `incus config device add incus-vm-azuracast zp7-music disk source=/zfs-pool-fast/cache path=/zfs-pool-fast/cache`
    4. `incus start incus-vm-azuracast`
3. Attach paths to the AzuraCast Docker container:
    1. `incus exec incus-vm-azuracast -- bash`
    2. `cd /var/azuracast/`
    3. `touch docker-compose.override.yml`
    4. Edit `docker-compose.override.yml` with your preferred editor (e.g., nano):
        ```
        services:
          web:
            volumes:
              - /zfs-pool-fast/music:/var/azuracast/music
              - /zfs-pool-fast/cache/.albumart:/var/azuracast/music/.albumart
              - /zfs-pool-fast/cache/.covers:/var/azuracast/music/.covers
        ```
    5. `./docker.sh install-docker-compose`
    6. `docker-compose down`
    7. `docker-compose up -d`
4. Add the music library to an AzuraCast radio station:
    1. Add the music library (directory) in the azuracast web interface via settings.
        * System Administration -> Storage Locations -> Add storage location
            * Storage Adapter: `Local Filesystem`
            * Path/Suffix: `/var/azuracast/music`
    2. Change a station's default music path
        * System Administration -> Stations -> Edit Station -> Administration -> Media Storage Location
    3. Add files to the playlist
    4. Wait some time

## Additional links
* [Docker - Mounting a Directory Into a Station](https://www.azuracast.com/docs/administration/docker/#mounting-a-directory-into-a-station)
* [Docker - Storing Your Station Data on the Host Machine](https://www.azuracast.com/docs/administration/docker/#storing-your-station-data-on-the-host-machine)
* [Docker Compose](https://docs.docker.com/compose/)
