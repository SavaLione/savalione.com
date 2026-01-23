---
layout: page
title: Server information
date: 2026-01-21
description: "Information about the server currently hosting this blog"
permalink: /server/
sitemap: false
---

You have reached the `{{ site.data.server.hostname }}` node via Geo-DNS.
This page was generated automatically during the last deployment on this specific server.

{% assign server_found = false %}

{% for server in site.data.servers %}
{% if server.id == site.data.server.hostname %}
{% assign server_found = true %}

```
Location and Network
    Node ID: {{ server.id }}
    Location: {{ server.location }}
    Provider: {{ server.provider }}
    Network:
{% for ip in server.network %}        {{ ip }}
{% endfor %}
Hardware
    CPU: {{ site.data.server.cpu }}
    RAM: {{ site.data.server.ram }} MB
    Architecture: {{ site.data.server.virt | upcase }}

System Environment
    Hostname: {{ site.data.server.hostname }}
    Kernel: {{ site.data.server.kernel }}
    Distribution: {{ site.data.server.distro }}

Build Toolchain
    Jekyll: {{ site.data.server.tools.jekyll }}
    Ruby: {{ site.data.server.tools.ruby }}
    Go: {{ site.data.server.tools.go }}
    GCC: {{ site.data.server.tools.gcc }}
    Git: {{ site.data.server.tools.git }}
    Nginx: {{ site.data.server.tools.nginx }}
```
{% endif %}
{% endfor %}

{% unless server_found %}
You have reached an unknown server.
This may be due to a local development environment or an improperly configured node.

If you are seeing this on the live website, please contact me via email so I can fix the configuration:
* `{{ site.email}}`

Thank you in advance!
{% endunless %}

```
git commit
    branch: {{ site.data.git.branch }}
    short: {{ site.data.git.hash }}
    full: {{ site.data.git.full_hash }}
```
