---
layout: docs
type: docs
title:  "Cisco router memory"
date:   2008-01-01
last_modified_at: 2022-08-04 00:32:00
description: "Cisco router memory datasheet and specs"
categories: [Cisco]
tags:
  - Cisco
  - Routing
  - Memory
  - Specs
permalink: /docs/cisco/cisco_router_memory
---
All numbers for table 1a/b/c are for internal DRAM/Flash only.
For external flash cards/disks, see table 5.

Column "E?" is a field that indicates if the unit supports external flash memory (See Table 5).

Memory given as 'standard' (Std) will always be sold as an optimal configuration - for example, a 3660 that comes with
32Mb DRAM default would be given as a single 32Mb module, instead of 2 x 16Mb.
This is always the case unless there is a severe memory component shortage.

## Table 1 - SOHO/SMB Routers

|Router |Memory              ||||Flash                       |||||
| ^^    |Fixed|Slots|Std  |Max  |Fixed|Slots|Std  |Max   |E?     |
|:-----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:-----:|
|SB 100 |64   |0    |64   |64   |12   |0    |12   |12    |N      |
|SOHO7x |16   |0    |16   |16   |8or12|0    |8or12|8or12 |N      |
|SOHO9x |64   |0    |64   |64   |8    |0    |8    |8     |N      |
|700    |1.5  |0    |1.5  |1.5  |1    |0    |1    |1     |N      |
|801-804|4    |1    |8    |12   |4    |1    |8    |12    |N      |
|805    |8    |1    |8    |16   |4    |1    |8    |12    |N      |
|806    |16   |1    |32   |32   |0    |1    |8    |16    |N      |
|811-813|8    |1    |12   |16   |4    |1    |8    |12    |N      |
|827/828|16   |1    |32   |32   |8    |1    |8    |16    |N      |
|826/827H|16  |1    |32   |32   |8    |1    |8    |16    |N      |
|827-4V |16   |1    |48   |48   |8    |1    |12   |16    |N      |
|83x    |64   |1    |64   |80   |8    |1    |12   |24    |N      |
|85x    |64   |1    |64   |192  |20   |1    |20   |52    |N      |
|87x    |128  |1    |128  |256  |20   |1    |20   |52    |N      |
|1003    |0   |0    |8    |16   |0 (External PCMCIA only)||||Y   |
|1004    |0   |0    |8    |16   |0 (External PCMCIA only)||||Y   |
|1005    |0   |0    |8    |16   |0 (External PCMCIA only)||||Y   |
|1400    |8   |1    |16   |24   |0 (External PCMCIA only)||||Y   |
|16xx    |2   |1    |2    |18   |0 (External PCMCIA only)||||Y   |
|16xxR   |8   |1    |8    |24   |0 (External PCMCIA only)||||Y   |
|1701    |64  |1    |64   |128  |32   |0    |32   |32    |N      |
|1710    |32  |1    |64   |96   |16   |0    |16   |16    |N      |
|1711    |64  |1    |96   |128  |32   |0    |32   |32    |N      |
|1712    |64  |1    |96   |128  |32   |0    |32   |32    |N      |
|1720    |16  |1    |32   |48   |0    |1    |8    |16    |N      |
|1721    |64  |1    |64   |128  |32   |0    |32   |32    |N      |
|1750    |16  |1    |16   |48   |0    |1    |4    |16    |N      |
|1750-xV |16  |1    |32   |48   |0    |1    |8    |16    |N      |
|1751    |64  |1    |64   |128  |32   |0    |32   |32    |N      |
|1751-V  |64  |1    |96   |128  |32   |0    |32   |32    |N      |
|1760    |64  |1    |64   |160  |32   |1    |32   |64    |N      |
|1760-V  |64  |1    |96   |160  |32   |1    |32   |64    |N      |
|1801    |128 |1    |128  |384  |0 (External CF only)    ||||Y   |
|1802    | ^^ | ^^  | ^^  | ^^  | ^^                     |||| ^^ |
|1803    | ^^ | ^^  | ^^  | ^^  | ^^                     |||| ^^ |
|1811    | ^^ | ^^  | ^^  | ^^  | ^^                     |||| ^^ |
|1812    | ^^ | ^^  | ^^  | ^^  | ^^                     |||| ^^ |
|1841    | ^^ | ^^  | ^^  | ^^  | ^^                     |||| ^^ |
|IAD2400 |64  |0    |64   |64   |8    |0    |8    |8     |N      |
|2500    |0or2|1    |4or8 |16   |0    |2    |8    |16    |N      |

|:Notes - SOHO/SMB Router Memory:|
|:---|
|806/826's shipped prior to April 2002 had less DRAM (16Mb) standard (not 32Mb as default/maximum).|
|811/813's shipped prior to Jan 2004 had less DRAM (8 MB) standard |
|1721/51/60 shipped prior to August 18 2003 had 16MB flash and 32-64 MB DRAM.|
|Pre-May 2003 83x's shipped with 8MB flash standard. March 2005 saw an increase in default DRAM to 64.|
|SOHO 71 Broadband Router has 12MB flash, all other models are 8MB|

## Table 2 - Midrange/Access Routers

|Router |System Memory |||Packet Memory|||Main Flash||||Boot Flash||E?|
| ^^    |Slots|Std  |Max  |Slots|Std  |Max  |Fixed|Slots|Std  |Max  |Min  |Max  | ^^  |
|:-----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|2610   |2    |32   |64   |0              |||0    |1    |8    |16   |0         ||N    |
|2611   | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2612   | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2613   | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2620   |2    |32   |64   |0              |||0    |1    |8    |32   |0         ||N    |
|2621   | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2650   |2    |32   |128  |0              |||0    |1    |8    |32   |0         ||N    |
|2651   | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2610XM |2    |128  |256  |0              |||16   |1    |32   |48   |0         ||N    |
|2611XM | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2620XM | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2621XM | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2650XM |2    |256  |256  |0              |||16   |1    |32   |48   |0         ||N    |
|2651XM | ^^  | ^^  | ^^  | ^^            ||| ^^  | ^^  | ^^  | ^^  | ^^       || ^^  |
|2691|2|256|256 |0|||0|1|32|128|0||Y|
|2801|1|128|384 |0|||0 External CF only||64|128|4|4|Y|
|2811|2|256|768 |0|||0 External CF only||64|256|2|2|Y|
|2821|2|256|1024|0|||0 External CF only||64|256|2|2|Y|
|2851|2|256|1024|0|||0 External CF only||64|256|2|2|Y|
|3620      |4|32|64 |0|||0|2|16|32|0||Y|
|3640      |4|32|128|0|||0|2|16|32|0||Y|
|3640A     |4|32|128|0|||0|2|16|32|0||Y|
|3660 Ent  |2|32|256|0|||0|2|16|64|0||Y|
|3660 Telco|2|32|256|0|||0|2|16|64|0||Y|
|3631|2|64 |256|0|||0|1|32|128|0||N|
|3725|2|256|256|0|||0|1|32|128|0||Y|
|3745|2|256|512|0|||0|1|32|128|0||Y|
|3825|2|256|1024|0|||0 External CF||64|256| ||Y|
|3845|2|256|1024|0|||0 External CF||64|256| ||Y|
|mc3810   |1|32|64|0|||0|1|16|32|0||N|
|mc3810 V3|1|64|64|0|||0|1|16|32|0||N|
|4000M|1|8|32|1|4|16|0|2|4|16|0||N|
|4500M|2|16|32|1|4|16|0|2|4|16|4|16|N|
|4700M |2|16|64|1|4|16|0|2|4 |16|8||N|
|AS5200|1|8 |16|1|4|16|0|2|16|16|0||N|
|AS5300    |2|64|128|1|8|16|0|2|16|32|8|8|N|
|AS5350    |2|128|512|1|64|128|0|2|32|64|8|16|N|
|AS5400 HPX|2|256|512|1|64|128|0|2|32|64|8|16|N|

|:Notes - Midrange/Access Routers:|
|:---|
|2610-21's were first shipped with 16Mb DRAM, then 24Mb, then standardized on 32Mb before EOS.|
|262x's assembled prior to March, 2001 used a bootROM incompatible with the 32Mb Flash module from the 265x series and must be upgraded to the new bootrom to be able to use this module.|
|36xx routers shipped prior to mid-May of 2002 shipped with 8Mb default flash memory.|
|On any 4x00M, all 2-slot memory must have either a single chip installed or have same-size chips installed.|
|26xxXM's prior to August 18, 2003 came, in most cases, with 32MB DRAM and 16 MB Flash. On June 14 2004, 261x/2x XM's went from 96 to 128MB default, 265x and 2691/37xx went from 128 to 256MB default.|
|26xxXM's shipped prior to April 2004 had a maximum DRAM capacity of 128MB. This was upped to 256MB through a bootROM which can be ordered separately for older 2600XM's, and requires 12.3(11)T IOS.|
|3660 (Telco only) increased default memory from 32 to 128MB DRAM and 16 to 32MB Flash in Feb. 2004.|
|The 2801 has 128MB memory soldiered onto the motherboard.|
|2801 has (1) 1.1 USB port / 2811,2821,2851, 3825, 3845 have (2) USB 1.1 ports|

## Table 3 - 7xxx Series Routers

|Router |Route Memory ||| Packet Memory |||Boot Flash |||E?|
| ^^    |Slots|Std|Max|Slots|Std|Max|Slots|Std|Max| ^^ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|70x0 RP |4|16|64 |0|||1|4|4|Y|
|70x0 RSP|4|16|128|0|||1|8|8|Y|
|71xx    |2|64|256|1|64|64|1|8|8|Y|
|72xx NPE-100|4|32|128|0|||0|||N|
|72xx NPE-150|4|64|128|1 fixed|||0|||N|
|72xx NPE-175|1|64|128|0|||0|||N|
|72xx NPE-200|4|64|128|4 fixed|||0|||N|
|72xx NPE-225|1|128|256|0|||0|||N|
|72xx NPE-300|2|128|256|2|32|32|0|||N|
|72xx NPE-400|1|128|512|0|||0|||N|
|72xx NPE-G1 |2|256|1024|16 <= 256|||16 fixed|||Y|
| ^^         | ^^ | ^^ | ^^ |32 > 256||| ^^ ||| ^^ |
|72xx NPE-G2 |1|256|1024|0|||64 fixed|||Y|
|72xx NSE-1  |1|128|256|0|||0|||N|
|72xx I/O -FE|0||||||0|4|4|Y|
| ^^ | ^^ ||||||1| ^^ | ^^ | ^^ |
|72xx I/O-GE 2FE|0||||||8 fixed|||Y|
|7301|2|256|1024|16 <= 256|||32 fixed|||Y|
| ^^ | ^^ | ^^ | ^^ |32 > 256||| ^^ ||| ^^ |
|7304 NSE-100 |1|512 |512 |0|||1|32|32|Y|
|7304 NSE-G100|2|1024|1024|128|||1|32|32|Y|
|7401|1|128|512|0|||8 fixed|||Y|
|75xx RSP1   |4|16 |128 |0|||1|8 |8 |Y|
|75xx RSP2   |4|32 |128 |0|||1|8 |8 |Y|
|75xx RSP4   |2|64 |256 |2 fixed|||1|8 |16|Y|
|75xx RSP4+  |2|64 |256 |2 fixed|||1|8 |16|Y|
|75xx RSP8   |2|64 |256 |8 fixed|||1|16|16|Y|
|75xx RSP16  |2|128|1024|8 fixed|||1|16|16|Y|
|75xx VIP2-10|2|16|64 |1|0.512|2|0|||N|
|75xx VIP2-15|2|16|64 |1|1 |2|0|||N|
|75xx VIP2-20|2|16|64 |1|1 |2|0|||N|
|75xx VIP2-40|2|32|64 |1|2 |2|0|||N|
|75xx VIP2-50|1|32|128|1|4 |8|0|||N|
|75xx VIP4   |1|64|256|1|64|64|0|||N|
|75xx VIP6   |1|64|256|1|64|64|0|||N|

|:Notes - 7xxx Series Routers:  ||
|:------|:-----------------------|
|NPE-100|must pair memory SIMM's.|
|NPE-150| ^^                     |
|NPE-200| ^^                     |
|NPE-G1 | ^^                     |
|7301   | ^^                     |
|VIP2-10| ^^                     |
|VIP2-15| ^^                     |
|VIP2-20| ^^                     |
|VIP2-40| ^^                     |

## Memory Tables - Table 4 - Core Routers

|Router |Route Memory   |||Packet Memory   |||Boot Flash      |||E?   |
| ^^    |Slots|Std  |Max  |Slots|Std  |Max   |Slots|Std  |Max   | ^^  |
|:-----:|:---:|:---:|:---:|:---:|:---:|:----:|:---:|:---:|:----:|:---:|
|10000 PRE  |2|512|512|0|128|128|0|32|32|Y|
|10000 PRE-1| ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
|10000 PRE-2|2|1024|1024|0|256|256|0|64|64|Y|
|12000 GRP-B|2|128|512|0 |||1|8|8|Y|
|12000 PRP  |2|512|2048|0 |||1|64|64|Y|
|12000 PRP-2|2|1024|4096|0 |||1|64|64|Y|
|12000 Engine 0|2|128|256|4|128|256|0|||N |
|12000 Engine 1|2|128|256|4|256|256|0|||N |
|12000 Engine 2|2|128|256|4|256|512|0|||N |
|12000 Engine 3|2|256|512|4|512|512|0|||N |
|12000 Engine 4|1|256|512|4|512|512|0|||N |
|CRS-1 RP|2|2048|4096|0 |||1 40GB IDE disk|||Y|
|CRS-1 RP|2|2048|2048|2 |2048|2048|0|||N|

|:Notes - Core Routers:|
|:---|
|12000 line cards use paired packet mem in dedicated banks (i.e. 2x64MB RX, 2x64MB TX (256MB config)).|
|PRE and PRE-1 differ in PXF memory - 512MB (former) or 1GB (latter). PRE-1 is required for broadband.|

## Identifying Router Memory

|:Router Model :|:Procedure:|
|:-------------:|:---|
|1841           |Issue a ``show platform`` command.|
|26xx           |Issue a ``show c2600`` command. This may not work on older models of 26xx, and only works in newer IOS images - 12.2(11)T is required (Cisco Enhancement ID CSCdv58188).|
|26xxXM         |Issue a ``show c2600`` command. Only works in newer IOS images - 12.2(11)T is required (Cisco Enhancement ID CSCdv58188).|
|2691           |Issue a ``show platform`` command.|
|2800           | ^^ |
|3620           |Use the procedure described at ``http://www.cisco.com/warp/customer/63/simm_config_3620_3640.html``|
|3640           | ^^ |
|3631           |Issue a ``show platform`` command.|
|3700           | ^^ |
|3800           | ^^ |
|AS5400         |Issue a ``show as5400`` command. Only works in newer IOS images - 12.2(11)T is required (Cisco Enhancement ID CSCdv64625).|
