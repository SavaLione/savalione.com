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

|:Built-in Vector Data Types:|||
|OpenCL Type            |API Type   |Description                    |
|:----------------------|:----------|:------------------------------|
|char***n***                  |cl_charn   |8-bit signed                   |
|ucharn                 |cl_ucharn  |8-bit unsigned                 |
|shortn                 |cl_shortn  |16-bit signed                  |
|ushortn                |cl_ushortn |16-bit unsigned                |
|intn                   |cl_intn    |32-bit signed                  |
|uintn                  |cl_uintn   |32-bit unsigned                |
|longn                  |cl_longn   |64-bit signed                  |
|ulongn                 |cl_ulongn  |64-bit unsigned                |
|floatn                 |cl_floatn  |32-bit float                   |
|doublen (OPTIONAL)     |cl_doublen |64-bit float                   |

#### Other Built-in Data Types
The optional types listed here other than ``event_t`` are only defined if ``CL_DEVICE_IMAGE_SUPPORT`` is ``CL_TRUE``.

|:Other Built-in Data Types:||
|OpenCL Type                  |Description                    |
|:----------------------------|:------------------------------|
|image2d_t (OPTIONAL)         |2D image handle                |
|image3d_t (OPTIONAL)         |3D image handle                |
|image2d_array_t (OPTIONAL)   |2D image array                 |
|image1d_t (OPTIONAL)         |1D image handle                |
|image1d_buffer_t (OPTIONAL)  |1D image buffer                |
|image1d_array_t (OPTIONAL)   |1D image array                 |
|sampler_t (OPTIONAL)         |sampler handle                 |
|event_t                      |event handle                   |

#### Reserved Data Types

|:Reserved Data Types:||
|OpenCL Type                  |Description                    |
|:----------------------------|:------------------------------|
|booln |boolean vector|
|halfn |16-bit, vector|
|quad, quadn |128-bit float, vector|
|complex half, complex halfn imaginary half, imaginary halfn| 16-bit complex, vector|
|complex float, complex floatn imaginary float, imaginary floatn| 32-bit complex, vector|
|complex double, complex doublen imaginary double, imaginary doublen| 64-bit complex, vector|
|complex quad, complex quadn imaginary quad, imaginary quadn |128-bit complex, vector|
|floatnxm |n*m matrix of 32-bit floats|
|doublenxm |n*m matrix of 64-bit floats|
