---
layout: docs
title:  "Cisco Catalyst 8510 Multiservice Switch Router"
date:   1998-06-15
last_modified_at: 2022-08-05 11:44:00
categories: [Cisco]
tags:
  - Cisco
  - Routing
  - Switching
  - ATM
  - Specs
  - Datasheet
---

The Cisco Catalyst 8500 is a Layer 3-enhanced ATM switch that **seamlessly integrates** wire-speed **Layer 3 switching and ATM switching**,
eliminating the need to make a technology choice.
The Catalyst 8500 family delivers campus and metropolitan network solutions with scalable performance,
lower cost of ownership, and intranet-based application features to deliver increased business productivity.

Unlike old first- or second-generation ATM switches that force customers to have a costly,
inefficient, multi-system solution, the Catalyst 8500 switch provides an
**integrated ATM and Gigabit Ethernet** solution in a **single chassis**.

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

1. If you are attaching a short cable to the 622-Mbps long-reach port adapter, you must add 10 dB of attenuation to the cable or the transmitter might overdrive the receiver and introduce data errors.

|:Pinouts to RJ-45 Connectors:|||
|Pin|Signal|Description|
|:---|:---|:---|
|1| RxD+ |Receive data +|
|2| RxD– |Receive data –|
|3| NC |No connection|
|4| NC |No connection|
|5| NC |No connection|
|6| NC |No connection|
|7| TxD+ |Transmit data +|
|8| TxD– |Transmit data –|

The T1, E1, CES T1, and CES E1 port adapters support RJ-48c connectors.
The following table lists the signals for RJ-48c connectors:

|:Pinouts to RJ-48c Connectors:||
|Pin|Description|
|:---|:---|
|1| Receive ring|
|2| Receive tip|
|3| No connection|
|4| Transmit ring|
|5| Transmit tip|
|6| No connection|
|7| No connection|
|8| No connection|

The 25-Mbps port adapter supports a 96-pin Molex to 4 unshielded RJ-45 connectors.
The following table lists the signals for the 96-pin Molex connector:

|:96-Pin Molex to 12 Unshielded RJ-45 Connectors:|||||
|Signal|Molex Pin No.|RJ-45 Port No.|RJ-45 Pin No.|Description|
|:----|:---|:---|:---|:---------------|
|RXA3 |1   |3   |1   |Receive data +  |
|RXB3 |2   |3   |2   |Receive data –  |
|GND  |3   |NC  |NC  |No connection   |
|GND  |4   |NC  |NC  |No connection   |
|TXA3 |5   |3   |7   |Transmit data + |
|TXB3 |6   |3   |8   |Transmit data – |
|GND  |7   |NC  |NC  |No connection	  |
|GND  |8   |NC  |NC  |No connection	  |
|RXA7 |9   |7   |1   |Receive data +  |
|RXB7 |10  |7   |2   |Receive data –  |
|GND  |11  |NC  |NC  |No connection	  |
|GND  |12  |NC  |NC  |No connection	  |
|TXA7 |13  |7   |7   |Transmit data + |
|TXB7 |14  |7   |8   |Transmit data – |
|GND  |15  |NC  |NC  |No connection	  |
|GND  |16  |NC  |NC  |No connection	  |
|RXA11|17  |11  |1   |Receive data +  |
|RXB11|18  |11  |2   |Receive data –  |
|GND  |19  |NC  |NC  |No connection	  |
|GND  |20  |NC  |NC  |No connection	  |
|TXA11|21  |11  |7   |Transmit data + |
|TXB11|22  |11  |8   |Transmit data – |
|GND  |23  |NC  |NC  |No connection	  |
|GND  |24  |NC  |NC  |No connection	  |
|RXA10|25  |10  |1   |Receive data +  |
|RXB10|26  |10  |2   |Receive data –  |
|GND  |27  |NC  |NC  |No connection	  |
|GND  |28  |NC  |NC  |No connection	  |
|TXA10|29  |10  |7   |Transmit data + |
|TXB10|30  |10  |8   |Transmit data – |
|GND  |31  |NC  |NC  |No connection	  |
|GND  |32  |NC  |NC  |No connection	  |
|RXA6 |33  |6   |1   |Receive data +  |
|RXB6 |34  |6   |2   |Receive data –  |
|GND  |35  |NC  |NC  |No connection	  |
|GND  |36  |NC  |NC  |No connection	  |
|TXA6 |37  |6   |7   |Transmit data + |
|TXB6 |38  |6   |8   |Transmit data – |
|GND  |39  |NC  |NC  |No connection	  |
|GND  |40  |NC  |NC  |No connection	  |
|TXB2 |41  |2   |8   |Transmit data – |
|TXA2 |42  |2   |7   |Transmit data + |
|GND  |43  |NC  |NC  |No connection	  |
|GND  |44  |NC  |NC  |No connection	  |
|RXB2 |45  |2   |2   |Receive data –  |
|RXA2 |46  |2   |1   |Receive data +  |
|GND  |47  |NC  |NC  |No connection	  |
|RXA6 |48  |NC  |NC  |No connection	  |
|RXA1 |49  |1   |1   |Receive data +  |
|RXB1 |50  |1   |2   |Receive data –  |
|GND  |51  |NC  |NC  |No connection	  |
|GND  |52  |NC  |NC  |No connection	  |
|TXA1 |53  |1   |7   |Transmit data + |
|TXB1 |54  |1   |8   |Transmit data – |
|GND  |55  |NC  |NC  |No connection	  |
|GND  |56  |NC  |NC  |No connection	  |
|RXA4 |57  |4   |1   |Receive data +  |
|RXB4 |58  |4   |2   |Receive data –  |
|GND  |59  |NC  |NC  |No connection	  |
|GND  |60  |NC  |NC  |No connection	  |
|TXA4 |61  |4   |7   |Transmit data + |
|TXB4 |62  |4   |8   |Transmit data – |
|TXB4 |62  |4   |8   |Transmit data – |
|GND  |63  |NC  |NC  |No connection   |
|GND  |64  |NC  |NC  |No connection   |
|RXA9 |65  |9   |1   |Receive data +  |
|RXB9 |66  |9   |2   |Receive data –  |
|GND  |67  |NC  |NC  |No connection   |
|GND  |68  |NC  |NC  |No connection   |
|TXA9 |69  |9   |7   |Transmit data + |
|TXB9 |70  |9   |8   |Transmit data – |
|GND  |71  |NC  |NC  |No connection   |
|GND  |72  |NC  |NC  |No connection   |
|RXA8 |73  |8   |1   |Receive data +  |
|RXB8 |74  |8   |2   |Receive data –  |
|GND  |75  |NC  |NC  |No connection   |
|GND  |76  |NC  |NC  |No connection   |
|TXA8 |77  |8   |7   |Transmit data + |
|TXB8 |78  |8   |8   |Transmit data – |
|GND  |79  |NC  |NC  |No connection   |
|GND  |80  |NC  |NC  |No connection   |
|TXB5 |81  |5   |8   |Transmit data – |
|TXA5 |82  |5   |7   |Transmit data + |
|GND  |83  |NC  |NC  |No connection   |
|GND  |84  |NC  |NC  |No connection   |
|RXB5 |85  |5   |2   |Receive data –  |
|RXA5 |86  |5   |1   |Receive data +  |
|GND  |87  |NC  |NC  |No connection   |
|GND  |88  |NC  |NC  |No connection   |
|TXB0 |89  |0   |8   |Transmit data – |
|TXA0 |90  |0   |7   |Transmit data + |
|GND  |91  |NC  |NC  |No connection   |
|GND  |92  |NC  |NC  |No connection   |
|RXB0 |93  |0   |2   |Receive data –  |
|RXA0 |94  |0   |1   |Receive data +  |
|GND  |95  |NC  |NC  |No connection   |
|GND  |96  |NC  |NC  |No connection   |

The Ethernet ports on the 100BASE-FX interface module are MT-RJ receptacles.
The following table lists the signals for the MT-RJ Ethernet cable connector:

|:MT-RJ Ethernet Cable Connectors:||||
|Pin| Signal| Direction| Description|
|:---|:---|:---:|:---|
|1 |VeeRX |--- |Receiver signal ground|
|2 |VccRX |<---|Receive power supply|
|3 |SD    |--- |Signal Detect|
|4 |RD-   |<---|Receiver data|
|5 |RD+   |<---|Receiver data+|
|6 |VccTX |--->|Transmit power supply|
|7 |VeeTX |--->|Transmit signal ground|
|8 |Tdis  |--- |Transmit disable|
|9 |TD+   |--->|Transmit data+|
|10|TD-   |--->|Transmit data|

|:Catalyst 8510 and LightSteam 1010 Specifications:|||
|Description|Specifications||
|:---|:---|:---|
|Switch and processor capacity||10-Gbps shared memory, nonblocking switch fabric up to 32-KB frames|
|Dimensions (H x W x D)||Chassis: 10.4 x 17.25 x 18.4 in (26.4 x 43.8 x 46.7 cm)|
| ^^                   ||Processor, switch processor, carrier module, and interface module: 1.2 x 14.4 x 16 in (3.0 x 36.6 x 40.6 cm)|
| ^^                   ||Port adapter: 1.2 x 6.5 x 10 in (3.0 x 16.5 x 25.4 cm)|
| ^^                   ||Power supply: 2.7 x 6.0 x 15.3 in (6.9 x 15.2 x 38.9 cm)|
|Weight                ||Empty chassis: 32 lb (14.51 kg)|
| ^^                   ||Fully populated chassis: approximately 130 lb (58.97 kg)|
| ^^                   ||AC power supply: 11 lb (4.99 kg)|
| ^^                   ||DC power supply: 10 lb (4.54 kg)|
|Airflow ||95 cfm through the system fan assembly|
|Operating temperature ||32 to 122 F (0 to 50 C)|
|Nonoperating temperature|| -40 to 167 F (-40 to 75 C)|
|Humidity||10 to 90%, noncondensing|
|Altitude||-500 to 6,500 ft (-152 to 2000 m)|
|Microprocessor||100-Mhz MIPS R4700|
|AC total output||388W maximum|
|AC-input voltage||100-127/200-240 VAC wide input with power factor correction|
|AC frequency Auto||sensing limits: 100 to 127/200 to 240 VAC, 8/4A, 50/60 Hz|
|AC current rating||8/4A with the chassis fully populated|
|Power supply load||376W maximum configuration, 200W typical with max configuration|
|DC voltages supplied and steady-state maximum current rating|System:|+5V @ 70A|
| ^^                                                         | ^^    |+12V @ 2A|
| ^^                                                         | ^^    |+24V @ 0.12A|
| ^^                                                         |Processor:|+5V @ 15A|
| ^^                                                         | ^^    |+24V @ 25mA|
| ^^                                                         | ^^    |+12V @ 500mA|
|Memory                                                     ||8-MB Flash memory SIMM (upgradable to 16 MB)|
| ^^                                                        ||64-MB DRAM|
| ^^                                                        ||256-KB boot EPROM|
| ^^                                                        ||128-KB SRAM|
| ^^                                                        ||No Flash PC card installed by default (accepts 8-, 16-, or 20-MB Intel Series 2+ Flash PC cards)|
