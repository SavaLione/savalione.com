---
layout: docs
type: docs
title:  "OpenCL 1.2 Reference scheatsheet"
date:   2022-10-30
last_modified_at: 2022-11-01 21:21:00
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
permalink: /docs/cpp/code/opencl_1_2_reference_cheatsheet
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
|charn                  |cl_charn   |8-bit signed                   |
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

### Vector Component Addressing
#### Vector Components

|           |0    |1    |2    |3    |4    |5    |6    |7    |8    |9    |10   |11   |12   |13   |14   |15   |
|float2 v;  |v.x  |v.y  |     |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ^^        |v.s0 |v.s1 | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  |
|float3 v;  |v.x  |v.y  |v.z  |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ^^        |v.s0 |v.s1 |v.s2 | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  |
|float4 v;  |v.x  |v.y  |v.z  |v.w  |     |     |     |     |     |     |     |     |     |     |     |     |
| ^^        |v.s0 |v.s1 |v.s2 |v.s3 | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  |
|float8 v;  |v.s0 |v.s1 |v.s2 |v.s3 |v.s4 |v.s5 |v.s6 |v.s7 |     |     |     |     |     |     |     |     |
|float16 v; |v.s0 |v.s1 |v.s2 |v.s3 |v.s4 |v.s5 |v.s6 |v.s7 |v.s8 |v.s9 |v.sa |v.sb |v.sc |v.sd |v.se |v.sf |
| ^^        | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  | ^^  |v.sA |v.sB |v.sC |v.sD |v.sE |v.sF |

#### Vector Addressing Equivalences
Numeric indices are preceded by the letter s or S, e.g.: ``s1``.
Swizzling, duplication, and nesting are allowed, e.g.: ``v.yx``, ``v.xx``, ``v.lo.x``

|                   |v.lo |v.hi |v.odd|v.even |
|float2             |v.x  |v.y  |v.y  |v.x    |
| ^^                |v.s0 |v.s1 |v.s1 |v.s0   |
|float3<sup>1</sup> |v.xy |v.zw |v.yw |v.xz   |
| ^^                |v.s01|v.s23|v.s13|v.s02  |
|float4             |v.xy |v.zw |v.yw |v.xz   |
| ^^                |v.s01|v.s23|v.s13|v.s02  |
|float8             |v.s0123|v.s4567|v.s1357|v.s0246|
|float16            |v.s01234567|v.s89abcdef|v.s13579bdf|v.s02468ace|

1. When using ``.lo`` or ``.hi`` with a 3-component vector, the ``.w`` component is undefined.

### Operators and Qualifiers
#### Operators
These operators behave similarly as in C99 except that
operands may include vector types when possible:
```
+ - * % / -- ++ == != &
~ ^ > < >= <= | ! && ||
?: >> << = , op= sizeof
```

#### Address Space Qualifiers
* ``__global, global``
* ``__constant, constant``
* ``__local, local``
* ``__private, private``

#### Function Qualifiers
* ``__kernel, kernel``
* ``__attribute__((vec_type_hint(type))) //type defaults to int``
* ``__attribute__((work_group_size_hint(X, Y, Z)))``
* ``__attribute__((reqd_work_group_size(X, Y, Z)))``

### Specify Type Attributes
Use to specify special attributes of enum, struct and union types
* ``__attribute__((aligned(n)))``
* ``__attribute__((aligned))``
* ``__attribute__((packed))``
* ``__attribute__((endian(host)))``
* ``__attribute__((endian(device)))``
* ``__attribute__((endian))``

### Math Constants
The values of the following symbolic
constants are type float, accurate within
the precision of a single precision
floating-point number. 

|MAXFLOAT   |Value of maximum noninfinite single-precision floating-point number. |
|HUGE_VALF  |Positive float expression, evaluates to +infinity.                   |
|HUGE_VAL   |Positive double expression, evals. to +infinity. OPTIONAL            |
|INFINITY   |Constant float expression, positive or unsigned infinity.            |
|NAN        |Constant float expression, quiet NaN.                                |

When double is supported, macros
ending in _F are available in type double
by removing _F from the macro name,
and in type half when the ``half extension``
is enabled by replacing _F with _H.

|M_E_F        |Value of e|
|M_LOG2E_F    |Value of log<sub>2</sub>e|
|M_LOG10E_F   |Value of log<sub>10</sub>e|
|M_LN2_F      |Value of log<sub>e</sub>2|
|M_LN10_F     |Value of log<sub>e</sub>10|
|M_PI_F       |Value of π|
|M_PI_2_F     |Value of π / 2|
|M_PI_4_F     |Value of π / 4|
|M_1_PI_F     |Value of 1 / π|
|M_2_PI_F     |Value of 2 / π|
|M_2_SQRTPI_F |Value of 2 / √π|
|M_SQRT2_F    |Value of √2|
|M_SQRT1_2_F  |Value of 1 / √2|

### OpenCL Device Architecture Diagram

|      |Global|Constant|Local|Private|
|:-----|:----|:--------|:----|:------|
|Host  |Dynamic allocation|Dynamic allocation|Dynamic allocation|No allocation|
| ^^   |Read/Write access|Read/Write access|No access|No access|
|Kernel|No allocation|Static allocation|Static allocation|Static allocation|
| ^^   |Read/Write access|Read-only access|Read/Write access|Read/Write access|

This conceptual OpenCL device architecture diagram shows processing elements (PE), compute units (CU), and devices. The host is not shown.
![OpenCL 1.2 Device Architecture Diagram](/assets/svg/cpp/opencl/opencl_1_2_device_architecture_diagram.svg "OpenCL 1.2 Device Architecture Diagram")

