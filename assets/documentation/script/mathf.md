
<a name="classesarccurve2md"></a>

# Class: ArcCurve2

This class represents an elliptical arc on a 2D plane.
The class is based on `EllipseCurve2`.

## Hierarchy

* [EllipseCurve2](#classesellipsecurve2md)

  ↳ **ArcCurve2**

## Index

### Constructors

* [constructor](#constructor)

### Methods

* [computeFrames](#computeframes)
* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)
* [ellipseWith](#ellipsewith)
* [from](#from)

## Constructors

### constructor

\+ **new ArcCurve2**(`xCenter`: number, `yCenter`: number, `radius`: number, `startAngle`: number, `endAngle`: number, `clockwise?`: boolean): [ArcCurve2](#classesarccurve2md)

*Overrides [EllipseCurve2](#classesellipsecurve2md).[constructor](#constructor)*

*Defined in [curves/arc-curve2.ts:8](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/arc-curve2.ts#L8)*

creates a elliptical arc with the given values

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`xCenter` | number | the x center position of the arc |
`yCenter` | number | the y center position of the arc |
`radius` | number | the radius of the arc |
`startAngle` | number | the start angle in radians |
`endAngle` | number | the end angle in radians |
`clockwise?` | boolean | if true, the arc is clockwise  |

**Returns:** [ArcCurve2](#classesarccurve2md)

## Methods

### computeFrames

▸ **computeFrames**(`segments`: number): [CurveFrame2](#classescurveframe2md)[]

*Inherited from [Curve2](#classescurve2md).[computeFrames](#computeframes)*

*Defined in [curves/curve2.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve2.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`segments` | number |

**Returns:** [CurveFrame2](#classescurveframe2md)[]

___

### getLength

▸ **getLength**(): number

*Inherited from [Curve](#classescurvemd).[getLength](#getlength)*

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Inherited from [Curve](#classescurvemd).[getLengths](#getlengths)*

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec2](#classesvec2md)

*Inherited from [EllipseCurve2](#classesellipsecurve2md).[getPoint](#getpoint)*

*Overrides [Curve](#classescurvemd).[getPoint](#getpoint)*

*Defined in [curves/ellipse-curve2.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L65)*

Returns a vector for a given position on the curve.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve  |

**Returns:** [Vec2](#classesvec2md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPointAt](#getpointat)*

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getPoints](#getpoints)*

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getSpacedPoints](#getspacedpoints)*

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangent](#gettangent)*

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangentAt](#gettangentat)*

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Inherited from [Curve](#classescurvemd).[getUtoTmapping](#getutotmapping)*

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number

___

### ellipseWith

▸ `Static`**ellipseWith**(`center`: [Vec2](#classesvec2md), `radius`: [Vec2](#classesvec2md), `startAngle`: number, `endAngle`: number, `clockwise?`: boolean, `rotation?`: number): [EllipseCurve2](#classesellipsecurve2md)

*Inherited from [EllipseCurve2](#classesellipsecurve2md).[ellipseWith](#ellipsewith)*

*Defined in [curves/ellipse-curve2.ts:57](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L57)*

Creates the 2d curve in the shape of an ellipse

**`see`** EllipseCurve2()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vec2](#classesvec2md) | the center of the ellipse |
`radius` | [Vec2](#classesvec2md) | the radius of the ellipse |
`startAngle` | number | The start angle of the curve in radians starting from the positive X axis. Default is 0. |
`endAngle` | number | The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI. |
`clockwise?` | boolean | Whether the ellipse is drawn clockwise. Default is false. |
`rotation?` | number | The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Default is 0. |

**Returns:** [EllipseCurve2](#classesellipsecurve2md)

___

### from

▸ `Static`**from**(`center`: [Vec3](#classesvec3md), `radius`: number, `startAngle`: number, `endAngle`: number, `clockwise?`: boolean): [ArcCurve2](#classesarccurve2md)

*Defined in [curves/arc-curve2.ts:32](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/arc-curve2.ts#L32)*

creates a elliptical arc with the given values

**`see`** ArcCurve2()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vec3](#classesvec3md) | the center position of the arc |
`radius` | number | the radius of the arc |
`startAngle` | number | the start angle in radians |
`endAngle` | number | the end angle in radians |
`clockwise?` | boolean | if true, the arc is clockwise |

**Returns:** [ArcCurve2](#classesarccurve2md)


<a name="classescatmullcubicpolynomialmd"></a>

# Class: CatmullCubicPolynomial

Based on an optimized c++ solution in
- http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
- http://ideone.com/NoEbVM

This CatmullCubicPolynomial class could be used for reusing some variables and calculations,
but for squishy curve use, it could be possible inlined and flatten into a single function call.

## Hierarchy

* **CatmullCubicPolynomial**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [c0](#c0)
* [c1](#c1)
* [c2](#c2)
* [c3](#c3)

### Methods

* [calculate](#calculate)
* [init](#init)
* [initCatmullRom](#initcatmullrom)
* [initNonuniformCatmullRom](#initnonuniformcatmullrom)

## Constructors

### constructor

\+ **new CatmullCubicPolynomial**(): [CatmullCubicPolynomial](#classescatmullcubicpolynomialmd)

*Defined in [curves/catmull-cubic-polynomial.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L14)*

**Returns:** [CatmullCubicPolynomial](#classescatmullcubicpolynomialmd)

## Properties

### c0

•  **c0**: number

*Defined in [curves/catmull-cubic-polynomial.ts:11](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L11)*

___

### c1

•  **c1**: number

*Defined in [curves/catmull-cubic-polynomial.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L12)*

___

### c2

•  **c2**: number

*Defined in [curves/catmull-cubic-polynomial.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L13)*

___

### c3

•  **c3**: number

*Defined in [curves/catmull-cubic-polynomial.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L14)*

## Methods

### calculate

▸ **calculate**(`t`: number): number

*Defined in [curves/catmull-cubic-polynomial.ts:56](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L56)*

#### Parameters:

Name | Type |
------ | ------ |
`t` | number |

**Returns:** number

___

### init

▸ **init**(`x0`: number, `x1`: number, `t0`: number, `t1`: number): void

*Defined in [curves/catmull-cubic-polynomial.ts:31](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`x0` | number |
`x1` | number |
`t0` | number |
`t1` | number |

**Returns:** void

___

### initCatmullRom

▸ **initCatmullRom**(`x0`: number, `x1`: number, `x2`: number, `x3`: number, `tension`: number): void

*Defined in [curves/catmull-cubic-polynomial.ts:38](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`x0` | number |
`x1` | number |
`x2` | number |
`x3` | number |
`tension` | number |

**Returns:** void

___

### initNonuniformCatmullRom

▸ **initNonuniformCatmullRom**(`x0`: number, `x1`: number, `x2`: number, `x3`: number, `dt0`: number, `dt1`: number, `dt2`: number): void

*Defined in [curves/catmull-cubic-polynomial.ts:44](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-cubic-polynomial.ts#L44)*

#### Parameters:

Name | Type |
------ | ------ |
`x0` | number |
`x1` | number |
`x2` | number |
`x3` | number |
`dt0` | number |
`dt1` | number |
`dt2` | number |

**Returns:** void


<a name="classescatmullromcurve3md"></a>

# Class: CatmullRomCurve3

Centripetal CatmullRom Curve - which is useful for avoiding
cusps and self-intersections in non-uniform catmull rom curves.

**`see`** http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf

## Hierarchy

* [Curve3](#classescurve3md)

  ↳ **CatmullRomCurve3**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [closed](#closed)
* [points](#points)
* [tension](#tension)
* [type](#type)

### Methods

* [computeFrenetFrames](#computefrenetframes)
* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)

## Constructors

### constructor

\+ **new CatmullRomCurve3**(`points`: [Vec3](#classesvec3md)[], `closed?`: boolean, `type?`: [CatmullRomType](#enumscatmullromtypemd), `tension?`: number): [CatmullRomCurve3](#classescatmullromcurve3md)

*Overrides [Curve3](#classescurve3md).[constructor](#constructor)*

*Defined in [curves/catmull-rom-curve3.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-curve3.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`points` | [Vec3](#classesvec3md)[] |
`closed?` | boolean |
`type?` | [CatmullRomType](#enumscatmullromtypemd) |
`tension?` | number |

**Returns:** [CatmullRomCurve3](#classescatmullromcurve3md)

## Properties

### closed

• `Private` `Optional` `Readonly` **closed**: boolean

*Defined in [curves/catmull-rom-curve3.ts:16](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-curve3.ts#L16)*

___

### points

• `Private` `Readonly` **points**: [Vec3](#classesvec3md)[]

*Defined in [curves/catmull-rom-curve3.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-curve3.ts#L15)*

___

### tension

• `Private` `Optional` `Readonly` **tension**: number

*Defined in [curves/catmull-rom-curve3.ts:18](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-curve3.ts#L18)*

___

### type

• `Private` `Optional` `Readonly` **type**: [CatmullRomType](#enumscatmullromtypemd)

*Defined in [curves/catmull-rom-curve3.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-curve3.ts#L17)*

## Methods

### computeFrenetFrames

▸ **computeFrenetFrames**(`segments`: number, `closed?`: boolean): [CurveFrame3](#classescurveframe3md)[]

*Inherited from [Curve3](#classescurve3md).[computeFrenetFrames](#computefrenetframes)*

*Defined in [curves/curve3.ts:23](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve3.ts#L23)*

Generates the Frenet Frames. Requires a curve definition in 3D space.

**`see`** http://www.cs.indiana.edu/pub/techreports/TR425.pdf

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`segments` | number | number of frames to compute |
`closed?` | boolean | true if the curve is closed |

**Returns:** [CurveFrame3](#classescurveframe3md)[]

___

### getLength

▸ **getLength**(): number

*Inherited from [Curve](#classescurvemd).[getLength](#getlength)*

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Inherited from [Curve](#classescurvemd).[getLengths](#getlengths)*

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec3](#classesvec3md)

*Overrides [Curve](#classescurvemd).[getPoint](#getpoint)*

*Defined in [curves/catmull-rom-curve3.ts:32](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-curve3.ts#L32)*

#### Parameters:

Name | Type |
------ | ------ |
`t` | number |

**Returns:** [Vec3](#classesvec3md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPointAt](#getpointat)*

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getPoints](#getpoints)*

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getSpacedPoints](#getspacedpoints)*

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangent](#gettangent)*

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangentAt](#gettangentat)*

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Inherited from [Curve](#classescurvemd).[getUtoTmapping](#getutotmapping)*

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number


<a name="classescolormd"></a>

# Class: Color

The class is used to encapsulate colors in the default sRGBA color space.
Every color has an implicit alpha value of 1.0 or an explicit undefined provided in the constructor.
The alpha value defines the transparency of a color and can be represented by a value in the range 0.0 - 1.0

## Hierarchy

* **Color**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [a](#a)
* [b](#b)
* [g](#g)
* [r](#r)

### Methods

* [add](#add)
* [addWith](#addwith)
* [clone](#clone)
* [getAlpha](#getalpha)
* [getB](#getb)
* [getG](#getg)
* [getR](#getr)
* [isAlpha](#isalpha)
* [lerp](#lerp)
* [scale](#scale)
* [toHex](#tohex)
* [toString](#tostring)
* [fromHSL](#fromhsl)
* [random](#random)

## Constructors

### constructor

\+ **new Color**(`r`: number, `g`: number, `b`: number, `a?`: number): [Color](#classescolormd)

*Defined in [color.ts:25](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L25)*

Creates an sRGBA color with the specified red, green, blue, and alpha values in the range [0, 1].

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`r` | number | the red component |
`g` | number | the green component |
`b` | number | the blue component |
`a?` | number | the alpha component  |

**Returns:** [Color](#classescolormd)

## Properties

### a

•  **a**: number \| undefined

*Defined in [color.ts:25](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L25)*

the alpha component [0, 1]

___

### b

•  **b**: number

*Defined in [color.ts:21](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L21)*

 the blue component [0, 1]

___

### g

•  **g**: number

*Defined in [color.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L17)*

the green component [0, 1]

___

### r

•  **r**: number

*Defined in [color.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L13)*

the red component [0, 1]

## Methods

### add

▸ **add**(`r`: number, `g`: number, `b`: number, `a?`: number): [Color](#classescolormd)

*Defined in [color.ts:144](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L144)*

Adds the RGB/A values of color to the RGB/A values of this color and returns a new color as result.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`r` | number | Red channel value between [0, 1] to add |
`g` | number | Green channel value between [0, 1] to add |
`b` | number | Blue channel value between [0, 1] to add |
`a?` | number | Alpha channel value between [0, 1] to add  |

**Returns:** [Color](#classescolormd)

___

### addWith

▸ **addWith**(`color`: [Color](#classescolormd)): [Color](#classescolormd)

*Defined in [color.ts:162](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L162)*

Adds the given color to this color and and returns a new color as result.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [Color](#classescolormd) | the color to add  |

**Returns:** [Color](#classescolormd)

___

### clone

▸ **clone**(): [Color](#classescolormd)

*Defined in [color.ts:241](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L241)*

creates a new color with the same components from this color

**Returns:** [Color](#classescolormd)

___

### getAlpha

▸ **getAlpha**(): number

*Defined in [color.ts:192](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L192)*

Returns the alpha channel value between [0, 1].
If the color has no alpha the return is always 1.0

**`see`** Color.isAlpha()

**Returns:** number

___

### getB

▸ **getB**(): number

*Defined in [color.ts:183](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L183)*

Returns the blue channel value between [0, 255]

**Returns:** number

___

### getG

▸ **getG**(): number

*Defined in [color.ts:176](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L176)*

Returns the green channel value between [0, 255]

**Returns:** number

___

### getR

▸ **getR**(): number

*Defined in [color.ts:169](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L169)*

Returns the red channel value between [0, 255]

**Returns:** number

___

### isAlpha

▸ **isAlpha**(): boolean

*Defined in [color.ts:133](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L133)*

checks if the color has a alpha value

**Returns:** boolean

___

### lerp

▸ **lerp**(`other`: [Color](#classescolormd), `t`: number): [Color](#classescolormd)

*Defined in [color.ts:224](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L224)*

Linearly interpolates this color's RGB values toward the RGB values of the passed argument.
The t argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`other` | [Color](#classescolormd) | color to converge on. |
`t` | number | interpolation factor in the closed interval [0, 1].  |

**Returns:** [Color](#classescolormd)

___

### scale

▸ **scale**(`s`: number): [Color](#classescolormd)

*Defined in [color.ts:203](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L203)*

returns a new color with the components multiplied with the given scale

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`s` | number | the scale factor  |

**Returns:** [Color](#classescolormd)

___

### toHex

▸ **toHex**(): string

*Defined in [color.ts:94](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L94)*

converts the color to an html hexadecimal triplet string like #ffff00 or with alpha #ffff00ff

**Returns:** string

___

### toString

▸ **toString**(): string

*Defined in [color.ts:118](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L118)*

converts the color to a css color string like rgb(0, 0, 0) or rgba(0, 0, 0)

**Returns:** string

___

### fromHSL

▸ `Static`**fromHSL**(`h`: number, `s`: number, `l`: number): [Color](#classescolormd)

*Defined in [color.ts:48](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L48)*

Converts an HSL color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
Assumes h, s, and l are contained in the set [0, 1] and returns a new color.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`h` | number | The hue [0, 1] |
`s` | number | The saturation [0, 1] |
`l` | number | The lightness [0, 1]  |

**Returns:** [Color](#classescolormd)

___

### random

▸ `Static`**random**(): [Color](#classescolormd)

*Defined in [color.ts:86](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/color.ts#L86)*

Creates a random RGB color using Color.fromHSL() with a random hue

**Returns:** [Color](#classescolormd)


<a name="classescurvemd"></a>

# Class: Curve

A base class for creating a Curve object that contains methods for interpolation.

## Hierarchy

* **Curve**

  ↳ [Curve2](#classescurve2md)

  ↳ [Curve3](#classescurve3md)

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [lengths](#lengths)
* [APPROX\_DELTA](#approx_delta)
* [ARC\_LENGTH\_DIVISIONS](#arc_length_divisions)

### Methods

* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)

## Constructors

### constructor

\+ **new Curve**(): [Curve](#classescurvemd)

*Defined in [curves/curve.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L13)*

This constructor creates a new Curve.

**Returns:** [Curve](#classescurvemd)

## Properties

### lengths

• `Private` **lengths**: number[] \| undefined

*Defined in [curves/curve.ts:10](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L10)*

___

### APPROX\_DELTA

▪ `Static` `Private` **APPROX\_DELTA**: number = 0.0001

*Defined in [curves/curve.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L12)*

___

### ARC\_LENGTH\_DIVISIONS

▪ `Static` `Private` **ARC\_LENGTH\_DIVISIONS**: number = 200

*Defined in [curves/curve.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L13)*

## Methods

### getLength

▸ **getLength**(): number

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Defined in [curves/curve.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L26)*

Returns a vector for a given position on the curve.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number


<a name="classescurve2md"></a>

# Class: Curve2

Extension class for a curve with additional interpolation function for the 2d space.

## Hierarchy

* [Curve](#classescurvemd)

  ↳ **Curve2**

  ↳↳ [EllipseCurve2](#classesellipsecurve2md)

  ↳↳ [SplineCurve2](#classessplinecurve2md)

## Index

### Constructors

* [constructor](#constructor)

### Methods

* [computeFrames](#computeframes)
* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)

## Constructors

### constructor

\+ **new Curve2**(): [Curve2](#classescurve2md)

*Overrides [Curve](#classescurvemd).[constructor](#constructor)*

*Defined in [curves/curve2.ts:8](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve2.ts#L8)*

**Returns:** [Curve2](#classescurve2md)

## Methods

### computeFrames

▸ **computeFrames**(`segments`: number): [CurveFrame2](#classescurveframe2md)[]

*Defined in [curves/curve2.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve2.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`segments` | number |

**Returns:** [CurveFrame2](#classescurveframe2md)[]

___

### getLength

▸ **getLength**(): number

*Inherited from [Curve](#classescurvemd).[getLength](#getlength)*

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Inherited from [Curve](#classescurvemd).[getLengths](#getlengths)*

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPoint](#getpoint)*

*Defined in [curves/curve.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L26)*

Returns a vector for a given position on the curve.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPointAt](#getpointat)*

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getPoints](#getpoints)*

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getSpacedPoints](#getspacedpoints)*

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangent](#gettangent)*

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangentAt](#gettangentat)*

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Inherited from [Curve](#classescurvemd).[getUtoTmapping](#getutotmapping)*

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number


<a name="classescurve3md"></a>

# Class: Curve3

Extension class for a curve with additional interpolation function for the 3d space.

## Hierarchy

* [Curve](#classescurvemd)

  ↳ **Curve3**

  ↳↳ [CatmullRomCurve3](#classescatmullromcurve3md)

## Index

### Constructors

* [constructor](#constructor)

### Methods

* [computeFrenetFrames](#computefrenetframes)
* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)

## Constructors

### constructor

\+ **new Curve3**(): [Curve3](#classescurve3md)

*Overrides [Curve](#classescurvemd).[constructor](#constructor)*

*Defined in [curves/curve3.ts:11](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve3.ts#L11)*

**Returns:** [Curve3](#classescurve3md)

## Methods

### computeFrenetFrames

▸ **computeFrenetFrames**(`segments`: number, `closed?`: boolean): [CurveFrame3](#classescurveframe3md)[]

*Defined in [curves/curve3.ts:23](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve3.ts#L23)*

Generates the Frenet Frames. Requires a curve definition in 3D space.

**`see`** http://www.cs.indiana.edu/pub/techreports/TR425.pdf

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`segments` | number | number of frames to compute |
`closed?` | boolean | true if the curve is closed |

**Returns:** [CurveFrame3](#classescurveframe3md)[]

___

### getLength

▸ **getLength**(): number

*Inherited from [Curve](#classescurvemd).[getLength](#getlength)*

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Inherited from [Curve](#classescurvemd).[getLengths](#getlengths)*

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPoint](#getpoint)*

*Defined in [curves/curve.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L26)*

Returns a vector for a given position on the curve.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPointAt](#getpointat)*

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getPoints](#getpoints)*

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getSpacedPoints](#getspacedpoints)*

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangent](#gettangent)*

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangentAt](#gettangentat)*

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Inherited from [Curve](#classescurvemd).[getUtoTmapping](#getutotmapping)*

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number


<a name="classescurveframe2md"></a>

# Class: CurveFrame2

## Hierarchy

* **CurveFrame2**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [position](#position)
* [tangent](#tangent)

### Methods

* [rotation](#rotation)

## Constructors

### constructor

\+ **new CurveFrame2**(`position`: [Vec2](#classesvec2md), `tangent`: [Vec2](#classesvec2md)): [CurveFrame2](#classescurveframe2md)

*Defined in [curves/curve-frame2.ts:8](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame2.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`position` | [Vec2](#classesvec2md) |
`tangent` | [Vec2](#classesvec2md) |

**Returns:** [CurveFrame2](#classescurveframe2md)

## Properties

### position

•  **position**: [Vec2](#classesvec2md)

*Defined in [curves/curve-frame2.ts:8](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame2.ts#L8)*

position on the curve for the frame

___

### tangent

•  **tangent**: [Vec2](#classesvec2md)

*Defined in [curves/curve-frame2.ts:6](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame2.ts#L6)*

direction vector of the curve

## Methods

### rotation

▸ **rotation**(): number

*Defined in [curves/curve-frame2.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame2.ts#L15)*

**Returns:** number


<a name="classescurveframe3md"></a>

# Class: CurveFrame3

## Hierarchy

* **CurveFrame3**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [binormal](#binormal)
* [normal](#normal)
* [position](#position)
* [tangent](#tangent)

### Methods

* [rotation](#rotation)

## Constructors

### constructor

\+ **new CurveFrame3**(`position`: [Vec3](#classesvec3md), `tangent`: [Vec3](#classesvec3md)): [CurveFrame3](#classescurveframe3md)

*Defined in [curves/curve-frame3.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame3.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`position` | [Vec3](#classesvec3md) |
`tangent` | [Vec3](#classesvec3md) |

**Returns:** [CurveFrame3](#classescurveframe3md)

## Properties

### binormal

•  **binormal**: [Vec3](#classesvec3md)

*Defined in [curves/curve-frame3.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame3.ts#L13)*

the cross vector from tangent and normal

___

### normal

•  **normal**: [Vec3](#classesvec3md)

*Defined in [curves/curve-frame3.ts:7](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame3.ts#L7)*

the normal vector

___

### position

•  **position**: [Vec3](#classesvec3md)

*Defined in [curves/curve-frame3.ts:11](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame3.ts#L11)*

position on the curve for the frame

___

### tangent

•  **tangent**: [Vec3](#classesvec3md)

*Defined in [curves/curve-frame3.ts:9](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame3.ts#L9)*

direction vector of the curve

## Methods

### rotation

▸ **rotation**(): [Vec3](#classesvec3md)

*Defined in [curves/curve-frame3.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve-frame3.ts#L26)*

Computes the three euler angles from binormal, tangent and normal

**Returns:** [Vec3](#classesvec3md)


<a name="classesellipsecurve2md"></a>

# Class: EllipseCurve2

Creates a 2D curve in the shape of an ellipse.
Setting the xRadius equal to the yRadius will result in a circle.

## Hierarchy

* [Curve2](#classescurve2md)

  ↳ **EllipseCurve2**

  ↳↳ [ArcCurve2](#classesarccurve2md)

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [clockwise](#clockwise)
* [endAngle](#endangle)
* [rotation](#rotation)
* [startAngle](#startangle)
* [xCenter](#xcenter)
* [xRadius](#xradius)
* [yCenter](#ycenter)
* [yRadius](#yradius)

### Methods

* [computeFrames](#computeframes)
* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)
* [ellipseWith](#ellipsewith)

## Constructors

### constructor

\+ **new EllipseCurve2**(`xCenter`: number, `yCenter`: number, `xRadius`: number, `yRadius`: number, `startAngle`: number, `endAngle`: number, `clockwise?`: boolean, `rotation?`: number): [EllipseCurve2](#classesellipsecurve2md)

*Overrides [Curve2](#classescurve2md).[constructor](#constructor)*

*Defined in [curves/ellipse-curve2.ts:10](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L10)*

Creates the 2d curve in the shape of an ellipse

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`xCenter` | number | The X center of the ellipse. Default is 0. |
`yCenter` | number | The Y center of the ellipse. Default is 0. |
`xRadius` | number | The radius of the ellipse in the x direction. Default is 1. |
`yRadius` | number | The radius of the ellipse in the y direction. Default is 1. |
`startAngle` | number | The start angle of the curve in radians starting from the positive X axis. Default is 0. |
`endAngle` | number | The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI. |
`clockwise?` | boolean | Whether the ellipse is drawn clockwise. Default is false. |
`rotation?` | number | The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is 0.  |

**Returns:** [EllipseCurve2](#classesellipsecurve2md)

## Properties

### clockwise

• `Private` `Optional` `Readonly` **clockwise**: boolean

*Defined in [curves/ellipse-curve2.ts:30](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L30)*

Whether the ellipse is drawn clockwise. Default is false.

___

### endAngle

• `Private` `Readonly` **endAngle**: number

*Defined in [curves/ellipse-curve2.ts:29](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L29)*

The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI.

___

### rotation

• `Private` `Optional` `Readonly` **rotation**: number

*Defined in [curves/ellipse-curve2.ts:31](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L31)*

The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is 0.

___

### startAngle

• `Private` `Readonly` **startAngle**: number

*Defined in [curves/ellipse-curve2.ts:28](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L28)*

The start angle of the curve in radians starting from the positive X axis. Default is 0.

___

### xCenter

• `Private` `Readonly` **xCenter**: number

*Defined in [curves/ellipse-curve2.ts:24](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L24)*

The X center of the ellipse. Default is 0.

___

### xRadius

• `Private` `Readonly` **xRadius**: number

*Defined in [curves/ellipse-curve2.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L26)*

The radius of the ellipse in the x direction. Default is 1.

___

### yCenter

• `Private` `Readonly` **yCenter**: number

*Defined in [curves/ellipse-curve2.ts:25](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L25)*

The Y center of the ellipse. Default is 0.

___

### yRadius

• `Private` `Readonly` **yRadius**: number

*Defined in [curves/ellipse-curve2.ts:27](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L27)*

The radius of the ellipse in the y direction. Default is 1.

## Methods

### computeFrames

▸ **computeFrames**(`segments`: number): [CurveFrame2](#classescurveframe2md)[]

*Inherited from [Curve2](#classescurve2md).[computeFrames](#computeframes)*

*Defined in [curves/curve2.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve2.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`segments` | number |

**Returns:** [CurveFrame2](#classescurveframe2md)[]

___

### getLength

▸ **getLength**(): number

*Inherited from [Curve](#classescurvemd).[getLength](#getlength)*

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Inherited from [Curve](#classescurvemd).[getLengths](#getlengths)*

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec2](#classesvec2md)

*Overrides [Curve](#classescurvemd).[getPoint](#getpoint)*

*Defined in [curves/ellipse-curve2.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L65)*

Returns a vector for a given position on the curve.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve  |

**Returns:** [Vec2](#classesvec2md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPointAt](#getpointat)*

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getPoints](#getpoints)*

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getSpacedPoints](#getspacedpoints)*

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangent](#gettangent)*

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangentAt](#gettangentat)*

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Inherited from [Curve](#classescurvemd).[getUtoTmapping](#getutotmapping)*

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number

___

### ellipseWith

▸ `Static`**ellipseWith**(`center`: [Vec2](#classesvec2md), `radius`: [Vec2](#classesvec2md), `startAngle`: number, `endAngle`: number, `clockwise?`: boolean, `rotation?`: number): [EllipseCurve2](#classesellipsecurve2md)

*Defined in [curves/ellipse-curve2.ts:57](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/ellipse-curve2.ts#L57)*

Creates the 2d curve in the shape of an ellipse

**`see`** EllipseCurve2()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vec2](#classesvec2md) | the center of the ellipse |
`radius` | [Vec2](#classesvec2md) | the radius of the ellipse |
`startAngle` | number | The start angle of the curve in radians starting from the positive X axis. Default is 0. |
`endAngle` | number | The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI. |
`clockwise?` | boolean | Whether the ellipse is drawn clockwise. Default is false. |
`rotation?` | number | The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. Default is 0. |

**Returns:** [EllipseCurve2](#classesellipsecurve2md)


<a name="classesmatrix3md"></a>

# Class: Matrix3

## Hierarchy

* **Matrix3**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [elements](#elements)

### Methods

* [applyPoint2](#applypoint2)
* [applyPoint3](#applypoint3)
* [applyVec2](#applyvec2)
* [applyVec3](#applyvec3)
* [at](#at)
* [clone](#clone)
* [determinant](#determinant)
* [inverse](#inverse)
* [multiplyScalar](#multiplyscalar)
* [multiplyWith](#multiplywith)
* [normalMatrix](#normalmatrix)
* [premultiplyWith](#premultiplywith)
* [rotate](#rotate)
* [scale](#scale)
* [translate](#translate)
* [transpose](#transpose)
* [identity](#identity)
* [multiplyMatrices](#multiplymatrices)
* [transform](#transform)
* [zero](#zero)

## Constructors

### constructor

\+ **new Matrix3**(`n11`: number, `n12`: number, `n13`: number, `n21`: number, `n22`: number, `n23`: number, `n31`: number, `n32`: number, `n33`: number): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L12)*

Creates and initializes the 3D Matrix to the 3x3.
The constructor takes the arguments in row-major order, while internally they are stored in the elements array in column-major order.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`n11` | number |  |
`n12` | number |  |
`n13` | number |  |
`n21` | number |  |
`n22` | number |  |
`n23` | number |  |
`n31` | number |  |
`n32` | number |  |
`n33` | number |   |

**Returns:** [Matrix3](#classesmatrix3md)

## Properties

### elements

• `Private` **elements**: number[]

*Defined in [geometry/matrix3.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L12)*

## Methods

### applyPoint2

▸ **applyPoint2**(`p`: [Point2](#classespoint2md)): [Point2](#classespoint2md)

*Defined in [geometry/matrix3.ts:300](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L300)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point2](#classespoint2md) |

**Returns:** [Point2](#classespoint2md)

___

### applyPoint3

▸ **applyPoint3**(`p`: [Point3](#classespoint3md)): [Point3](#classespoint3md)

*Defined in [geometry/matrix3.ts:319](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L319)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point3](#classespoint3md) |

**Returns:** [Point3](#classespoint3md)

___

### applyVec2

▸ **applyVec2**(`v`: [Vec2](#classesvec2md)): [Vec2](#classesvec2md)

*Defined in [geometry/matrix3.ts:289](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L289)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec2](#classesvec2md) |

**Returns:** [Vec2](#classesvec2md)

___

### applyVec3

▸ **applyVec3**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/matrix3.ts:306](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L306)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec3](#classesvec3md) |

**Returns:** [Vec3](#classesvec3md)

___

### at

▸ **at**(`index`: number): number

*Defined in [geometry/matrix3.ts:325](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L325)*

#### Parameters:

Name | Type |
------ | ------ |
`index` | number |

**Returns:** number

___

### clone

▸ **clone**(): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:62](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L62)*

Creates a new Matrix3 and with identical elements to this one.

**Returns:** [Matrix3](#classesmatrix3md)

___

### determinant

▸ **determinant**(): number

*Defined in [geometry/matrix3.ts:141](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L141)*

Computes the determinant of this matrix.

**Returns:** number

___

### inverse

▸ **inverse**(): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:162](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L162)*

Returns the inverse of the this matrix using the analytic method.
You can not invert a matrix with a determinant of zero.
If you attempt this, the method returns a zero matrix instead.

**Returns:** [Matrix3](#classesmatrix3md)

___

### multiplyScalar

▸ **multiplyScalar**(`s`: number): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:127](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L127)*

Multiplies every component of the matrix by the scalar value s and returns the result in a new matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`s` | number | the scalar to multiply  |

**Returns:** [Matrix3](#classesmatrix3md)

___

### multiplyWith

▸ **multiplyWith**(`m`: [Matrix3](#classesmatrix3md)): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:76](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L76)*

Post-multiplies this matrix by m and returns the result in a new matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix3](#classesmatrix3md) | the matrix to multiply  |

**Returns:** [Matrix3](#classesmatrix3md)

___

### normalMatrix

▸ **normalMatrix**(): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:218](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L218)*

Returns the normal matrix, which is the inverse transpose matrix of this.

**Returns:** [Matrix3](#classesmatrix3md)

___

### premultiplyWith

▸ **premultiplyWith**(`m`: [Matrix3](#classesmatrix3md)): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:84](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L84)*

Pre-multiplies this matrix by m and returns the result in a new matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix3](#classesmatrix3md) | the matrix to multiply  |

**Returns:** [Matrix3](#classesmatrix3md)

___

### rotate

▸ **rotate**(`theta`: number): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:258](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L258)*

#### Parameters:

Name | Type |
------ | ------ |
`theta` | number |

**Returns:** [Matrix3](#classesmatrix3md)

___

### scale

▸ **scale**(`sx`: number, `sy`: number): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:248](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L248)*

#### Parameters:

Name | Type |
------ | ------ |
`sx` | number |
`sy` | number |

**Returns:** [Matrix3](#classesmatrix3md)

___

### translate

▸ **translate**(`tx`: number, `ty`: number): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:279](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L279)*

#### Parameters:

Name | Type |
------ | ------ |
`tx` | number |
`ty` | number |

**Returns:** [Matrix3](#classesmatrix3md)

___

### transpose

▸ **transpose**(): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:202](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L202)*

Transposes this matrix and returns the result in a new matrix.

**Returns:** [Matrix3](#classesmatrix3md)

___

### identity

▸ `Static`**identity**(): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:50](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L50)*

Creates and initializes the 3D Matrix to the 3x3 identity matrix.

**Returns:** [Matrix3](#classesmatrix3md)

___

### multiplyMatrices

▸ `Static`**multiplyMatrices**(`a`: [Matrix3](#classesmatrix3md), `b`: [Matrix3](#classesmatrix3md)): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:93](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L93)*

multiplies both matrices with each other

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | [Matrix3](#classesmatrix3md) | the first matrix |
`b` | [Matrix3](#classesmatrix3md) | the second matrix  |

**Returns:** [Matrix3](#classesmatrix3md)

___

### transform

▸ `Static`**transform**(`tx`: number, `ty`: number, `sx`: number, `sy`: number, `rotation`: number, `cx`: number, `cy`: number): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:235](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L235)*

Creates a new UV transform matrix from offset, repeat, rotation, and center.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`tx` | number | offset x |
`ty` | number | offset y |
`sx` | number | repeat x |
`sy` | number | repeat y |
`rotation` | number | rotation (in radians) |
`cx` | number | center x of rotation |
`cy` | number | center y of rotation  |

**Returns:** [Matrix3](#classesmatrix3md)

___

### zero

▸ `Static`**zero**(): [Matrix3](#classesmatrix3md)

*Defined in [geometry/matrix3.ts:38](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix3.ts#L38)*

Creates and initializes the 3D Matrix to the 3x3 with zero values.

**Returns:** [Matrix3](#classesmatrix3md)


<a name="classesmatrix4md"></a>

# Class: Matrix4

A class representing a 4x4 matrix.
The most common use of a 4x4 matrix in 3D computer graphics is as a Transformation Matrix.
For an introduction to transformation matrices as used in WebGL.

**`see`** https://en.wikipedia.org/wiki/Transformation_matrix

**`see`** http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/

## Hierarchy

* **Matrix4**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [elements](#elements)

### Methods

* [applyPoint3](#applypoint3)
* [applyVec3](#applyvec3)
* [at](#at)
* [clone](#clone)
* [determinant](#determinant)
* [inverse](#inverse)
* [maxScaleOnAxis](#maxscaleonaxis)
* [multiply](#multiply)
* [multiplyScalar](#multiplyscalar)
* [multiplyScale](#multiplyscale)
* [multiplyScaleWith](#multiplyscalewith)
* [premultiply](#premultiply)
* [toEuler](#toeuler)
* [transpose](#transpose)
* [compose](#compose)
* [identity](#identity)
* [lookAt](#lookat)
* [multiplyMatrices](#multiplymatrices)
* [orthographic](#orthographic)
* [perspective](#perspective)
* [rotationAxis](#rotationaxis)
* [rotationAxisWith](#rotationaxiswith)
* [rotationFromEuler](#rotationfromeuler)
* [rotationFromQuaternion](#rotationfromquaternion)
* [rotationX](#rotationx)
* [rotationY](#rotationy)
* [rotationZ](#rotationz)
* [scale](#scale)
* [scaleWith](#scalewith)
* [shear](#shear)
* [shearWith](#shearwith)
* [translation](#translation)
* [zero](#zero)

## Constructors

### constructor

\+ **new Matrix4**(`n11`: number, `n12`: number, `n13`: number, `n14`: number, `n21`: number, `n22`: number, `n23`: number, `n24`: number, `n31`: number, `n32`: number, `n33`: number, `n34`: number, `n41`: number, `n42`: number, `n43`: number, `n44`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L15)*

Creates a new 4x4 matrix

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`n11` | number |  |
`n12` | number |  |
`n13` | number |  |
`n14` | number |  |
`n21` | number |  |
`n22` | number |  |
`n23` | number |  |
`n24` | number |  |
`n31` | number |  |
`n32` | number |  |
`n33` | number |  |
`n34` | number |  |
`n41` | number |  |
`n42` | number |  |
`n43` | number |  |
`n44` | number |   |

**Returns:** [Matrix4](#classesmatrix4md)

## Properties

### elements

• `Private` **elements**: number[]

*Defined in [geometry/matrix4.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L15)*

## Methods

### applyPoint3

▸ **applyPoint3**(`p`: [Point3](#classespoint3md)): [Point3](#classespoint3md)

*Defined in [geometry/matrix4.ts:628](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L628)*

Applies this Matrix transform to the given point p.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [Point3](#classespoint3md) | the point to apply  |

**Returns:** [Point3](#classespoint3md)

___

### applyVec3

▸ **applyVec3**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/matrix4.ts:608](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L608)*

Applies this Matrix transform to the given vector v.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the vector to apply  |

**Returns:** [Vec3](#classesvec3md)

___

### at

▸ **at**(`index`: number): number

*Defined in [geometry/matrix4.ts:638](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L638)*

returns the element value at given index

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`index` | number | the index for the element  |

**Returns:** number

___

### clone

▸ **clone**(): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:78](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L78)*

Creates a new Matrix4 with identical elements to this one.

**Returns:** [Matrix4](#classesmatrix4md)

___

### determinant

▸ **determinant**(): number

*Defined in [geometry/matrix4.ts:263](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L263)*

Computes the determinant of this matrix.

**`see`** http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm

**Returns:** number

___

### inverse

▸ **inverse**(): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:333](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L333)*

Returns the inverse matrix for this matrix.
You can not invert a matrix with a determinant of zero.
If you attempt this, the method returns a zero matrix instead.

**`see`** http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm

**Returns:** [Matrix4](#classesmatrix4md)

___

### maxScaleOnAxis

▸ **maxScaleOnAxis**(): number

*Defined in [geometry/matrix4.ts:704](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L704)*

Gets the maximum scale value of the 3 axes.

**Returns:** number

___

### multiply

▸ **multiply**(`m`: [Matrix4](#classesmatrix4md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:186](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L186)*

Post-multiplies this matrix by m and returns a new matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the matrix to multiply  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### multiplyScalar

▸ **multiplyScalar**(`s`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:247](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L247)*

Multiplies every element of the matrix by the scalar value s and returns the result in a new matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`s` | number | the scalar to multiply  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### multiplyScale

▸ **multiplyScale**(`x`: number, `y`: number, `z`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:379](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L379)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** [Matrix4](#classesmatrix4md)

___

### multiplyScaleWith

▸ **multiplyScaleWith**(`v`: [Vec3](#classesvec3md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:391](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L391)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec3](#classesvec3md) |

**Returns:** [Matrix4](#classesmatrix4md)

___

### premultiply

▸ **premultiply**(`m`: [Matrix4](#classesmatrix4md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:194](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L194)*

Pre-multiplies this matrix by m and returns a new matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the matrix to multiply  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### toEuler

▸ **toEuler**(): [Vec3](#classesvec3md)

*Defined in [geometry/matrix4.ts:717](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L717)*

Returns the euler angles represented by this matrix rotation for the three axes in radians. (Order: XYZ)

**Returns:** [Vec3](#classesvec3md)

___

### transpose

▸ **transpose**(): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:310](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L310)*

Transposes this matrix and returns the result in a new matrix.

**Returns:** [Matrix4](#classesmatrix4md)

___

### compose

▸ `Static`**compose**(`position`: [Vec3](#classesvec3md), `quaternion`: [Quaternion](#classesquaternionmd), `scale`: [Vec3](#classesvec3md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:648](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L648)*

creates a new matrix to the transformation composed of position, quaternion and scale.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`position` | [Vec3](#classesvec3md) | the position |
`quaternion` | [Quaternion](#classesquaternionmd) | the quaternion |
`scale` | [Vec3](#classesvec3md) | the scale  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### identity

▸ `Static`**identity**(): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:52](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L52)*

creates a new matrix as the 4x4 identity matrix.

**Returns:** [Matrix4](#classesmatrix4md)

___

### lookAt

▸ `Static`**lookAt**(`eye`: [Vec3](#classesvec3md), `target`: [Vec3](#classesvec3md), `up`: [Vec3](#classesvec3md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:145](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L145)*

Constructs a new rotation matrix, looking from eye towards target oriented by the up vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`eye` | [Vec3](#classesvec3md) | the eye vector |
`target` | [Vec3](#classesvec3md) | the target vector |
`up` | [Vec3](#classesvec3md) | the up vector  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### multiplyMatrices

▸ `Static`**multiplyMatrices**(`a`: [Matrix4](#classesmatrix4md), `b`: [Matrix4](#classesmatrix4md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:203](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L203)*

multiplies both matrices with each other

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | [Matrix4](#classesmatrix4md) | the first matrix |
`b` | [Matrix4](#classesmatrix4md) | the second matrix  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### orthographic

▸ `Static`**orthographic**(`left`: number, `right`: number, `top`: number, `bottom`: number, `near`: number, `far`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:584](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L584)*

Creates a new orthographic projection matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`left` | number |  |
`right` | number |  |
`top` | number |  |
`bottom` | number |  |
`near` | number |  |
`far` | number |   |

**Returns:** [Matrix4](#classesmatrix4md)

___

### perspective

▸ `Static`**perspective**(`left`: number, `right`: number, `top`: number, `bottom`: number, `near`: number, `far`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:555](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L555)*

Creates a new perspective projection matrix.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`left` | number |  |
`right` | number |  |
`top` | number |  |
`bottom` | number |  |
`near` | number |  |
`far` | number |   |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationAxis

▸ `Static`**rotationAxis**(`x`: number, `y`: number, `z`: number, `angle`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:469](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L469)*

creates a new matrix as rotation transform around axis by theta radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination of the rotation axis |
`y` | number | the y coordination of the rotation axis |
`z` | number | the z coordination of the rotation axis |
`angle` | number | Rotation angle in radians.  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationAxisWith

▸ `Static`**rotationAxisWith**(`axis`: [Vec3](#classesvec3md), `angle`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:492](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L492)*

creates a new matrix as rotation transform around axis by theta radians.

**`see`** Matrix4.rotationAxis()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`axis` | [Vec3](#classesvec3md) | Rotation axis, should be normalized. |
`angle` | number | Rotation angle in radians. |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationFromEuler

▸ `Static`**rotationFromEuler**(`x`: number, `y`: number, `z`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L95)*

creates a new matrix with the rotation specified by the given Euler Angle.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x axis angle in radians |
`y` | number | the y axis angle in radians |
`z` | number | the z axis angle in radians  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationFromQuaternion

▸ `Static`**rotationFromQuaternion**(`q`: [Quaternion](#classesquaternionmd)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:695](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L695)*

creates a new rotation matrix from the the rotation specified by the given quaternion q.
The rest of the matrix is set to the identity.

**`see`** https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the quaternion for the rotation |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationX

▸ `Static`**rotationX**(`theta`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:415](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L415)*

creates a new matrix as a rotational transformation around the X axis by theta (θ) radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`theta` | number | the x axis rotation in radians  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationY

▸ `Static`**rotationY**(`theta`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:432](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L432)*

creates a new matrix as a rotational transformation around the Y axis by theta (θ) radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`theta` | number | the y axis rotation in radians  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### rotationZ

▸ `Static`**rotationZ**(`theta`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:449](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L449)*

creates a new matrix as a rotational transformation around the Z axis by theta (θ) radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`theta` | number | the z axis rotation in radians  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### scale

▸ `Static`**scale**(`x`: number, `y`: number, `z`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:502](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L502)*

create a new matrix as scale transform

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the amount to scale in the X axis. |
`y` | number | the amount to scale in the Y axis. |
`z` | number | the amount to scale in the Z axis.  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### scaleWith

▸ `Static`**scaleWith**(`v`: [Vec3](#classesvec3md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:517](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L517)*

create a new matrix as scale transform

**`see`** Matrix4.scale()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the scale vector |

**Returns:** [Matrix4](#classesmatrix4md)

___

### shear

▸ `Static`**shear**(`x`: number, `y`: number, `z`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:527](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L527)*

create a new matrix as a shear transform

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the amount to shear in the X axis. |
`y` | number | the amount to shear in the Y axis. |
`z` | number | the amount to shear in the Z axis.  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### shearWith

▸ `Static`**shearWith**(`v`: [Vec3](#classesvec3md)): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:542](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L542)*

create a new matrix as a shear transform

**`see`** Matrix4.shear()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the shear vector |

**Returns:** [Matrix4](#classesmatrix4md)

___

### translation

▸ `Static`**translation**(`x`: number, `y`: number, `z`: number): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:401](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L401)*

creates a new matrix as a translation transform:

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the amount to translate in the X axis. |
`y` | number | the amount to translate in the Y axis. |
`z` | number | the amount to translate in the Z axis.  |

**Returns:** [Matrix4](#classesmatrix4md)

___

### zero

▸ `Static`**zero**(): [Matrix4](#classesmatrix4md)

*Defined in [geometry/matrix4.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/matrix4.ts#L65)*

creates a new matrix where all elements are zero.

**Returns:** [Matrix4](#classesmatrix4md)


<a name="classesplanemd"></a>

# Class: Plane

A two dimensional surface that extends infinitely in 3d space,
represented in Hessian normal form by a unit length normal vector and a constant.

## Hierarchy

* **Plane**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [constant](#constant)
* [normal](#normal)

### Methods

* [applyMatrix4](#applymatrix4)
* [clone](#clone)
* [coplanarPoint](#coplanarpoint)
* [distanceToPoint](#distancetopoint)
* [distanceToSphere](#distancetosphere)
* [intersectRay](#intersectray)
* [intersectsSphere](#intersectssphere)
* [negate](#negate)
* [normalAt](#normalat)
* [projectPoint](#projectpoint)
* [translate](#translate)
* [fromCoplanarPoints](#fromcoplanarpoints)
* [fromNormalAndCoplanarPoint](#fromnormalandcoplanarpoint)

## Constructors

### constructor

\+ **new Plane**(`normal`: [Vec3](#classesvec3md), `constant`: number): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L15)*

Creates a new Plane

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`normal` | [Vec3](#classesvec3md) | the unit length Vec3 defining the normal of the plane |
`constant` | number | the signed distance from the origin to the plane  |

**Returns:** [Plane](#classesplanemd)

## Properties

### constant

•  **constant**: number \| undefined

*Defined in [geometry/plane.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L15)*

the signed distance from the origin to the plane

___

### normal

•  **normal**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/plane.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L13)*

a unit length Vec3 defining the normal of the plane

## Methods

### applyMatrix4

▸ **applyMatrix4**(`m`: [Matrix4](#classesmatrix4md), `optionalNormalMatrix?`: [Matrix3](#classesmatrix3md)): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:148](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L148)*

Apply a Matrix4 to the plane.
The matrix must be an affine, homogeneous transform.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the Matrix4 to apply. |
`optionalNormalMatrix?` | [Matrix3](#classesmatrix3md) | pre-computed normal Matrix3 of the Matrix4 being applied.  |

**Returns:** [Plane](#classesplanemd)

___

### clone

▸ **clone**(): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:30](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L30)*

Returns a new plane with the same normal and constant as this one.

**Returns:** [Plane](#classesplanemd)

___

### coplanarPoint

▸ **coplanarPoint**(): [Vec3](#classesvec3md)

*Defined in [geometry/plane.ts:77](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L77)*

Returns a Vector3 coplanar to the plane, by calculating the projection of the normal vector at the origin onto the plane.

**Returns:** [Vec3](#classesvec3md)

___

### distanceToPoint

▸ **distanceToPoint**(`point`: [Vec3](#classesvec3md)): number

*Defined in [geometry/plane.ts:48](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L48)*

Returns the signed distance from the point to the plane.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to get the distance to  |

**Returns:** number

___

### distanceToSphere

▸ **distanceToSphere**(`sphere`: [Sphere](#classesspheremd)): number

*Defined in [geometry/plane.ts:94](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L94)*

Returns the signed distance from the sphere to the plane.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`sphere` | [Sphere](#classesspheremd) | the sphere to get the distance to  |

**Returns:** number

___

### intersectRay

▸ **intersectRay**(`ray`: [Ray](#classesraymd)): [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/plane.ts:111](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L111)*

Intersect this Ray with this Plane, returning the intersection point or undefined if there is no intersection.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ray` | [Ray](#classesraymd) | the ray to intersect with this plane  |

**Returns:** [Vec3](#classesvec3md) \| undefined

___

### intersectsSphere

▸ **intersectsSphere**(`sphere`: [Sphere](#classesspheremd)): boolean

*Defined in [geometry/plane.ts:102](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L102)*

checks if the sphere intersects with the plane

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`sphere` | [Sphere](#classesspheremd) | the sphere to check  |

**Returns:** boolean

___

### negate

▸ **negate**(): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:38](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L38)*

Negates both the normal vector and the constant.

**Returns:** [Plane](#classesplanemd)

___

### normalAt

▸ **normalAt**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/plane.ts:86](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L86)*

returns the normal for the given point

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to get the normal at  |

**Returns:** [Vec3](#classesvec3md)

___

### projectPoint

▸ **projectPoint**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/plane.ts:56](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L56)*

Projects a point onto the plane.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the Vec3 to project onto the plane.  |

**Returns:** [Vec3](#classesvec3md)

___

### translate

▸ **translate**(`offset`: [Vec3](#classesvec3md)): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:68](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L68)*

Translates the plane by the distance defined by the offset vector.
Note that this only affects the plane constant and will not affect the normal vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`offset` | [Vec3](#classesvec3md) | the offset to translate  |

**Returns:** [Plane](#classesplanemd)

___

### fromCoplanarPoints

▸ `Static`**fromCoplanarPoints**(`a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md)): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:134](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L134)*

Defines the plane based on the 3 provided points.
The winding order is assumed to be counter-clockwise, and determines the direction of the normal.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | [Vec3](#classesvec3md) | first point on the plane. |
`b` | [Vec3](#classesvec3md) | second point on the plane. |
`c` | [Vec3](#classesvec3md) | third point on the plane.  |

**Returns:** [Plane](#classesplanemd)

___

### fromNormalAndCoplanarPoint

▸ `Static`**fromNormalAndCoplanarPoint**(`n`: [Vec3](#classesvec3md), `point`: [Vec3](#classesvec3md)): [Plane](#classesplanemd)

*Defined in [geometry/plane.ts:120](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/plane.ts#L120)*

Creates a new plane as defined by a normal and an arbitrary coplanar point.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`n` | [Vec3](#classesvec3md) | a unit length Vec3 defining the normal of the plane. |
`point` | [Vec3](#classesvec3md) | the coplanar point  |

**Returns:** [Plane](#classesplanemd)


<a name="classespoint2md"></a>

# Class: Point2

## Hierarchy

* **Point2**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [x](#x)
* [y](#y)

### Methods

* [applyMatrix3](#applymatrix3)
* [center](#center)
* [centerWith](#centerwith)
* [clone](#clone)
* [distance](#distance)
* [distanceSquared](#distancesquared)
* [distanceSquaredTo](#distancesquaredto)
* [distanceTo](#distanceto)
* [subtract](#subtract)
* [subtractWith](#subtractwith)
* [translate](#translate)
* [translateDirection](#translatedirection)
* [translateWith](#translatewith)

## Constructors

### constructor

\+ **new Point2**(`x`: number, `y`: number): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:7](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** [Point2](#classespoint2md)

## Properties

### x

•  **x**: number \| undefined

*Defined in [geometry/point2.ts:6](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L6)*

___

### y

•  **y**: number \| undefined

*Defined in [geometry/point2.ts:7](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L7)*

## Methods

### applyMatrix3

▸ **applyMatrix3**(`m`: [Matrix3](#classesmatrix3md)): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:75](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L75)*

#### Parameters:

Name | Type |
------ | ------ |
`m` | [Matrix3](#classesmatrix3md) |

**Returns:** [Point2](#classespoint2md)

___

### center

▸ **center**(`x`: number, `y`: number): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:59](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** [Point2](#classespoint2md)

___

### centerWith

▸ **centerWith**(`p`: [Point2](#classespoint2md)): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point2](#classespoint2md) |

**Returns:** [Point2](#classespoint2md)

___

### clone

▸ **clone**(): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:69](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L69)*

**Returns:** [Point2](#classespoint2md)

___

### distance

▸ **distance**(`x`: number, `y`: number): number

*Defined in [geometry/point2.ts:40](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** number

___

### distanceSquared

▸ **distanceSquared**(`x`: number, `y`: number): number

*Defined in [geometry/point2.ts:30](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** number

___

### distanceSquaredTo

▸ **distanceSquaredTo**(`p`: [Point2](#classespoint2md)): number

*Defined in [geometry/point2.ts:36](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L36)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point2](#classespoint2md) |

**Returns:** number

___

### distanceTo

▸ **distanceTo**(`p`: [Point2](#classespoint2md)): number

*Defined in [geometry/point2.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point2](#classespoint2md) |

**Returns:** number

___

### subtract

▸ **subtract**(`x`: number, `y`: number): [Vec2](#classesvec2md)

*Defined in [geometry/point2.ts:49](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** [Vec2](#classesvec2md)

___

### subtractWith

▸ **subtractWith**(`p`: [Point2](#classespoint2md)): [Vec2](#classesvec2md)

*Defined in [geometry/point2.ts:55](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point2](#classespoint2md) |

**Returns:** [Vec2](#classesvec2md)

___

### translate

▸ **translate**(`dx`: number, `dy`: number): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`dx` | number |
`dy` | number |

**Returns:** [Point2](#classespoint2md)

___

### translateDirection

▸ **translateDirection**(`direction`: [Vec2](#classesvec2md), `length`: number): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:25](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L25)*

#### Parameters:

Name | Type |
------ | ------ |
`direction` | [Vec2](#classesvec2md) |
`length` | number |

**Returns:** [Point2](#classespoint2md)

___

### translateWith

▸ **translateWith**(`v`: [Vec2](#classesvec2md)): [Point2](#classespoint2md)

*Defined in [geometry/point2.ts:21](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point2.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec2](#classesvec2md) |

**Returns:** [Point2](#classespoint2md)


<a name="classespoint3md"></a>

# Class: Point3

## Hierarchy

* **Point3**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [x](#x)
* [y](#y)
* [z](#z)

### Methods

* [applyMatrix3](#applymatrix3)
* [applyMatrix4](#applymatrix4)
* [applyQuaternion](#applyquaternion)
* [center](#center)
* [centerWith](#centerwith)
* [clone](#clone)
* [distance](#distance)
* [distanceSquared](#distancesquared)
* [distanceSquaredTo](#distancesquaredto)
* [distanceTo](#distanceto)
* [subtract](#subtract)
* [subtractWith](#subtractwith)
* [translate](#translate)
* [translateDirection](#translatedirection)
* [translateWith](#translatewith)

## Constructors

### constructor

\+ **new Point3**(`x`: number, `y`: number, `z`: number): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:10](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** [Point3](#classespoint3md)

## Properties

### x

•  **x**: number \| undefined

*Defined in [geometry/point3.ts:8](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L8)*

___

### y

•  **y**: number \| undefined

*Defined in [geometry/point3.ts:9](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L9)*

___

### z

•  **z**: number \| undefined

*Defined in [geometry/point3.ts:10](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L10)*

## Methods

### applyMatrix3

▸ **applyMatrix3**(`m`: [Matrix3](#classesmatrix3md)): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:84](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L84)*

#### Parameters:

Name | Type |
------ | ------ |
`m` | [Matrix3](#classesmatrix3md) |

**Returns:** [Point3](#classespoint3md)

___

### applyMatrix4

▸ **applyMatrix4**(`m`: [Matrix4](#classesmatrix4md)): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:88](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L88)*

#### Parameters:

Name | Type |
------ | ------ |
`m` | [Matrix4](#classesmatrix4md) |

**Returns:** [Point3](#classespoint3md)

___

### applyQuaternion

▸ **applyQuaternion**(`q`: [Quaternion](#classesquaternionmd)): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:92](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`q` | [Quaternion](#classesquaternionmd) |

**Returns:** [Point3](#classespoint3md)

___

### center

▸ **center**(`x`: number, `y`: number, `z`: number): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:66](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** [Point3](#classespoint3md)

___

### centerWith

▸ **centerWith**(`p`: [Point3](#classespoint3md)): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:73](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point3](#classespoint3md) |

**Returns:** [Point3](#classespoint3md)

___

### clone

▸ **clone**(): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:77](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L77)*

**Returns:** [Point3](#classespoint3md)

___

### distance

▸ **distance**(`x`: number, `y`: number, `z`: number): number

*Defined in [geometry/point3.ts:46](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L46)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** number

___

### distanceSquared

▸ **distanceSquared**(`x`: number, `y`: number, `z`: number): number

*Defined in [geometry/point3.ts:35](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L35)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** number

___

### distanceSquaredTo

▸ **distanceSquaredTo**(`p`: [Point3](#classespoint3md)): number

*Defined in [geometry/point3.ts:42](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point3](#classespoint3md) |

**Returns:** number

___

### distanceTo

▸ **distanceTo**(`p`: [Point3](#classespoint3md)): number

*Defined in [geometry/point3.ts:51](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point3](#classespoint3md) |

**Returns:** number

___

### subtract

▸ **subtract**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/point3.ts:55](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

**Returns:** [Vec3](#classesvec3md)

___

### subtractWith

▸ **subtractWith**(`p`: [Point3](#classespoint3md)): [Vec3](#classesvec3md)

*Defined in [geometry/point3.ts:62](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L62)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point3](#classespoint3md) |

**Returns:** [Vec3](#classesvec3md)

___

### translate

▸ **translate**(`dx`: number, `dy`: number, `dz`: number): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:18](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`dx` | number |
`dy` | number |
`dz` | number |

**Returns:** [Point3](#classespoint3md)

___

### translateDirection

▸ **translateDirection**(`direction`: [Vec3](#classesvec3md), `length`: number): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:30](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`direction` | [Vec3](#classesvec3md) |
`length` | number |

**Returns:** [Point3](#classespoint3md)

___

### translateWith

▸ **translateWith**(`v`: [Vec3](#classesvec3md)): [Point3](#classespoint3md)

*Defined in [geometry/point3.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/point3.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec3](#classesvec3md) |

**Returns:** [Point3](#classespoint3md)


<a name="classesquaternionmd"></a>

# Class: Quaternion

Implementation of a quaternion (Hamilton's hypercomplex numbers).
Quaternions are used to represent rotations.
Quaternions are generally represented in the form:
<code>x + y*i + z*j + w*k</code>

**`see`** http://mathworld.wolfram.com/Quaternion.html

## Hierarchy

* **Quaternion**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [w](#w)
* [x](#x)
* [y](#y)
* [z](#z)

### Methods

* [angleTo](#angleto)
* [applyPoint3](#applypoint3)
* [applyVec3](#applyvec3)
* [clone](#clone)
* [conjugate](#conjugate)
* [dot](#dot)
* [inverse](#inverse)
* [length](#length)
* [lengthSquared](#lengthsquared)
* [multiply](#multiply)
* [normalize](#normalize)
* [premultiply](#premultiply)
* [slerp](#slerp)
* [fromAxisAngle](#fromaxisangle)
* [fromAxisAngleWith](#fromaxisanglewith)
* [fromEuler](#fromeuler)
* [fromEulerWith](#fromeulerwith)
* [fromMatrix](#frommatrix)
* [fromMatrix3](#frommatrix3)
* [fromMatrix4](#frommatrix4)
* [fromUnitVectors](#fromunitvectors)
* [identity](#identity)
* [multiplyQuaternions](#multiplyquaternions)
* [zero](#zero)

## Constructors

### constructor

\+ **new Quaternion**(`x`: number, `y`: number, `z`: number, `w`: number): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:23](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L23)*

creates a new quaternion

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | x coordinate |
`y` | number | y coordinate |
`z` | number | z coordinate |
`w` | number | w coordinate  |

**Returns:** [Quaternion](#classesquaternionmd)

## Properties

### w

•  **w**: number \| undefined

*Defined in [geometry/quaternion.ts:23](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L23)*

w coordinate

___

### x

•  **x**: number \| undefined

*Defined in [geometry/quaternion.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L17)*

x coordinate

___

### y

•  **y**: number \| undefined

*Defined in [geometry/quaternion.ts:19](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L19)*

y coordinate

___

### z

•  **z**: number \| undefined

*Defined in [geometry/quaternion.ts:21](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L21)*

z coordinate

## Methods

### angleTo

▸ **angleTo**(`q`: [Quaternion](#classesquaternionmd)): number

*Defined in [geometry/quaternion.ts:232](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L232)*

Returns the angle between this quaternion and quaternion q in radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the other quaternion  |

**Returns:** number

___

### applyPoint3

▸ **applyPoint3**(`p`: [Point3](#classespoint3md)): [Point3](#classespoint3md)

*Defined in [geometry/quaternion.ts:452](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L452)*

Applies this Quaternion transform to the given point p.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [Point3](#classespoint3md) | the point to apply  |

**Returns:** [Point3](#classespoint3md)

___

### applyVec3

▸ **applyVec3**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/quaternion.ts:423](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L423)*

Applies this Quaternion transform to the given vector v.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the vector to apply  |

**Returns:** [Vec3](#classesvec3md)

___

### clone

▸ **clone**(): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:49](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L49)*

Creates a new Quaternion with identical x, y, z and w properties to this one.

**Returns:** [Quaternion](#classesquaternionmd)

___

### conjugate

▸ **conjugate**(): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:255](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L255)*

Returns the rotational conjugate of this quaternion.
The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.

**Returns:** [Quaternion](#classesquaternionmd)

___

### dot

▸ **dot**(`q`: [Quaternion](#classesquaternionmd)): number

*Defined in [geometry/quaternion.ts:269](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L269)*

Calculates the dot product of quaternions q and this one.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the other quaternion  |

**Returns:** number

___

### inverse

▸ **inverse**(): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:247](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L247)*

Inverts this quaternion - calculates the conjugate. The quaternion is assumed to have unit length.

**Returns:** [Quaternion](#classesquaternionmd)

___

### length

▸ **length**(): number

*Defined in [geometry/quaternion.ts:283](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L283)*

Computes the Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector.

**Returns:** number

___

### lengthSquared

▸ **lengthSquared**(): number

*Defined in [geometry/quaternion.ts:276](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L276)*

Computes the squared Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector.

**Returns:** number

___

### multiply

▸ **multiply**(`q`: [Quaternion](#classesquaternionmd)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:314](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L314)*

Multiplies this quaternion by q and returns a new quaternion.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the other quaternion  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### normalize

▸ **normalize**(): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:293](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L293)*

Normalizes this quaternion - that is,
calculated the quaternion that performs the same rotation as this one,
but has length equal to 1.

**Returns:** [Quaternion](#classesquaternionmd)

___

### premultiply

▸ **premultiply**(`q`: [Quaternion](#classesquaternionmd)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:322](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L322)*

Pre-multiplies this quaternion by q and returns a new quaternion.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the other quaternion  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### slerp

▸ **slerp**(`q`: [Quaternion](#classesquaternionmd), `t`: number): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:352](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L352)*

Handles the spherical linear interpolation between quaternions.
t represents the amount of rotation between this quaternion (where t is 0) and q (where t is 1).
The result is return as a new quaternion.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | The other quaternion rotation |
`t` | number | interpolation factor in the closed interval [0, 1].  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromAxisAngle

▸ `Static`**fromAxisAngle**(`x`: number, `y`: number, `z`: number, `angle`: number): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L95)*

create a new quaternion from rotation specified by axis and angle.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination of the axis |
`y` | number | the y coordination of the axis |
`z` | number | the z coordination of the axis |
`angle` | number | the angle in radians  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromAxisAngleWith

▸ `Static`**fromAxisAngleWith**(`v`: [Vec3](#classesvec3md), `angle`: number): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:115](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L115)*

create a new quaternion from rotation specified by axis and angle.

**`see`** Quaternion.fromAxisAngle()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the axis is assumed to be normalized |
`angle` | number | the angle in radians |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromEuler

▸ `Static`**fromEuler**(`x`: number, `y`: number, `z`: number): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:59](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L59)*

creates a new quaternion from the rotation specified by the given euler angle in order (XYZ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the angle of the x axis in radians |
`y` | number | the angle of the y axis in radians |
`z` | number | the angle of the z axis in radians  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromEulerWith

▸ `Static`**fromEulerWith**(`v`: [Vec3](#classesvec3md)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:84](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L84)*

create a new quaternion from the rotation specified by the given euler angle from v.

**`see`** Quaternion.fromEuler()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the angles in radians |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromMatrix

▸ `Static` `Private`**fromMatrix**(`m11`: number, `m12`: number, `m13`: number, `m21`: number, `m22`: number, `m23`: number, `m31`: number, `m32`: number, `m33`: number): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:119](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L119)*

#### Parameters:

Name | Type |
------ | ------ |
`m11` | number |
`m12` | number |
`m13` | number |
`m21` | number |
`m22` | number |
`m23` | number |
`m31` | number |
`m32` | number |
`m33` | number |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromMatrix3

▸ `Static`**fromMatrix3**(`m`: [Matrix3](#classesmatrix3md)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:172](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L172)*

creates a new quaternion from the given matrix

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix3](#classesmatrix3md) | the matrix to create the quaternion  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromMatrix4

▸ `Static`**fromMatrix4**(`m`: [Matrix4](#classesmatrix4md)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:184](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L184)*

creates a new quaternion from the given matrix

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the matrix to create the quaternion  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### fromUnitVectors

▸ `Static`**fromUnitVectors**(`vFrom`: [Vec3](#classesvec3md), `vTo`: [Vec3](#classesvec3md)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:197](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L197)*

creates a new quaternion with a rotation to rotate a vector from the direction vector vFrom to direction vector vTo

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`vFrom` | [Vec3](#classesvec3md) | the from vector is assumed to be normalized |
`vTo` | [Vec3](#classesvec3md) | the to vector is assumed to be normalized  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### identity

▸ `Static`**identity**(): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:240](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L240)*

creates a new quaternion to the identity quaternion.
the quaternion represents <b>no rotation</b>.

**Returns:** [Quaternion](#classesquaternionmd)

___

### multiplyQuaternions

▸ `Static`**multiplyQuaternions**(`a`: [Quaternion](#classesquaternionmd), `b`: [Quaternion](#classesquaternionmd)): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:331](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L331)*

Multiplies both quaternions and returns a new quaternion.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | [Quaternion](#classesquaternionmd) | first quaternion |
`b` | [Quaternion](#classesquaternionmd) | second quaternion  |

**Returns:** [Quaternion](#classesquaternionmd)

___

### zero

▸ `Static`**zero**(): [Quaternion](#classesquaternionmd)

*Defined in [geometry/quaternion.ts:42](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/quaternion.ts#L42)*

creates a new quaternion (0.0, 0.0, 0.0, 1.0)

**Returns:** [Quaternion](#classesquaternionmd)


<a name="classesrandommd"></a>

# Class: Random

An instance of this class is used to generate pseudorandom numbers with `Math.random`.

## Hierarchy

* **Random**

## Index

### Methods

* [choice](#choice)
* [float](#float)
* [intN](#intn)
* [randomString](#randomstring)
* [rndStr](#rndstr)

## Methods

### choice

▸ **choice**\<T>(`array`: T[]): T \| undefined

*Defined in [random.ts:26](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/random.ts#L26)*

Return a random element from the given array or `undefined` if the array is empty

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | T[] | the array to choice a random element from  |

**Returns:** T \| undefined

___

### float

▸ **float**(): number

*Defined in [random.ts:9](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/random.ts#L9)*

Returns a pseudorandom number between 0 and 1.

**Returns:** number

___

### intN

▸ **intN**(`n`: number): number

*Defined in [random.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/random.ts#L17)*

Returns a pseudorandom number between 0 and and given `n`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`n` | number | the upper bound (exclusive). Must be positive.  |

**Returns:** number

___

### randomString

▸ **randomString**(`n`: number): string

*Defined in [random.ts:48](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/random.ts#L48)*

Returns a random string with the given length

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`n` | number | the length of random string to create  |

**Returns:** string

___

### rndStr

▸ **rndStr**(): string

*Defined in [random.ts:39](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/random.ts#L39)*

Returns a random string

**Returns:** string


<a name="classesraymd"></a>

# Class: Ray

A ray that emits from an origin in a certain direction.
This is used by the Raycaster to assist with raycasting.

## Hierarchy

* **Ray**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [direction](#direction)
* [origin](#origin)

### Methods

* [applyMatrix4](#applymatrix4)
* [applyQuaternion](#applyquaternion)
* [at](#at)
* [clone](#clone)
* [closestPointToPoint](#closestpointtopoint)
* [distanceSquaredToPoint](#distancesquaredtopoint)
* [distanceToPlane](#distancetoplane)
* [intersectPlane](#intersectplane)
* [intersectSphere](#intersectsphere)
* [intersectTriangle](#intersecttriangle)
* [intersectsPlane](#intersectsplane)
* [intersectsSphere](#intersectssphere)
* [lookAt](#lookat)
* [recast](#recast)
* [reflect](#reflect)
* [createFromTo](#createfromto)

## Constructors

### constructor

\+ **new Ray**(`origin`: [Vec3](#classesvec3md), `direction`: [Vec3](#classesvec3md)): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:18](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L18)*

Creates a new Ray.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`origin` | [Vec3](#classesvec3md) | the origin of the Ray |
`direction` | [Vec3](#classesvec3md) | The direction of the Ray  |

**Returns:** [Ray](#classesraymd)

## Properties

### direction

•  **direction**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/ray.ts:18](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L18)*

The direction of the Ray

___

### origin

•  **origin**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/ray.ts:16](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L16)*

the origin of the Ray

## Methods

### applyMatrix4

▸ **applyMatrix4**(`m`: [Matrix4](#classesmatrix4md)): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:98](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L98)*

Transform this Ray by the Matrix4.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the Matrix4 to apply to this Ray.  |

**Returns:** [Ray](#classesraymd)

___

### applyQuaternion

▸ **applyQuaternion**(`q`: [Quaternion](#classesquaternionmd)): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:108](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L108)*

Transform this Ray by the Quaternion.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the Quaternion to apply to this Ray.  |

**Returns:** [Ray](#classesraymd)

___

### at

▸ **at**(`t`: number): [Vec3](#classesvec3md)

*Defined in [geometry/ray.ts:44](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L44)*

Get a Vec3 that is a given distance along this Ray.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | the distance along the Ray to retrieve a position for.  |

**Returns:** [Vec3](#classesvec3md)

___

### clone

▸ **clone**(): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:33](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L33)*

Creates a new Ray with identical origin and direction to this one.

**Returns:** [Ray](#classesraymd)

___

### closestPointToPoint

▸ **closestPointToPoint**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/ray.ts:75](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L75)*

Get the point along this Ray that is closest to the Vec3 provided.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to get the closest approach to.  |

**Returns:** [Vec3](#classesvec3md)

___

### distanceSquaredToPoint

▸ **distanceSquaredToPoint**(`point`: [Vec3](#classesvec3md)): number

*Defined in [geometry/ray.ts:89](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L89)*

Get the squared distance of the closest approach between the Ray and the Vec3.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the Vec3 to compute a distance to.  |

**Returns:** number

___

### distanceToPlane

▸ **distanceToPlane**(`plane`: [Plane](#classesplanemd)): number \| undefined

*Defined in [geometry/ray.ts:118](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L118)*

Get the distance from origin to the Plane, or undefined if the Ray doesn't intersect the Plane.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`plane` | [Plane](#classesplanemd) | the Plane to get the distance to.  |

**Returns:** number \| undefined

___

### intersectPlane

▸ **intersectPlane**(`plane`: [Plane](#classesplanemd)): [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/ray.ts:142](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L142)*

Intersect this Ray with a Plane, returning the intersection point or undefined if there is no intersection.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`plane` | [Plane](#classesplanemd) | the Plane to intersect with.  |

**Returns:** [Vec3](#classesvec3md) \| undefined

___

### intersectSphere

▸ **intersectSphere**(`sphere`: [Sphere](#classesspheremd)): [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/ray.ts:173](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L173)*

Intersect this Ray with a Sphere, returning the intersection point or undefined if there is no intersection.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`sphere` | [Sphere](#classesspheremd) | the Sphere to intersect with.  |

**Returns:** [Vec3](#classesvec3md) \| undefined

___

### intersectTriangle

▸ **intersectTriangle**(`triangle`: [Triangle](#classestrianglemd), `backfaceCulling?`: boolean): [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/ray.ts:224](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L224)*

Intersect this Ray with a triangle, returning the intersection point or undefined if there is no intersection.

**`see`** http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`triangle` | [Triangle](#classestrianglemd) | the triangle to check |
`backfaceCulling?` | boolean | whether to use backface culling |

**Returns:** [Vec3](#classesvec3md) \| undefined

___

### intersectsPlane

▸ **intersectsPlane**(`plane`: [Plane](#classesplanemd)): boolean

*Defined in [geometry/ray.ts:155](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L155)*

Return true if this Ray intersects with the Plane.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`plane` | [Plane](#classesplanemd) | the Plane to intersect with.  |

**Returns:** boolean

___

### intersectsSphere

▸ **intersectsSphere**(`sphere`: [Sphere](#classesspheremd)): boolean

*Defined in [geometry/ray.ts:211](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L211)*

Return true if this Ray intersects with the Sphere.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`sphere` | [Sphere](#classesspheremd) | the Sphere to intersect with.  |

**Returns:** boolean

___

### lookAt

▸ **lookAt**(`v`: [Vec3](#classesvec3md)): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:55](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L55)*

The Vec3 to look at.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | Adjusts the direction of the ray to point at the vector in world coordinates.  |

**Returns:** [Ray](#classesraymd)

___

### recast

▸ **recast**(`t`: number): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L65)*

Shift the origin of this Ray along its direction by the distance given.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | The distance along the Ray to interpolate.  |

**Returns:** [Ray](#classesraymd)

___

### reflect

▸ **reflect**(`point`: [Vec3](#classesvec3md), `normal`: [Vec3](#classesvec3md)): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:291](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L291)*

Creates a new ray from the point as reflect of this direction vector off of plane orthogonal to normal.
Normal is assumed to have unit length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point for the origin |
`normal` | [Vec3](#classesvec3md) | the normal to the reflecting plane  |

**Returns:** [Ray](#classesraymd)

___

### createFromTo

▸ `Static`**createFromTo**(`from`: [Vec3](#classesvec3md), `to`: [Vec3](#classesvec3md)): [Ray](#classesraymd)

*Defined in [geometry/ray.ts:302](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/ray.ts#L302)*

creates a new ray from the given point to the given point

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`from` | [Vec3](#classesvec3md) | the start point |
`to` | [Vec3](#classesvec3md) | the end point  |

**Returns:** [Ray](#classesraymd)


<a name="classesspheremd"></a>

# Class: Sphere

A sphere defined by a center and radius.

## Hierarchy

* **Sphere**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [center](#center)
* [radius](#radius)

### Methods

* [applyMatrix4](#applymatrix4)
* [containsPoint](#containspoint)
* [distanceToPoint](#distancetopoint)
* [intersectRay](#intersectray)
* [intersectsPlane](#intersectsplane)
* [normalAt](#normalat)
* [translate](#translate)

## Constructors

### constructor

\+ **new Sphere**(`center`: [Vec3](#classesvec3md), `radius`: number): [Sphere](#classesspheremd)

*Defined in [geometry/sphere.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L14)*

Creates a new Sphere.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vec3](#classesvec3md) | the center of the sphere. |
`radius` | number | the radius of the sphere  |

**Returns:** [Sphere](#classesspheremd)

## Properties

### center

•  **center**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/sphere.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L12)*

A Vec3 defining the center of the sphere

___

### radius

•  **radius**: number \| undefined

*Defined in [geometry/sphere.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L14)*

The radius of the sphere.

## Methods

### applyMatrix4

▸ **applyMatrix4**(`m`: [Matrix4](#classesmatrix4md)): [Sphere](#classesspheremd)

*Defined in [geometry/sphere.ts:72](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L72)*

Transforms this sphere with the provided Matrix4.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the Matrix4 to apply  |

**Returns:** [Sphere](#classesspheremd)

___

### containsPoint

▸ **containsPoint**(`point`: [Vec3](#classesvec3md)): boolean

*Defined in [geometry/sphere.ts:30](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L30)*

Checks to see if the sphere contains the provided point inclusive of the surface of the sphere.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the Vec3 to be checked  |

**Returns:** boolean

___

### distanceToPoint

▸ **distanceToPoint**(`point`: [Vec3](#classesvec3md)): number

*Defined in [geometry/sphere.ts:39](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L39)*

Returns the closest distance from the boundary of the sphere to the point.
If the sphere contains the point, the distance will be negative.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the Vec3 to get the distance to  |

**Returns:** number

___

### intersectRay

▸ **intersectRay**(`ray`: [Ray](#classesraymd)): [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/sphere.ts:55](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L55)*

Intersect this Ray with this Sphere, returning the intersection point or undefined if there is no intersection.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ray` | [Ray](#classesraymd) | the ray to intersect with this sphere  |

**Returns:** [Vec3](#classesvec3md) \| undefined

___

### intersectsPlane

▸ **intersectsPlane**(`plane`: [Plane](#classesplanemd)): boolean

*Defined in [geometry/sphere.ts:47](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L47)*

Determines whether or not this sphere intersects a given plane.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`plane` | [Plane](#classesplanemd) | Plane to check for intersection against.  |

**Returns:** boolean

___

### normalAt

▸ **normalAt**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/sphere.ts:82](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L82)*

Returns the normal for the given point

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to get the normal for  |

**Returns:** [Vec3](#classesvec3md)

___

### translate

▸ **translate**(`offset`: [Vec3](#classesvec3md)): [Sphere](#classesspheremd)

*Defined in [geometry/sphere.ts:63](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/sphere.ts#L63)*

Translate the sphere's center by the provided offset Vec3.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`offset` | [Vec3](#classesvec3md) | the offset to translate the center  |

**Returns:** [Sphere](#classesspheremd)


<a name="classessplinecurve2md"></a>

# Class: SplineCurve2

Create a smooth 2d spline curve from a series of points.
Internally this uses Mathf.catmullRom() to create the curve.

## Hierarchy

* [Curve2](#classescurve2md)

  ↳ **SplineCurve2**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [points](#points)

### Methods

* [computeFrames](#computeframes)
* [getLength](#getlength)
* [getLengths](#getlengths)
* [getPoint](#getpoint)
* [getPointAt](#getpointat)
* [getPoints](#getpoints)
* [getSpacedPoints](#getspacedpoints)
* [getTangent](#gettangent)
* [getTangentAt](#gettangentat)
* [getUtoTmapping](#getutotmapping)

## Constructors

### constructor

\+ **new SplineCurve2**(`points`: [Vec2](#classesvec2md)[]): [SplineCurve2](#classessplinecurve2md)

*Overrides [Curve2](#classescurve2md).[constructor](#constructor)*

*Defined in [curves/spline-curve2.ts:9](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/spline-curve2.ts#L9)*

Creates the spline curve for 2d

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`points` | [Vec2](#classesvec2md)[] | An array of Vec2 points that define the curve.  |

**Returns:** [SplineCurve2](#classessplinecurve2md)

## Properties

### points

• `Private` `Readonly` **points**: [Vec2](#classesvec2md)[]

*Defined in [curves/spline-curve2.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/spline-curve2.ts#L15)*

An array of Vec2 points that define the curve.

## Methods

### computeFrames

▸ **computeFrames**(`segments`: number): [CurveFrame2](#classescurveframe2md)[]

*Inherited from [Curve2](#classescurve2md).[computeFrames](#computeframes)*

*Defined in [curves/curve2.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve2.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`segments` | number |

**Returns:** [CurveFrame2](#classescurveframe2md)[]

___

### getLength

▸ **getLength**(): number

*Inherited from [Curve](#classescurvemd).[getLength](#getlength)*

*Defined in [curves/curve.ts:85](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L85)*

Get total curve arc length.

**Returns:** number

___

### getLengths

▸ **getLengths**(`divisions?`: number): number[]

*Inherited from [Curve](#classescurvemd).[getLengths](#getlengths)*

*Defined in [curves/curve.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L95)*

Get list of cumulative segment lengths.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to cumulative segment of the curve. Default is 200.  |

**Returns:** number[]

___

### getPoint

▸ **getPoint**(`t`: number): [Vec2](#classesvec2md)

*Overrides [Curve](#classescurvemd).[getPoint](#getpoint)*

*Defined in [curves/spline-curve2.ts:19](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/spline-curve2.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`t` | number |

**Returns:** [Vec2](#classesvec2md)

___

### getPointAt

▸ **getPointAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getPointAt](#getpointat)*

*Defined in [curves/curve.ts:34](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L34)*

Returns a vector for a given position on the curve according to the arc length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getPoints

▸ **getPoints**(`divisions?`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getPoints](#getpoints)*

*Defined in [curves/curve.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L45)*

Get sequence of points using getPoint( t )

**`see`** Curve.getPoint()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions?` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getSpacedPoints

▸ **getSpacedPoints**(`divisions`: number): ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

*Inherited from [Curve](#classescurvemd).[getSpacedPoints](#getspacedpoints)*

*Defined in [curves/curve.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L65)*

Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`divisions` | number | number of pieces to divide the curve into. Default is 5.  |

**Returns:** ([Vec2](#classesvec2md) \| [Vec3](#classesvec3md))[]

___

### getTangent

▸ **getTangent**(`t`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangent](#gettangent)*

*Defined in [curves/curve.ts:185](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L185)*

Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation,
two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`t` | number | A position on the curve. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getTangentAt

▸ **getTangentAt**(`u`: number): [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

*Inherited from [Curve](#classescurvemd).[getTangentAt](#gettangentat)*

*Defined in [curves/curve.ts:205](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L205)*

Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | A position on the curve according to the arc length. Must be in the range [ 0, 1 ].  |

**Returns:** [Vec2](#classesvec2md) \| [Vec3](#classesvec3md)

___

### getUtoTmapping

▸ **getUtoTmapping**(`u`: number, `distance?`: number): number

*Inherited from [Curve](#classescurvemd).[getUtoTmapping](#getutotmapping)*

*Defined in [curves/curve.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/curve.ts#L128)*

Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ).
u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`u` | number | u in the range [0, 1] |
`distance?` | number |   |

**Returns:** number


<a name="classestransform2md"></a>

# Class: Transform2

[a c e]
[b d f]
[0 0 1]

## Hierarchy

* **Transform2**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [a](#a)
* [b](#b)
* [c](#c)
* [d](#d)
* [e](#e)
* [f](#f)

### Methods

* [clone](#clone)
* [det](#det)
* [inverse](#inverse)
* [multiply](#multiply)
* [rotate](#rotate)
* [rotateDegrees](#rotatedegrees)
* [scale](#scale)
* [scaleWith](#scalewith)
* [scaleX](#scalex)
* [scaleY](#scaley)
* [transform](#transform)
* [transformPoint](#transformpoint)
* [transformVec](#transformvec)
* [translate](#translate)
* [translateX](#translatex)
* [translateY](#translatey)
* [identity](#identity)

## Constructors

### constructor

\+ **new Transform2**(`a`: number, `b`: number, `c`: number, `d`: number, `e`: number, `f`: number): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`c` | number |
`d` | number |
`e` | number |
`f` | number |

**Returns:** [Transform2](#classestransform2md)

## Properties

### a

•  **a**: number \| undefined

*Defined in [geometry/transform2.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L12)*

___

### b

•  **b**: number \| undefined

*Defined in [geometry/transform2.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L13)*

___

### c

•  **c**: number \| undefined

*Defined in [geometry/transform2.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L14)*

___

### d

•  **d**: number \| undefined

*Defined in [geometry/transform2.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L15)*

___

### e

•  **e**: number \| undefined

*Defined in [geometry/transform2.ts:16](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L16)*

___

### f

•  **f**: number \| undefined

*Defined in [geometry/transform2.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L17)*

## Methods

### clone

▸ **clone**(): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:142](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L142)*

**Returns:** [Transform2](#classestransform2md)

___

### det

▸ **det**(): number

*Defined in [geometry/transform2.ts:53](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L53)*

**Returns:** number

___

### inverse

▸ **inverse**(): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:57](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L57)*

**Returns:** [Transform2](#classestransform2md)

___

### multiply

▸ **multiply**(`t`: [Transform2](#classestransform2md)): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:73](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`t` | [Transform2](#classestransform2md) |

**Returns:** [Transform2](#classestransform2md)

___

### rotate

▸ **rotate**(`theta`: number): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:128](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L128)*

#### Parameters:

Name | Type |
------ | ------ |
`theta` | number |

**Returns:** [Transform2](#classestransform2md)

___

### rotateDegrees

▸ **rotateDegrees**(`theta`: number): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:137](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L137)*

#### Parameters:

Name | Type |
------ | ------ |
`theta` | number |

**Returns:** [Transform2](#classestransform2md)

___

### scale

▸ **scale**(`sx`: number, `sy`: number): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:28](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`sx` | number |
`sy` | number |

**Returns:** [Transform2](#classestransform2md)

___

### scaleWith

▸ **scaleWith**(`v`: [Vec2](#classesvec2md)): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:49](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec2](#classesvec2md) |

**Returns:** [Transform2](#classestransform2md)

___

### scaleX

▸ **scaleX**(): number

*Defined in [geometry/transform2.ts:99](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L99)*

**Returns:** number

___

### scaleY

▸ **scaleY**(): number

*Defined in [geometry/transform2.ts:103](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L103)*

**Returns:** number

___

### transform

▸ **transform**(`x`: number, `y`: number): [Point2](#classespoint2md)

*Defined in [geometry/transform2.ts:84](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L84)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** [Point2](#classespoint2md)

___

### transformPoint

▸ **transformPoint**(`p`: [Point2](#classespoint2md)): [Point2](#classespoint2md)

*Defined in [geometry/transform2.ts:95](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L95)*

#### Parameters:

Name | Type |
------ | ------ |
`p` | [Point2](#classespoint2md) |

**Returns:** [Point2](#classespoint2md)

___

### transformVec

▸ **transformVec**(`v`: [Vec2](#classesvec2md)): [Vec2](#classesvec2md)

*Defined in [geometry/transform2.ts:90](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L90)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | [Vec2](#classesvec2md) |

**Returns:** [Vec2](#classesvec2md)

___

### translate

▸ **translate**(`dx`: number, `dy`: number): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:121](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L121)*

#### Parameters:

Name | Type |
------ | ------ |
`dx` | number |
`dy` | number |

**Returns:** [Transform2](#classestransform2md)

___

### translateX

▸ **translateX**(): number

*Defined in [geometry/transform2.ts:107](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L107)*

**Returns:** number

___

### translateY

▸ **translateY**(): number

*Defined in [geometry/transform2.ts:111](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L111)*

**Returns:** number

___

### identity

▸ `Static`**identity**(): [Transform2](#classestransform2md)

*Defined in [geometry/transform2.ts:115](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/transform2.ts#L115)*

**Returns:** [Transform2](#classestransform2md)


<a name="classestrianglemd"></a>

# Class: Triangle

A geometric triangle as defined by three Vec3s representing its three corners.

## Hierarchy

* **Triangle**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [a](#a)
* [b](#b)
* [c](#c)

### Methods

* [clone](#clone)
* [closestPointToPoint](#closestpointtopoint)
* [containsPoint](#containspoint)
* [getArea](#getarea)
* [getBarycoord](#getbarycoord)
* [getMidpoint](#getmidpoint)
* [getPlane](#getplane)
* [getUV](#getuv)
* [intersectRay](#intersectray)
* [isFrontFacing](#isfrontfacing)
* [normalAt](#normalat)
* [calculateBarycoord](#calculatebarycoord)
* [calculateNormal](#calculatenormal)
* [calculateUV](#calculateuv)
* [frontFacing](#frontfacing)
* [isContainsPoint](#iscontainspoint)

## Constructors

### constructor

\+ **new Triangle**(`a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md)): [Triangle](#classestrianglemd)

*Defined in [geometry/triangle.ts:16](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L16)*

Creates a new Triangle.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | [Vec3](#classesvec3md) | the first corner of the triangle |
`b` | [Vec3](#classesvec3md) | the second corner of the triangle |
`c` | [Vec3](#classesvec3md) | the final corner of the triangle  |

**Returns:** [Triangle](#classestrianglemd)

## Properties

### a

•  **a**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/triangle.ts:12](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L12)*

the first corner of the triangle

___

### b

•  **b**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/triangle.ts:14](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L14)*

the second corner of the triangle

___

### c

•  **c**: [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/triangle.ts:16](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L16)*

the final corner of the triangle

## Methods

### clone

▸ **clone**(): [Triangle](#classestrianglemd)

*Defined in [geometry/triangle.ts:33](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L33)*

Returns a new triangle with the same a, b and c properties as this one.

**Returns:** [Triangle](#classestrianglemd)

___

### closestPointToPoint

▸ **closestPointToPoint**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:200](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L200)*

Returns the closest point on the triangle to point.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to get the closest to  |

**Returns:** [Vec3](#classesvec3md)

___

### containsPoint

▸ **containsPoint**(`point`: [Vec3](#classesvec3md)): boolean

*Defined in [geometry/triangle.ts:182](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L182)*

Returns true if the passed point, when projected onto the plane of the triangle, lies within the triangle.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to check  |

**Returns:** boolean

___

### getArea

▸ **getArea**(): number

*Defined in [geometry/triangle.ts:125](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L125)*

Return the area of the triangle.

**Returns:** number

___

### getBarycoord

▸ **getBarycoord**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:168](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L168)*

Return a barycentric coordinate from the given vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point for the barycentric coordinate  |

**Returns:** [Vec3](#classesvec3md)

___

### getMidpoint

▸ **getMidpoint**(): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:139](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L139)*

Calculate the midpoint of the triangle.

**Returns:** [Vec3](#classesvec3md)

___

### getPlane

▸ **getPlane**(): [Plane](#classesplanemd)

*Defined in [geometry/triangle.ts:159](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L159)*

Calculate a plane based on the triangle.

**Returns:** [Plane](#classesplanemd)

___

### getUV

▸ **getUV**(`point`: [Vec3](#classesvec3md), `uv1`: [Vec3](#classesvec3md), `uv2`: [Vec3](#classesvec3md), `uv3`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:173](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L173)*

#### Parameters:

Name | Type |
------ | ------ |
`point` | [Vec3](#classesvec3md) |
`uv1` | [Vec3](#classesvec3md) |
`uv2` | [Vec3](#classesvec3md) |
`uv3` | [Vec3](#classesvec3md) |

**Returns:** [Vec3](#classesvec3md)

___

### intersectRay

▸ **intersectRay**(`ray`: [Ray](#classesraymd)): [Vec3](#classesvec3md) \| undefined

*Defined in [geometry/triangle.ts:280](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L280)*

Intersect this Ray with this Triangle, returning the intersection point or undefined if there is no intersection.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ray` | [Ray](#classesraymd) | the ray to intersect with this triangle  |

**Returns:** [Vec3](#classesvec3md) \| undefined

___

### isFrontFacing

▸ **isFrontFacing**(`direction`: [Vec3](#classesvec3md)): boolean

*Defined in [geometry/triangle.ts:191](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L191)*

checks if the triangle is front facing

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`direction` | [Vec3](#classesvec3md) | the direction to check  |

**Returns:** boolean

___

### normalAt

▸ **normalAt**(`point`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:151](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L151)*

Calculate the normal vector of the triangle at the given point

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`point` | [Vec3](#classesvec3md) | the point to calculate the normal  |

**Returns:** [Vec3](#classesvec3md)

___

### calculateBarycoord

▸ `Static`**calculateBarycoord**(`point`: [Vec3](#classesvec3md), `a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:64](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L64)*

the method to calculate barycentric coordinates

**`see`** http://www.blackpawn.com/texts/pointinpoly/default.html

#### Parameters:

Name | Type |
------ | ------ |
`point` | [Vec3](#classesvec3md) |
`a` | [Vec3](#classesvec3md) |
`b` | [Vec3](#classesvec3md) |
`c` | [Vec3](#classesvec3md) |

**Returns:** [Vec3](#classesvec3md)

___

### calculateNormal

▸ `Static`**calculateNormal**(`a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:42](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`a` | [Vec3](#classesvec3md) |
`b` | [Vec3](#classesvec3md) |
`c` | [Vec3](#classesvec3md) |

**Returns:** [Vec3](#classesvec3md)

___

### calculateUV

▸ `Static`**calculateUV**(`point`: [Vec3](#classesvec3md), `a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md), `uv1`: [Vec3](#classesvec3md), `uv2`: [Vec3](#classesvec3md), `uv3`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/triangle.ts:100](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L100)*

#### Parameters:

Name | Type |
------ | ------ |
`point` | [Vec3](#classesvec3md) |
`a` | [Vec3](#classesvec3md) |
`b` | [Vec3](#classesvec3md) |
`c` | [Vec3](#classesvec3md) |
`uv1` | [Vec3](#classesvec3md) |
`uv2` | [Vec3](#classesvec3md) |
`uv3` | [Vec3](#classesvec3md) |

**Returns:** [Vec3](#classesvec3md)

___

### frontFacing

▸ `Static`**frontFacing**(`a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md), `direction`: [Vec3](#classesvec3md)): boolean

*Defined in [geometry/triangle.ts:111](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L111)*

#### Parameters:

Name | Type |
------ | ------ |
`a` | [Vec3](#classesvec3md) |
`b` | [Vec3](#classesvec3md) |
`c` | [Vec3](#classesvec3md) |
`direction` | [Vec3](#classesvec3md) |

**Returns:** boolean

___

### isContainsPoint

▸ `Static`**isContainsPoint**(`point`: [Vec3](#classesvec3md), `a`: [Vec3](#classesvec3md), `b`: [Vec3](#classesvec3md), `c`: [Vec3](#classesvec3md)): boolean

*Defined in [geometry/triangle.ts:94](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/triangle.ts#L94)*

#### Parameters:

Name | Type |
------ | ------ |
`point` | [Vec3](#classesvec3md) |
`a` | [Vec3](#classesvec3md) |
`b` | [Vec3](#classesvec3md) |
`c` | [Vec3](#classesvec3md) |

**Returns:** boolean


<a name="classesvec2md"></a>

# Class: Vec2

Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y)

## Hierarchy

* **Vec2**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [x](#x)
* [y](#y)

### Methods

* [add](#add)
* [addWith](#addwith)
* [angle](#angle)
* [angleWith](#anglewith)
* [applyMatrix3](#applymatrix3)
* [clone](#clone)
* [cross](#cross)
* [crossWith](#crosswith)
* [distance](#distance)
* [distanceSquared](#distancesquared)
* [distanceSquaredTo](#distancesquaredto)
* [distanceTo](#distanceto)
* [divide](#divide)
* [divideWith](#dividewith)
* [dot](#dot)
* [dotWith](#dotwith)
* [inverse](#inverse)
* [length](#length)
* [lengthSquared](#lengthsquared)
* [multiply](#multiply)
* [multiplyWith](#multiplywith)
* [normalize](#normalize)
* [perpendicularCCW](#perpendicularccw)
* [perpendicularCW](#perpendicularcw)
* [rotateAround](#rotatearound)
* [rotateAroundWith](#rotatearoundwith)
* [scale](#scale)
* [subtract](#subtract)
* [subtractWith](#subtractwith)
* [random](#random)
* [xAxis](#xaxis)
* [yAxis](#yaxis)

## Constructors

### constructor

\+ **new Vec2**(`x`: number, `y`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L15)*

creates a new 2D vector

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value of the vector |
`y` | number | the y value of the vector  |

**Returns:** [Vec2](#classesvec2md)

## Properties

### x

•  **x**: number \| undefined

*Defined in [geometry/vec2.ts:11](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L11)*

the x value of this vector. Default is 0.

___

### y

•  **y**: number \| undefined

*Defined in [geometry/vec2.ts:15](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L15)*

the y value of this vector. Default is 0.

## Methods

### add

▸ **add**(`x`: number, `y`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:132](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L132)*

Adds x and y to this vector

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** [Vec2](#classesvec2md)

___

### addWith

▸ **addWith**(`v`: [Vec2](#classesvec2md)): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:143](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L143)*

Adds v to this vector.

**`see`** Vec2.add()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to add  |

**Returns:** [Vec2](#classesvec2md)

___

### angle

▸ **angle**(`x`: number, `y`: number): number

*Defined in [geometry/vec2.ts:99](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L99)*

Calculates the angle between this vector and given x and y by using the dot product.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** number

___

### angleWith

▸ **angleWith**(`v`: [Vec2](#classesvec2md)): number

*Defined in [geometry/vec2.ts:113](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L113)*

Calculates the angle between this vector and given x and y by using the dot product.

**`see`** Vec2.angle()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to calculate the angle between  |

**Returns:** number

___

### applyMatrix3

▸ **applyMatrix3**(`m`: [Matrix3](#classesmatrix3md)): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:253](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L253)*

#### Parameters:

Name | Type |
------ | ------ |
`m` | [Matrix3](#classesmatrix3md) |

**Returns:** [Vec2](#classesvec2md)

___

### clone

▸ **clone**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:219](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L219)*

Returns a new 2D vector with the same x and y values as this one.

**Returns:** [Vec2](#classesvec2md)

___

### cross

▸ **cross**(`x`: number, `y`: number): number

*Defined in [geometry/vec2.ts:52](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L52)*

Calculates the cross product of this vector and given x and y.
Note that a 'cross-product' in 2D is not well-defined.
This function computes a geometric cross-product often used in 2D graphics

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** number

___

### crossWith

▸ **crossWith**(`v`: [Vec2](#classesvec2md)): number

*Defined in [geometry/vec2.ts:61](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L61)*

Calculates the cross product of this vector and v.

**`see`** Vec2.cross()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to calculate the cross product  |

**Returns:** number

___

### distance

▸ **distance**(`x`: number, `y`: number): number

*Defined in [geometry/vec2.ts:326](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L326)*

Computes the distance from this vector to the given parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination  |

**Returns:** number

___

### distanceSquared

▸ **distanceSquared**(`x`: number, `y`: number): number

*Defined in [geometry/vec2.ts:306](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L306)*

Computes the squared distance from this vector to the given parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination  |

**Returns:** number

___

### distanceSquaredTo

▸ **distanceSquaredTo**(`p`: [Vec2](#classesvec2md)): number

*Defined in [geometry/vec2.ts:317](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L317)*

Computes the squared distance from this vector to the given vector p.

**`see`** Vec2.distanceSquared()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [Vec2](#classesvec2md) | the other vector |

**Returns:** number

___

### distanceTo

▸ **distanceTo**(`p`: [Vec2](#classesvec2md)): number

*Defined in [geometry/vec2.ts:336](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L336)*

Computes the distance from this vector to the given vector p.

**`see`** Vec2.distance()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [Vec2](#classesvec2md) | the other vector |

**Returns:** number

___

### divide

▸ **divide**(`x`: number, `y`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:172](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L172)*

Divides this vector by x and y.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** [Vec2](#classesvec2md)

___

### divideWith

▸ **divideWith**(`v`: [Vec2](#classesvec2md)): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:183](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L183)*

Divides this vector by v.

**`see`** Vec2.divide()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to divide  |

**Returns:** [Vec2](#classesvec2md)

___

### dot

▸ **dot**(`x`: number, `y`: number): number

*Defined in [geometry/vec2.ts:32](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L32)*

Calculates the dot product of this vector and given x and y

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** number

___

### dotWith

▸ **dotWith**(`v`: [Vec2](#classesvec2md)): number

*Defined in [geometry/vec2.ts:41](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L41)*

Calculates the dot product of this vector and v.

**`see`** Vec2.dot()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to calculate the dot product  |

**Returns:** number

___

### inverse

▸ **inverse**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:210](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L210)*

Inverts this vector - i.e. sets x = -x and y = -y.

**Returns:** [Vec2](#classesvec2md)

___

### length

▸ **length**(): number

*Defined in [geometry/vec2.ts:76](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L76)*

Computes the Euclidean length (straight-line length) from (0, 0) to (x, y).

**Returns:** number

___

### lengthSquared

▸ **lengthSquared**(): number

*Defined in [geometry/vec2.ts:69](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L69)*

Computes the square of the Euclidean length (straight-line length) from (0, 0) to (x, y).
If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.

**Returns:** number

___

### multiply

▸ **multiply**(`x`: number, `y`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:152](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L152)*

Multiplies this vector by x and y.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** [Vec2](#classesvec2md)

___

### multiplyWith

▸ **multiplyWith**(`v`: [Vec2](#classesvec2md)): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:163](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L163)*

Multiplies this vector by v.

**`see`** Vec2.multiply()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to multiply  |

**Returns:** [Vec2](#classesvec2md)

___

### normalize

▸ **normalize**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:84](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L84)*

Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.

**Returns:** [Vec2](#classesvec2md)

___

### perpendicularCCW

▸ **perpendicularCCW**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:237](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L237)*

Returns an perpendicular 2D vector in counterclockwise direction

**Returns:** [Vec2](#classesvec2md)

___

### perpendicularCW

▸ **perpendicularCW**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:228](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L228)*

Returns an perpendicular 2D vector in clockwise direction

**Returns:** [Vec2](#classesvec2md)

___

### rotateAround

▸ **rotateAround**(`cx`: number, `cy`: number, `angle`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:263](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L263)*

Rotates this vector around center cx and cy by given angle in radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cx` | number | the x value of the center point around which to rotate. |
`cy` | number | the y value of the center point around which to rotate. |
`angle` | number | the angle to rotate, in radians.  |

**Returns:** [Vec2](#classesvec2md)

___

### rotateAroundWith

▸ **rotateAroundWith**(`center`: [Vec2](#classesvec2md), `angle`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:281](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L281)*

Rotates this vector around center by given angle in radians.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`center` | [Vec2](#classesvec2md) | the point around which to rotate. |
`angle` | number | the angle to rotate, in radians.  |

**Returns:** [Vec2](#classesvec2md)

___

### scale

▸ **scale**(`s`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:121](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L121)*

Multiplies this vector by scalar s.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`s` | number | the scalar  |

**Returns:** [Vec2](#classesvec2md)

___

### subtract

▸ **subtract**(`x`: number, `y`: number): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:192](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L192)*

Subtracts x and y from this vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value |
`y` | number | the y value  |

**Returns:** [Vec2](#classesvec2md)

___

### subtractWith

▸ **subtractWith**(`v`: [Vec2](#classesvec2md)): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:203](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L203)*

Subtracts v from this vector.

**`see`** Vec2.subtract()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](#classesvec2md) | the other vector to subtract  |

**Returns:** [Vec2](#classesvec2md)

___

### random

▸ `Static`**random**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:246](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L246)*

Returns a new 2D vector, where each component of the vector are set to a pseudo-random value between 0 and 1, excluding 1.

**Returns:** [Vec2](#classesvec2md)

___

### xAxis

▸ `Static`**xAxis**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:288](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L288)*

Returns a unit vector for the x axis (1.0, 0.0)

**Returns:** [Vec2](#classesvec2md)

___

### yAxis

▸ `Static`**yAxis**(): [Vec2](#classesvec2md)

*Defined in [geometry/vec2.ts:296](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec2.ts#L296)*

Returns a unit vector for the y axis (0.0, 1.0)

**Returns:** [Vec2](#classesvec2md)


<a name="classesvec3md"></a>

# Class: Vec3

Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y, and z).

## Hierarchy

* **Vec3**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [x](#x)
* [y](#y)
* [z](#z)

### Methods

* [add](#add)
* [addScaledVector](#addscaledvector)
* [addWith](#addwith)
* [applyMatrix3](#applymatrix3)
* [applyMatrix4](#applymatrix4)
* [applyQuaternion](#applyquaternion)
* [clone](#clone)
* [cross](#cross)
* [crossWith](#crosswith)
* [distance](#distance)
* [distanceSquared](#distancesquared)
* [distanceSquaredTo](#distancesquaredto)
* [distanceTo](#distanceto)
* [divide](#divide)
* [divideWith](#dividewith)
* [dot](#dot)
* [dotWith](#dotwith)
* [inverse](#inverse)
* [length](#length)
* [lengthSquared](#lengthsquared)
* [multiply](#multiply)
* [multiplyWith](#multiplywith)
* [normalize](#normalize)
* [orthogonal](#orthogonal)
* [reflect](#reflect)
* [scale](#scale)
* [subtract](#subtract)
* [subtractWith](#subtractwith)
* [random](#random)
* [xAxis](#xaxis)
* [yAxis](#yaxis)
* [zAxis](#zaxis)
* [zero](#zero)

## Constructors

### constructor

\+ **new Vec3**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:21](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L21)*

Creates a new 3D vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x value of the vector. |
`y` | number | the y value of the vector. |
`z` | number | the z value of the vector.  |

**Returns:** [Vec3](#classesvec3md)

## Properties

### x

•  **x**: number \| undefined

*Defined in [geometry/vec3.ts:13](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L13)*

the x value of this vector. Default is 0.

___

### y

•  **y**: number \| undefined

*Defined in [geometry/vec3.ts:17](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L17)*

the y value of this vector. Default is 0.

___

### z

•  **z**: number \| undefined

*Defined in [geometry/vec3.ts:21](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L21)*

the z value of this vector. Default is 0.

## Methods

### add

▸ **add**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:124](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L124)*

adds this vector and the given parameters to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** [Vec3](#classesvec3md)

___

### addScaledVector

▸ **addScaledVector**(`v`: [Vec3](#classesvec3md), `s`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:147](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L147)*

Adds this vector and the multiple of v and s to a new vector vector.

**`see`** Vec3.scale()

**`see`** Vec3.addWith()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the vector to scale |
`s` | number | the scale factor |

**Returns:** [Vec3](#classesvec3md)

___

### addWith

▸ **addWith**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:136](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L136)*

adds this vector and v to a new vector vector.

**`see`** Vec3.add()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the other vector |

**Returns:** [Vec3](#classesvec3md)

___

### applyMatrix3

▸ **applyMatrix3**(`m`: [Matrix3](#classesmatrix3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:255](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L255)*

Multiplies this vector and m to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix3](#classesmatrix3md) | the matrix to multiply  |

**Returns:** [Vec3](#classesvec3md)

___

### applyMatrix4

▸ **applyMatrix4**(`m`: [Matrix4](#classesmatrix4md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:263](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L263)*

Multiplies this vector and m to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`m` | [Matrix4](#classesmatrix4md) | the matrix to multiply  |

**Returns:** [Vec3](#classesvec3md)

___

### applyQuaternion

▸ **applyQuaternion**(`q`: [Quaternion](#classesquaternionmd)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:271](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L271)*

Multiplies this vector and q to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`q` | [Quaternion](#classesquaternionmd) | the quaternion to multiply  |

**Returns:** [Vec3](#classesvec3md)

___

### clone

▸ **clone**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:232](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L232)*

Returns a new vector3 with the same x, y and z values as this one.

**Returns:** [Vec3](#classesvec3md)

___

### cross

▸ **cross**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:89](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L89)*

returns the cross product of this vec3 and the given parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** [Vec3](#classesvec3md)

___

### crossWith

▸ **crossWith**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:102](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L102)*

returns the cross product of this vec3 and v.

**`see`** Vec3.cross()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the other vector |

**Returns:** [Vec3](#classesvec3md)

___

### distance

▸ **distance**(`x`: number, `y`: number, `z`: number): number

*Defined in [geometry/vec3.ts:303](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L303)*

Computes the distance from this vector to the given parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** number

___

### distanceSquared

▸ **distanceSquared**(`x`: number, `y`: number, `z`: number): number

*Defined in [geometry/vec3.ts:281](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L281)*

Computes the squared distance from this vector to the given parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** number

___

### distanceSquaredTo

▸ **distanceSquaredTo**(`p`: [Vec3](#classesvec3md)): number

*Defined in [geometry/vec3.ts:293](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L293)*

Computes the squared distance from this vector to the given vector p.

**`see`** Vec3.distanceSquared()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [Vec3](#classesvec3md) | the other vector |

**Returns:** number

___

### distanceTo

▸ **distanceTo**(`p`: [Vec3](#classesvec3md)): number

*Defined in [geometry/vec3.ts:313](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L313)*

Computes the distance from this vector to the given vector p.

**`see`** Vec3.distance()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`p` | [Vec3](#classesvec3md) | the other vector |

**Returns:** number

___

### divide

▸ **divide**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:181](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L181)*

divide this vector and the given parameters to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** [Vec3](#classesvec3md)

___

### divideWith

▸ **divideWith**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:193](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L193)*

divide this vector and v to a new vector vector.

**`see`** Vec3.divide()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the other vector |

**Returns:** [Vec3](#classesvec3md)

___

### dot

▸ **dot**(`x`: number, `y`: number, `z`: number): number

*Defined in [geometry/vec3.ts:56](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L56)*

Calculate the dot product of this vector and the given parameters.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** number

___

### dotWith

▸ **dotWith**(`v`: [Vec3](#classesvec3md)): number

*Defined in [geometry/vec3.ts:65](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L65)*

Calculate the dot product of this vector and v.

**`see`** Vec3.dot()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the other vector |

**Returns:** number

___

### inverse

▸ **inverse**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:222](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L222)*

Inverts this vector - i.e. sets x = -x, y = -y and z = -z.

**Returns:** [Vec3](#classesvec3md)

___

### length

▸ **length**(): number

*Defined in [geometry/vec3.ts:45](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L45)*

Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).

**Returns:** number

___

### lengthSquared

▸ **lengthSquared**(): number

*Defined in [geometry/vec3.ts:38](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L38)*

Computes the square of the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).

**Returns:** number

___

### multiply

▸ **multiply**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:159](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L159)*

multiply this vector and the given parameters to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** [Vec3](#classesvec3md)

___

### multiplyWith

▸ **multiplyWith**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:171](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L171)*

multiply this vector and v to a new vector vector.

**`see`** Vec3.multiply()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the other vector |

**Returns:** [Vec3](#classesvec3md)

___

### normalize

▸ **normalize**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:72](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L72)*

Convert this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.

**Returns:** [Vec3](#classesvec3md)

___

### orthogonal

▸ **orthogonal**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:351](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L351)*

creates new orthogonal vector to this vector

**Returns:** [Vec3](#classesvec3md)

___

### reflect

▸ **reflect**(`normal`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:366](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L366)*

Reflect this vector off of plane orthogonal to normal. Normal is assumed to have unit length.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`normal` | [Vec3](#classesvec3md) | the normal to the reflecting plane  |

**Returns:** [Vec3](#classesvec3md)

___

### scale

▸ **scale**(`s`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:110](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L110)*

Multiplies this vector and the scalar s to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`s` | number | the scalar  |

**Returns:** [Vec3](#classesvec3md)

___

### subtract

▸ **subtract**(`x`: number, `y`: number, `z`: number): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:203](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L203)*

subtract this vector and the given parameters to a new vector vector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the x coordination |
`y` | number | the y coordination |
`z` | number | the z coordination  |

**Returns:** [Vec3](#classesvec3md)

___

### subtractWith

▸ **subtractWith**(`v`: [Vec3](#classesvec3md)): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:215](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L215)*

subtract this vector and v to a new vector vector.

**`see`** Vec3.subtract()

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec3](#classesvec3md) | the other vector |

**Returns:** [Vec3](#classesvec3md)

___

### random

▸ `Static`**random**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:243](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L243)*

Creates a new vector with each component of this vector to a pseudo-random value between 0 and 1, excluding 1.

**Returns:** [Vec3](#classesvec3md)

___

### xAxis

▸ `Static`**xAxis**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:320](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L320)*

Returns a unit vector for the x axis (1.0, 0.0, 0.0)

**Returns:** [Vec3](#classesvec3md)

___

### yAxis

▸ `Static`**yAxis**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:328](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L328)*

Returns a unit vector for the y axis (0.0, 1.0, 0.0)

**Returns:** [Vec3](#classesvec3md)

___

### zAxis

▸ `Static`**zAxis**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:336](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L336)*

Returns a unit vector for the z axis (0.0, 0.0, 1.0)

**Returns:** [Vec3](#classesvec3md)

___

### zero

▸ `Static`**zero**(): [Vec3](#classesvec3md)

*Defined in [geometry/vec3.ts:344](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/geometry/vec3.ts#L344)*

Returns a new vector with 0.0 for x, y and z

**Returns:** [Vec3](#classesvec3md)


<a name="enumscatmullromtypemd"></a>

# Enumeration: CatmullRomType

## Index

### Enumeration members

* [CatmullRom](#catmullrom)
* [Centripetal](#centripetal)
* [Chordal](#chordal)

## Enumeration members

### CatmullRom

•  **CatmullRom**:  = "catmullrom"

*Defined in [curves/catmull-rom-type.ts:4](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-type.ts#L4)*

___

### Centripetal

•  **Centripetal**:  = "centripetal"

*Defined in [curves/catmull-rom-type.ts:2](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-type.ts#L2)*

___

### Chordal

•  **Chordal**:  = "chordal"

*Defined in [curves/catmull-rom-type.ts:3](https://github.com/dayaftereh/squishy/blob/37e4406/src/worker/execution/node-executor/script/math/curves/catmull-rom-type.ts#L3)*
