---
layout: about
title: About Me
date: 2019-11-10
description: "Learn more about Savelii Pototskii, a software developer focused on Go, C++, backend systems, performance, and open source. Discover his background, education and skills"
permalink: /about/
seo:
  type: ProfilePage
---
Hi!
I'm Savelii Pototskii.
Welcome to my personal blog!

I am a software engineer specializing in backend systems, performance optimization, network applications, and open-source software.
I care deeply about the open-source ecosystem because I believe it is the future of technology.

This blog is where I share my thoughts, insights, and practical knowledge on topics like Go, C++, Linux, FPGAs, and the broader open-source world.
My aim is to create content that is open, informative, and helpful.

All original content on this blog is published under the Creative Commons Attribution 4.0 International (CC BY 4.0) license, unless otherwise noted.

My focus: Go, C++, Linux and Open Source.

### Education
* PhD in System Analysis, Management and Information Processing, Statistics (2023 - Present)
  * Ural Federal University
* Master's Degree in Information Systems and Technologies (2021 - 2023)
  * Ural Federal University
* Bachelor's Degree in Software Engineering (2017 - 2021)
  * Ural Federal University

### Latest Projects
Here are a few of the projects I've been working on recently.
Feel free to check out the repositories and contribute!

|Name|Description|Stack|
|:---|:---|:---|
{% for project in site.data.projects %}|[{{ project.name }}]({{ project.url }})|{{ project.description }}|{{ project.stack }}|
{% endfor %}

### Work Experience
* Software Developer - IMM UB RAS (Part-time)
    * Feb 2024 - June 2026
    * Focus: Embedded Linux, network stack software development.
* Master of Science Researcher - Ural Federal University (Part-time)
    * Mar 2023 - Feb 2026
    * Focus: Web application architecture, student supervision, and teaching.
* Lead Software Engineer - Drev-Master LLC
    * July 2022 - Present
    * Focus: Server software design, network architecture, and C++/Go optimization.
* Software Engineer - Drev-Master LLC
    * Mar 2018 - July 2022
    * Focus: Server software development, system administration, and database module development.

### Software Development Skills
* Languages: Go, C++
* Compilers & Tools: GCC, Clang, MinGW, Git, CMake, Bash, GTest, Doxygen
* Libraries: STL, Boost, Protobuf, spdlog, SDL2, ImGui, libcurl, SQLite
* DevOps: Incus, Nginx, Docker, LXC, KVM, Jenkins, Zabbix, PostgreSQL, MariaDB
* Hardware: KiCad, STM32, ESP32, FPGA (Gowin), RISC-V, ARM
* HPC: OpenCL, OpenMP, Khronos SYCL
* OS and Distributions: Ubuntu LTS, Debian, FreeBSD, NetBSD, pfSense

### Language Skills
* English: C1 - Cambridge English C1 Advanced (2025)
* Russian: Native

### Talks & Publications
I frequently present on topics ranging from robotics and network routers to FPGA architecture.
{% for talk in site.data.talks %}* {{ talk.name }} ({{ talk.place }}) - {{ talk.date }}.
{% endfor %}

Publications:
{% for publication in site.data.publications %}* {{ publication.name }} ({{ publication.date }})
{% endfor %}

### Teaching
1. Ural Federal University (March 2023 - May 2023)
    * Mentored student teams in the development of scalable web applications
2. Ural Federal University (Sept. 2023 - Dec. 2023)
    * Directed student projects centered on creating web applications for online educational platforms
    * Guided students through game development projects, offering expertise in code structure, game design, library selection, and development approaches
3. Ural Federal University (Feb. 2024 - May 2024)
    * Instructed foundational Java programming, emphasizing its practical use in web development
    * Supported student game development, providing specialized assistance with game mechanics and the effective application of programming libraries
    * Oversaw the creation and integration of web educational platforms by student teams within the university's infrastructure

### Other Interests
* 3D Printing: Experience with various printers for university and personal projects
* Sport: Running and cycling
* Photography: I use a Nikon D7000 to document my projects
