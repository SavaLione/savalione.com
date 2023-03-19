---
layout: docs
type: docs
title:  "Network test tools: Throughput tools"
date:   2022-08-16
last_modified_at: 2022-08-16 21:14:00
description: "Network test tools: Throughput tools"
categories:
  - Network
  - testing_tools
tags:
  - Ethernet
  - Testing
  - Performance
permalink: /docs/network/testing_tools/throughput
---

There are a number of open-source command line tolls available
for Unix that measure memory-to-memory network throughput.
Some of the more popular tools include:
* [iperf2](https://sourceforge.net/projects/iperf2/)
* [iperf3](https://github.com/esnet/iperf)
* [nuttcp](https://www.nuttcp.net)

Each of these tools has slightly different features, and slightly different architectures,
so you should not expect any one tool to have everything you need.
It is best to be familiar with multiple tools, and use the right tool
for your particular use case.

One key difference is whether or not the tool is *single-threaded* or *multi-threaded*.
If you want to test parallel stream performance, you should use a multi-threaded tool
such as iperf2.

|:Tool feature comparison:||||
|:Feature:|iperf 2.0.13+|iperf 3.7+|nuttcp 8.x|
|:---|:---:|:---:|:---:|
|multi-threading                    |-P         |               |       |
|JSON output                        |           |--json         |       |
|CSV output                         |-y         |               |       |
|FQ-based pacing                    |--fq-rate  |--fq-rate      |       |
|multicast support                  |--ttl      |               | -m    |
|bi-directional testing             |--dualtest |--bidir        |       |
|retransmit and CWND report         | -e        |on by default  |-br    |
| ^^                                | ^^        | ^^            |-bc    |
|skip TCP slow start                |           |--omit         |       |
|set TCP congestion control alg.    |-Z         |--congestion   |       |
|zero-copy (sendfile)               |           |--zerocopy     |       |
|UDP burst mode                     |           |               |-Ri#/# |
|Select CPU core                    |           |-A             |-xc#/# |
|MS Windows support                 |yes        |no             |no     |

Based on ``fasterdata.es.net`` experience, ``fasterdata.es.net`` recommend the following:
* Use **iperf2** for parallel streams, bidirectional, or MS Windows-based tests
* Use **nuttcp** for high-speed UDP testing
* Use **iperf3** otherwise. In particular if you want detalied JSON output

For all 3 tools we recommend running the latest version, as all tools have been getting important updates every few months. In particular, there are known UDP issues with iperf 2.0.5 and iperf 3.1.4 or earlier, and these versions should be avoided for UDP testing

