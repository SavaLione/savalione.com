---
layout: docs
type: docs
title:  "Cisco routing performance"
date: 2009-11-03
description: "Cisco routing performance"
categories: [docs]
---
## Router Switching Performance in Packets Per Second (PPS)
Numbers are given with 64 byte packet size, IP only, and are only an indication of raw switching performance.
These are testing numbers, usually with FE to FE, GigE to GigE or POS to POS, no services enabled. As you add ACL's,
encryption, compression, etc - performance will decline significantly from the given numbers, unless it is a hardware-assisted
platform, such as the ASR 1000, 7600 or 12000, which process QoS, ACL's, and other features in hardware (or when a hardware
assist is installed, for instance an AIM-VPN in a 3745 will offload the encryption from the CPU).
Every situation is different - please simulate the true environment to get applicable performance
values. 

Knowing the performance for a specific router platform is not a good indication of how well a specific feature will
perform. If a feature is supported in the CEF path, for instance, and we know the feature-free CEF throughput in a
specific configuration, then we only know the platform's "never-to-exceed" performance but we do not know the
actual performance of any given feature, which will always be less. 

All numbers are for IP packets only - no IPX/AT/DEC, etc.
Mbps calculated by ``pps * 64bytes * 8bits/byte``.
Except for 12000 (Engines 0, 1, 2, 3 and 5) where these numbers represent the maximum mbps forwarding rates when packets are greater than 64 bytes.
Please see inserted comments in this field.



|Platform         |Process Switching ||CEF Switching         ||
| ^^              |PPS         |Mbps  |PPS          |Mbps     |
|:---------------:|:----------:|:----:|:-----------:|:-------:|
|801              |1000                           |||0.51     |
|805              | ^^                            ||| ^^      |
|806              |            |      |7000         |3.58     |
|830              |            |      |8500         |4.35     |
|850              |            |      |10000        |5.12     |
|860              |            |      |25000        |12.80    |
|870              |            |      |25000        |12.80    |
|880              |            |      |50000        |25.60    |
|890              |            |      |100000       |51.20    |
|14xx             |600         |0.3072|4000         |2.05     |
|1601R            |600         |0.3072|4000         |2.05     |
|1602R            |600         |0.3072|4000         |2.05     |
|1603R            |600         |0.3072|4000         |2.05     |
|1604R            |600         |0.3072|4000         |2.05     |
|1605R            |600         |0.3072|4000         |2.05     |
|1701             |1700        |0.8704|12000        |6.14     |
|1710             |1300        |0.6656|7000         |3.58     |
|1711             |1700        |0.8704|13500        |6.91     |
|1712             |1700        |0.8704|13500        |6.91     |
|1720             |1400        |0.7168|8500         |4.35     |
|1721             |1700        |0.8704|12000        |6.14     |
|1750             |1400        |0.7168|8500         |4.35     |
|1751             |1500        |0.768 |12000        |6.14     |
|1760             |1700        |0.8704|16000        |8.19     |
|1801             |            |      |70000        |35.84    |
|1802             |            |      |70000        |35.84    |
|1803             |            |      |70000        |35.84    |
|1811             |            |      |70000        |35.84    |
|1812             |            |      |70000        |35.84    |
|1841             |            |      |75000        |38.40    |
|1861             |            |      |146142       |74.82    |
|1941 G2          |            |      |299000       |153.08   |
|2500             |800         |0.4096|4400         |2.25     |
|2610             |1500        |0.768 |15000        |7.68     |
|2611             |1500        |0.768 |15000        |7.68     |
|2620             |1500        |0.768 |25000        |12.80    |
|2621             |1500        |0.768 |25000        |12.80    |
|2650             |2000        |1.024 |37000        |18.94    |
|2651             |2000        |1.024 |37000        |18.94    |
|2610XM           |1500        |0.768 |20000        |10.24    |
|2611XM           |1500        |0.768 |20000        |10.24    |
|2620XM           |1500        |0.768 |30000        |15.36    |
|2621XM           |1500        |0.768 |30000        |15.36    |
|2650XM           |2000        |1.024 |40000        |20.48    |
|2651XM           |2000        |1.024 |40000        |20.48    |
|2691             |7400        |3.7888|70000        |35.84    |
|2801             |3000        |1.536 |90000        |46.08    |
|2811             |3000        |1.536 |120000       |61.44    |
|2821             |11500       |5.888 |170000       |87.04    |
|2851             |15000       |7.68  |220000       |112.64   |
|3620             |2000        |1.024 |20000        |10       |
|^^               |^^          | ^^   |40000        |20       |
|2901 G2          |            |      |327000       |167.42   |
|2911 G2          |            |      |353000       |180.73   |
|2921 G2          |            |      |480000       |245.76   |
|2951 G2          |            |      |580000       |296.96   |
|3640             |4000        |2.048 |50000        |25.6     |
| ^^              | ^^         | ^^   |70000        |36       |
|3640A            |4000        |2.048 |50000        |25.6     |
| ^^              | ^^         | ^^   |70000        |36       |
|3631             |4,000       |2.048 |50000        |25.6     |
| ^^              | ^^         | ^^   |70000        |36       |
|3660             |12000       |6.144 |100000       |51.2     |
| ^^              | ^^         | ^^   |120000       |61.4     |
|3725             |            |      |100000       |51.2     |
| ^^              |            |      |120000       |61.4     |
|3745             |            |      |225000       |115.2    |
| ^^              |            |      |250000       |128      |
|MC3810           |2000        |1.024 |8000         |4.10     |
|MC3810V3         |3000        |1.536 |15000        |7.68     |
|3825             |25000       |12.8  |350000       |179.20   |
|3845             |35000       |17.92 |500000       |256.00   |
|3925 G2          |            |      |833000       |426.49   |
|3945 G2          |            |      |982000       |502.78   |
|IAD2400          |3000        |1.536 |15000        |7.68     |
|4000             |1800        |0.9216|14000        |7.17     |
|4500             |3500        |1.792 |45000        |23.04    |
|4700             |4600        |2.3552|75000        |38.40    |
|7120             |13000       |6.656 |175000       |89.60    |
|7140             |20000       |10.24 |300000       |153.60   |
|7200 NPE100      |7000        |3.584 |100000       |51.20    |
|7200 NPE150      |10000       |5.12  |150000       |76.80    |
|7200 NPE175      |9000        |4.608 |177848       |91.06    |
|7200 NPE200      |13000       |6.656 |200000       |102.40   |
|7200 NPE225      |13000       |6.656 |233170       |119.38   |
|7200 NPE300      |20000       |10.24 |353000       |180.74   |
|7200 NPE400      |20000       |10.24 |420000       |215.04   |
|7200 NPE-G1      |79000       |40.448|1018000      |521.22   |
|7200 NPE-G2      |            |      |2000000      |1024.00  |
|7200 NSE-1       |20000       |10.24 |300000 RP    |153.6    |
|7304 NSE-100     |            |      |3500000 PXF  |1792     |
| ^^              | ^^         | ^^   |450000 RP    |230.4    |
|7304 NSE-150     |            |      |3500000 PXF  |1792     |
| ^^              | ^^         | ^^   |800000 RP    |409.6    |
|7304 NPE-G100    |            |      |1099000      |562.69   |
|7301             |79000                        |40.448                                                   |1018000              |521.22 |
|7401             |20000                        |10.24                                                    |300000 (Also has PXF)|153.6  |
|7000 RP          |2500                         |1.28                                                     |30000                |15.36  |
|7500 RSP2        |5000                         |2.56                                                     |220000               |112.64 |
|7500 RSP4/4+     |8000                         |4.096                                                    |345000               |176.64 |
|7500 RSP8        |22000                        |11.264                                                   |470000               |240.64 |
|7500 RSP16       |29000                        |14.848                                                   |530000               |271.36 |
|7500 VIP2-40     |Punts to RSP                ||60000 |30.7  |
| ^^              |Punts to RSP                ||95000 |48.6  |
|7500 VIP2-50     |Punts to RSP                ||90000 |46.1  |
| ^^              |Punts to RSP                ||140000|71.7  |
|7500 VIP4-50     |Punts to RSP                ||90000 |46.1  |
| ^^              |Punts to RSP                ||140000|71.7  |
|7500 VIP4-80     |Punts to RSP                ||140000|71.7  |
| ^^              |Punts to RSP                ||210000|107.5 |
|7500 VIP6-80     |Punts to RSP                ||140000|71.7  |
| ^^              |Punts to RSP                ||219000|112.1 |
|7600 MSFC2(Sup2) |20000                        |10.24 |30000000 non-DFC traffic for central              |15360.00 |
| ^^              |500000 software-switched CEF |256.00|15000000 non-DFC traffic with classic line cards  |7680.00  |
|7600 MSFC2A Sup32|                             |      |15000000                                          |7680.00  |
|7600 MSFC3 Sup720|20000                        |10.24 |30000000 non-DFC traffic for central              |15360.00 |
| ^^              |500000 software-switched CEF |256.00|15000000 non-DFC traffic with classic line cards  |7680.00  |
|7600 CEF256      |                             |      |15000000 per slot                                 |7680.00  |
|7600 dCEF256 6816|                             |      |24000000 per slot                                 |12288.00 |
|7600 dCEF720 6724|                             |      |24000000 per slot                                 |12288.00 |
|7600 dCEF720 67xx|                             |      |48000000 per slot                                 |24576.00 |
|ASR1002 F-ESP2.5 |                             |      |4420000                                           |2263.04  |
|ASR1000 ESP5     |                             |      |8840000                                           |4526.08  |
|ASR1000 ESP10    |                             |      |17690000                                          |905728   |
|ASR1000 ESP20    |                             |      |25430000                                          |13020.16 |
|10000 PRE1       |                             |      |2800000 (Also has 2xPXF)                          |1433.60  |
|10000 PRE2       |                             |      |6200000 (Also has a 4xPXF)                        |3174.40  |
|10000 PRE3       |                             |      |9500000 (Also has a 4xPXF)                        |4864.00  |
|10000 PRE4       |                             |      |10000000 (Also has a 4xPXF)                       |5120.00  |
|10720            |50000                        |25.6  |2000000 (Also has a 2xPXF)                        |1024.00  |
|12000 Engine 0   |                             |      |400000                                            |622.00   |
|12000 Engine 1   |                             |      |700000                                            |2500.00  |
|12000 Engine 2   |                             |      |4000000                                           |2500.00  |
|12000 Engine 3   |                             |      |400000                                            |2500.00  |
|12000 Engine 4   |                             |      |25000000                                          |10000.00 |
|12000 Engine 4+  |                             |      |25000000                                          |10000.00 |
|12000 Engine 5   |                             |      |16000000                                          |10000.00 |
|12000 Engine 6   |                             |      |50000000                                          |20000.00 |
|CRS-1 LC         |                             |      |80000000                                          |40960.00 |

``Punts to RSP`` means that when a VIP cannot process the packets in a distributed manner
(for instance, when doing MLPPP across different PA's instead of keeping the bundles on the same PA),
it must push that forwarding decision and packet flow to the RSP.
In these cases, use the RSP switching numbers.

The 7600 only slows centralized forwarding when a classic line card is installed, and then only for flows that must be centrally forwarded.
For instance, a system with a Sup720 with two 6748 DFC3A equipped cards has a legacy gigabit switching module installed - the 6148-GE-TX, for instance.
Flows going to or originating from that card operate at 15Mpps, but flows going between the 6748's operate at full 48Mpps per slot.
Therefore, distributed forwarding is unaffected by the insertion of a legacy card. 