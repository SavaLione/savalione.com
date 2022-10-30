---
layout: docs
type: docs
title:  "OpenCL 1.2 Reference scheatsheet"
date:   2022-10-30
last_modified_at: 2022-10-30 08:19:00
description: "OpenCL 1.2 Reference scheatsheet"
categories:
  - cpp
  - code
tags:
  - cpp
  - code
  - cheatsheet
  - Specs
  - Datasheet
---

## OpenCL 1.2
### Supported Data Types
The optional double scalar and vector types are supported if ``CL_DEVICE_DOUBLE_FP_CONFIG`` is not zero.

|:Built-in Scalar Data Types:|||
|OpenCL Type            |API Type   |Description                    |
|:----------------------|:----------|:------------------------------|
|bool                   |--         |true (1) or false (0)          |
|char                   |cl_char    |8-bit signed                   |
|unsigned char, uchar   |cl_uchar   |8-bit unsigned                 |
|short                  |cl_short   |16-bit signed                  |
|unsigned short, ushort |cl_ushort  |16-bit unsigned                |
|int                    |cl_int     |32-bit signed                  |
|unsigned int, uint     |cl_uint    |32-bit unsigned                |
|long                   |cl_long    |64-bit signed                  |
|unsigned long, ulong   |cl_ulong   |64-bit unsigned                |
|float                  |cl_float   |32-bit float                   |
|double (OPTIONAL)      |cl_double  |64-bit. IEEE 754               |
|half                   |cl_half    |16-bit float (storage only)    |
|size_t                 |--         |32- or 64-bit unsigned integer |
|ptrdiff_t              |--         |32- or 64-bit signed integer   |
|intptr_t               |--         |32- or 64-bit signed integer   |
|uintptr_t              |--         |32- or 64-bit unsigned integer |
|void                   |void       |void                           |
