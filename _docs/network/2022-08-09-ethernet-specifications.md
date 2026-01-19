---
title:  "Ethernet specifications"
date: 2022-08-09
description: "Ethernet specifications: data rate period, frame and packet sizes, frames per second, packet per second, and else"
categories: [docs]
---

## Ethernet data rate period

|:Data rate:|||||||||||
|Period|100M||1G||10G||40G||100G||
| ^^ |bits|bytes|bits|bytes|bits|bytes|bits|bytes|bits|bytes|
|10ns   |1      |0.125  |10     |1.25   |100    |12.5   |400    |50     |1K     |125    |
|100ns  |10     |1.25   |100    |12.5   |1K     |125    |4K     |500    |10K    |1.25K  |
|1us    |100    |12.5   |1K     |125    |10K    |1.25K  |40K    |5K     |100K   |12.5K  |
|10us   |1K     |125    |10K    |1.25K  |100K   |12.5K  |400K   |50K    |1M     |125K   |
|100us  |10K    |1.25K  |100K   |12.5K  |1M     |125K   |4M     |500K   |10M    |1.25M  |
|1ms    |100K   |12.5K  |1M     |125K   |10M    |1.25M  |40M    |5M     |100M   |12.5M  |
|10ms   |1M     |125K   |10M    |1.25M  |100M   |12.5M  |400M   |50M    |1G     |125M   |
|100ms  |10M    |1.25M  |100M   |12.5M  |1G     |125M   |4G     |500M   |10G    |1.25G  |
|1s     |100M   |12.5M  |1G     |125M   |10G    |1.25G  |40G    |5G     |100G   |12.5G  |
|1m     |6G     |750M   |60G    |7.5G   |600G   |75G    |2.4T   |300G   |6T     |750G   |
|1h     |360G   |45G    |4.6T   |250G   |36T    |4.5T   |144T   |18T    |360T   |45T    |
|1d     |8.64T  |1.08T  |86.4T  |10.8T  |864T   |108T   |3.456P |432T   |8.64P  |1.08P  |

## Ethernet frame and packet
### Ethernet frame and packet sizes


|:Ethernet frame and packet sizes:|||||||||
|       |Default       ||VLAN          ||Q-in-Q        ||MPLS          ||
| ^^    |Frame  |Packet |Frame  |Packet |Frame  |Packet |Frame  |Packet |
|:------|:------|:------|:------|:------|:------|:------|:------|:------|
|Minimum|64     |84     |64     |84     |64     |84     |64     |84     |
|Maximum|1518   |1538   |1522   |1542   |1526   |1546   |1530   |1550   |

#### Minimum default ethernet packet and frame

|:Minimum default ethernet packet and frame:||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|Type   |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|2 Bytes|Min 46 bytes|4 bytes|
|Layer 2| ||:Ethernet frame:|||||
|Layer 1|:Ethernet packet:|||||||

Minimum default ethernet frame size: 64 bytes

Minimum default ethernet packet size: 84 bytes

#### Minimum vlan tagged ethernet packet and frame (IEEE 802.1Q)

|:Minimum vlan tagged ethernet packet and frame:|||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|802.1Q Tag|Type   |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|4 bytes   |2 Bytes|Min 42 bytes|4 bytes|
|Layer 2| ||:Ethernet vlan tagged frame:||||||
|Layer 1|:Ethernet vlan tagged packet:||||||||

Minimum vlan tagged ethernet frame size: 64 bytes

Minimum vlan tagged ethernet packet size: 84 bytes

#### Minimum Q-in-Q tagged ethernet packet and frame (IEEE 802.1ad)

|:Minimum Q-in-Q tagged ethernet frame:||||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|Metro Tag|Customer Tag|Type   |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|4 bytes  |4 bytes     |2 Bytes|Min 38 bytes|4 bytes|
|Layer 2| ||:Ethernet Q-in-Q tagged frame:|||||||
|Layer 1|:Ethernet Q-in-Q tagged packet:|||||||||

Minimum Q-in-Q tagged ethernet frame size: 64 bytes

Minimum Q-in-Q tagged ethernet packet size: 84 bytes

#### Minimum MPLS tagged ethernet packet and frame

|:Minimum MPLS tagged ethernet packet and frame:|||||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|Type     |MPLS Label  |MPLS Label  |MPLS Label  |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|2 bytes  |4 bytes     |4 bytes     |4 bytes     |Min 34 bytes|4 bytes|
|Layer 2| ||:Ethernet MPLS tagged frame:||||||||
|Layer 1|:Ethernet MPLS tagged packet:||||||||||

Minimum MPLS tagged ethernet frame size: 64 bytes

Minimum MPLS tagged ethernet packet size: 84 bytes

#### Maximum default ethernet packet and frame

|:Maximum default ethernet packet and frame:||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|Type   |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|2 Bytes|1500 bytes  |4 bytes|
|Layer 2| ||:Ethernet frame:|||||
|Layer 1|:Ethernet packet:|||||||

Maximum default ethernet frame size: 1518 bytes

Maximum default ethernet packet size: 1538 bytes

#### Maximum vlan tagged ethernet packet and frame (IEEE 802.1Q)

|:Maximum vlan tagged ethernet packet and frame:|||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|802.1Q Tag|Type   |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|4 bytes   |2 Bytes|1500 bytes  |4 bytes|
|Layer 2| ||:Ethernet vlan tagged frame:||||||
|Layer 1|:Ethernet vlan tagged packet:||||||||

Maximum vlan tagged ethernet frame size: 1522 bytes

Maximum vlan tagged ethernet packet size: 1542 bytes

#### Maximum Q-in-Q tagged ethernet packet and frame (IEEE 802.1ad)

|:Maximum Q-in-Q tagged ethernet frame:||||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|Metro Tag|Customer Tag|Type   |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|4 bytes  |4 bytes     |2 Bytes|1500 bytes  |4 bytes|
|Layer 2| ||:Ethernet Q-in-Q tagged frame:|||||||
|Layer 1|:Ethernet Q-in-Q tagged packet:|||||||||

Maximum Q-in-Q tagged ethernet frame size: 1526 bytes

Maximum Q-in-Q tagged ethernet packet size: 1546 bytes

#### Maximum MPLS tagged ethernet packet and frame

|:Maximum MPLS tagged ethernet packet and frame:|||||||||||
|       |Interframe Gap|Preamble|DST MAC|SRC MAC|Type     |MPLS Label  |MPLS Label  |MPLS Label  |Data        |CRC    |
| ^^    |12 Bytes      |8 Bytes |6 bytes|6 bytes|2 bytes  |4 bytes     |4 bytes     |4 bytes     |1500 bytes  |4 bytes|
|Layer 2| ||:Ethernet MPLS tagged frame:||||||||
|Layer 1|:Ethernet MPLS tagged packet:||||||||||

Maximum MPLS tagged ethernet frame size: 1530 bytes

Maximum MPLS tagged ethernet packet size: 1550 bytes

### Smallest size of Ethernet frame
The minimum frame payload is 46 Bytes (dictated by the slot time of the Ethernet LAN architecture).
The maximum frame rate is achieved by a single transmitting node which does not therefore suffer any collisions.
This implies a frame consisting of 72 Bytes (see table below) with a 9.6 µs inter-frame gap (corresponding to 12 Bytes at 10 Mbps).
The total utilised period (measured in bits) corresponds to 84 Bytes.

|:Ethernet frame parts:||
|Frame Part|Minimum Size Frame|
|Inter Frame Gap (9.6µs)|12 Bytes|
|MAC Preamble (+ SFD)|8 Bytes|
|MAC Destination Address|6 Bytes|
|MAC Source Address|6 Bytes|
|MAC Type (or Length)|2 Bytes|
|Payload (Network PDU)|46 Bytes|
|Check Sequence (CRC)|4 Bytes|
|Total Frame Physical Size|84 Bytes|

The maximum number of frames per second is:
```text
Ethernet Data Rate (bits per second) / Total Frame Physical Size (bits)
    = 10 000 0000 / (84 x 8)
    = 14 880 frames per second.
```

### Largest size of Ethernet frame
The maximum frame payload is 1500 Bytes, this will offer the highest throughput, when the frames are transmitted by only one node on the network (i.e. there are no collisions)
To calculate the throughput provided by the link layer, one must first calculate the maximum frame rate for this size of frame.


|:Ethernet frame parts:||
|Frame Part|Maximum Size Frame|
|:---|:---|
|Inter Frame Gap (9.6µs)|12 Bytes|
|MAC Preamble (+ SFD)|8 Bytes|
|MAC Destination Address|6 Bytes|
|MAC Source Address|6 Bytes|
|MAC Type (or Length)|2 Bytes|
|Payload (Network PDU)|1500 Bytes|
|Check Sequence (CRC)|4 Bytes|
|Total Frame Physical Size|1538 Bytes|

The largest frame consists of 1526 Bytes (see table above) with a 9.6 µs inter-frame gap (corresponding to 12 Bytes at 10 Mbps).
The total utilised period (measured in bits) therefore corresponds to 1538 Bytes.

The maximum frame rate is:
```text
Ethernet Data Rate (bits per second) / Total Frame Physical Size (bits)
    = 812.74 frames per second
```

The link layer throughput (i.e. number of payload bits transferred per second) is:
```text
Frame Rate x Size of Frame Payload (bits)
    = 812.74 x (1500 x 8)
    = 9 752 880 bps.
```

This represents a throughput efficiency of 97.5 %.

[comment]: <> (Source: https://erg.abdn.ac.uk/users/gorry/course/lan-pages/enet-calc.html#:~:text=This%20is%20however%20not%20usually,only%20812%20frames%20per%20second).)

### Maximum frame rates reference
Provided by Roger Beeman, Cisco Systems

|:Maximum frame rates reference:||||
|Size (bytes)|Ethernet (pps)|16Mb Token Ring (pps)|FDDI (pps)|
|:---|:----|:----|:-----|
|64  |14880|24691|152439|
|128 |8445 |13793|85616 |
|256 |4528 |7326 |45620 |
|512 |2349 |3780 |23585 |
|768 |1586 |2547 |15903 |
|1024|1197 |1921 |11996 |
|1280|961  |1542 |9630  |
|1518|812  |1302 |8138  |

### Maximum number of frames per second

|:Maximum number of frames per second:|||
|Speed (bits per second)|Frames Per Second (fps)|Frames Per Second (fps)|
|:----------|:----------|:----------|
|10 Mbps    |14880      |14.8 kfps  |
|100 Mbps   |148809     |148 kfps   |
|1 Gbps     |1488095    |1.48 mfps  |
|10 Gbps    |14880952   |14.8 mfps  |
|25 Gbps    |37202380   |37.2 mfps  |
|40 Gbps    |59523809   |59.5 mfps  |
|100 Gbps   |148809523  |148 mpfs   |

```text
(speed in bits) / ((frame size)*8)

Example for minimum default ethernet packet:
    (speed in bits) / (84*8)
```

## Ethernet cable categories frequency

|Category|Speed|Max frequency|
|:---|:---|:---|
|CAT 1|Carry only voice|1MHz|
|CAT 2|4Mbps|4MHz|
|CAT 3|10Mbps|16Mhz|
|CAT 4|16Mbps|20Mhz|
|CAT 5|100Mbps|100Mhz|
|CAT 5e|1000Mbps|100Mhz|
|CAT 6|1000Mbps|250MHz|
|CAT 7|10Gbps|600MHz|
|CAT 7a|10Gbps|1000Hz|
|CAT 8|25Gbps|2000Mhz|

