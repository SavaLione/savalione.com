---
layout: docs
type: docs
title:  "Cables specifications"
date:   2022-08-08
last_modified_at: 2022-08-08 00:36:00
description: "Network layer one cables specifications"
categories: [Physical]
tags:
  - Ethernet
  - T1
  - E1
  - ATM
  - Specs
  - Datasheet
permalink: /docs/physical/cables_specifications
---


## Distances
I took distances from the Cisco Catalyst 8510 MSR router documentation.

|:Maximum Transmission Distances:||||
|Transceiver Speed|Cable Type|Max. Distance Between Stations||
| ^^              | ^^       |Meter|Feet|
|:---|:---|:---|:---|
|10/100-Mbps Ethernet   |Category 5 UTP                 |100 m|328 feet|
|100-Mbps Ethernet      |Multimode fiber                |500 m|1640 feet|
|1000-Mbps Ethernet     |Multimode fiber                |500 m|1640 feet|
|1000-Mbps Ethernet     |Single-mode fiber              |5 km |16404 feet|
|25-Mbps ATM            |Category 5 UTP                 |100 m|328 feet|
|155-Mbps ATM           |Single-mode fiber, long reach  |40 km|25 miles|
|155-Mbps ATM           |Multimode fiber                |2 km |1.2 miles|
|622-Mbps ATM           |Single-mode fiber              |15 km|9 miles|
|622-Mbps ATM           |Single-mode fiber, long reach  |40 km (1)|25 miles|
|622-Mbps ATM           |Multimode fiber                |500 m|1640 feet|
|T1, 1.544-Mbps ATM     |Category 5 twisted-pair                    |198 m|650 feet|
|E1, 2.048-Mbps ATM     |Category 5 twisted-pair and FTP (120 ohm)  |198 m|650 feet|
|E1, 2.048-Mbps ATM     |Coaxial cable (75 ohm)                     |198 m|650 feet|
|CDS3, 45-Mbps          |Coaxial cable                              |137 m|450 feet|
|CE1, 2.048-Mbps        |ATM Category 5 twisted-pair                |198 m|650 feet|
|CES T1                 |Category 5 twisted-pair and FTP            |198 m|650 feet|
|CES E1                 |Category 5 twisted-pair and FTP (120 ohm)  |250 m|820 feet|
|CES E1                 |Coaxial cable (75 ohm)         |198 m|650 feet|
|DS3, 45-Mbps           |Coaxial cable                  |137 m|450 feet|
|E3, 34-Mbps            |Coaxial cable                  |396 m|1299 feet|

1. If you are attaching a short cable to the 622-Mbps long-reach port adapter, you must add 10 dB of attenuation to the cable or the transmitter might overdrive the receiver and introduce data errors. (for Cisco Catalyst 8510 msr)