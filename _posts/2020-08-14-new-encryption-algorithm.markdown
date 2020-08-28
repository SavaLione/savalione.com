---
layout: post
title:  "Transition to a new encryption algorithm"
date:   2020-08-14
categories: [web]
tags: [site, server]
---

## TLS
Added support for TLS 1.3

Support for TLS 1.0 and TLS 1.1 has been disabled

## DNS
Added CAA record

## Useful resources
### [ssltest](https://www.ssllabs.com/ssltest/)
Very handy tool for analyzing the connection to the site
### [moz://a SSL Configuration Generator](https://ssl-config.mozilla.org/)
Convenient tool for creating configuration for various web servers
### [Let’s Encrypt](https://letsencrypt.org/)
Let’s Encrypt is a free, automated and open source Certificate Authority.
### [certbot](https://certbot.eff.org/)
Program for automatically obtaining a certificate

## Technical information

|Protocols||
|---    |---|
|TLS 1.3|Yes|
|TLS 1.2|Yes|
|TLS 1.1|No |
|TLS 1.0|No |
|SSL 3  |No |
|SSL 2  |No |

### TLS 1.3 (suites in server-preferred order)
* TLS_AES_256_GCM_SHA384 (0x1302)
* TLS_CHACHA20_POLY1305_SHA256 (0x1303)
* TLS_AES_128_GCM_SHA256 (0x1301)

### TLS 1.2 (suites in server-preferred order)
* TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 (0xcca8)
* TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (0xc02f)
* TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030)
* TLS_DHE_RSA_WITH_AES_128_GCM_SHA256 (0x9e)
* TLS_DHE_RSA_WITH_AES_256_GCM_SHA384 (0x9f)
#### TLS 1.2 (weak)
* TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 (0xc027)
* TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 (0xc028)
* TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA (0xc013)
* TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA (0xc014)
* TLS_DHE_RSA_WITH_AES_128_CBC_SHA256 (0x67)
* TLS_DHE_RSA_WITH_AES_128_CBC_SHA (0x33)
* TLS_DHE_RSA_WITH_AES_256_CBC_SHA256 (0x6b)
* TLS_DHE_RSA_WITH_AES_256_CBC_SHA (0x39)
* TLS_RSA_WITH_AES_128_GCM_SHA256 (0x9c)
* TLS_RSA_WITH_AES_256_GCM_SHA384 (0x9d)
* TLS_RSA_WITH_AES_128_CBC_SHA256 (0x3c)
* TLS_RSA_WITH_AES_256_CBC_SHA256 (0x3d)
* TLS_RSA_WITH_AES_128_CBC_SHA (0x2f)
* TLS_RSA_WITH_AES_256_CBC_SHA (0x35)