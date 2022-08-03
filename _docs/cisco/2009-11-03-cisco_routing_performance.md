---
layout: docs
title:  "Cisco routing performance"
date:   2009-11-03
last_modified_at: 2022-08-03 16:45:00
categories: [Cisco]
tags:
  - Cisco
  - Routing
  - Performance
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

All numbers are for IP packets only - no IPX/AT/DEC, etc. - Mbps calculated by pps * 64bytes * 8bits/byte;
**except for 12000 (Engines 0, 1, 2, 3 & 5) where these numbers represent the maximum mbps forwarding rates when packets are
greater than 64 bytes. Please see inserted comments in this field.**
