
<a name="classessquishyiomd"></a>

# Class: SquishyIO

## Hierarchy

* **SquishyIO**

## Index

### Properties

* [DELIMITER](#delimiter)
* [NEWLINE](#newline)
* [NF](#nf)
* [XML\_MIME\_TYPE](#xml_mime_type)

### Methods

* [csvParse](#csvparse)
* [csvStringify](#csvstringify)
* [numberToLocal](#numbertolocal)
* [stlParse](#stlparse)

## Properties

### DELIMITER

▪ `Static` **DELIMITER**: string = ";"

*Defined in [io/squishy-io.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L7)*

___

### NEWLINE

▪ `Static` **NEWLINE**: string = ""

*Defined in [io/squishy-io.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L6)*

___

### NF

▪ `Static` **NF**: NumberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 20 })

*Defined in [io/squishy-io.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L9)*

___

### XML\_MIME\_TYPE

▪ `Static` **XML\_MIME\_TYPE**: string = "application/xml"

*Defined in [io/squishy-io.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L8)*

## Methods

### csvParse

▸ **csvParse**(`content`: string \| undefined, `delimiter?`: string): string[][]

*Defined in [io/squishy-io.ts:40](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`content` | string \| undefined |
`delimiter?` | string |

**Returns:** string[][]

___

### csvStringify

▸ **csvStringify**(`data`: unknown[][] \| undefined, `toString?`: (x: unknown) => string, `delimiter?`: string, `newline?`: string): string

*Defined in [io/squishy-io.ts:13](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | unknown[][] \| undefined |
`toString?` | (x: unknown) => string |
`delimiter?` | string |
`newline?` | string |

**Returns:** string

___

### numberToLocal

▸ **numberToLocal**(`x`: number): string

*Defined in [io/squishy-io.ts:77](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L77)*

converts the given number to a string based on the local browser language formatting

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`x` | number | the number to format  |

**Returns:** string

___

### stlParse

▸ **stlParse**(`data`: ArrayBuffer, `onProgress?`: (p: number) => void): [STLResult](#interfacesstlresultmd)

*Defined in [io/squishy-io.ts:67](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/squishy-io.ts#L67)*

parse the given data as stl ascii or binary file

**`see`** https://en.wikipedia.org/wiki/STL_(file_format)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | ArrayBuffer | the data to parse |
`onProgress?` | (p: number) => void | (optional) the callback for the progress completed |

**Returns:** [STLResult](#interfacesstlresultmd)


<a name="classesstlloadermd"></a>

# Class: STLLoader

STL file loader for STL ASCII files, as created by Solidworks and other CAD programs.
Supports both binary and ASCII encoded files, with automatic detection of type.

<b>Limitations:</b>
> Binary decoding supports "Magics" color format [Color_in_binary_STL](http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL).
> There is perhaps some question as to how valid it is to always assume little-endian-ness.
> ASCII decoding assumes file is UTF-8.

## Hierarchy

* **STLLoader**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [onProgress](#onprogress)
* [STL\_COLOR\_BYTES](#stl_color_bytes)
* [STL\_HEADER\_BYTES](#stl_header_bytes)

### Methods

* [emitProgress](#emitprogress)
* [isBinary](#isbinary)
* [matchBytesAt](#matchbytesat)
* [parse](#parse)
* [parseASCII](#parseascii)
* [parseBinary](#parsebinary)

## Constructors

### constructor

\+ **new STLLoader**(`onProgress?`: (p: number) => void): [STLLoader](#classesstlloadermd)

*Defined in [io/stl/stl-loader.ts:16](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L16)*

creates a new STLLoader

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`onProgress?` | (p: number) => void | (optional) the callback for the progress completed  |

**Returns:** [STLLoader](#classesstlloadermd)

## Properties

### onProgress

• `Private` `Optional` `Readonly` **onProgress**: (p: number) => void

*Defined in [io/stl/stl-loader.ts:22](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L22)*

(optional) the callback for the progress completed

___

### STL\_COLOR\_BYTES

▪ `Static` `Private` **STL\_COLOR\_BYTES**: number = 10

*Defined in [io/stl/stl-loader.ts:15](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L15)*

___

### STL\_HEADER\_BYTES

▪ `Static` `Private` **STL\_HEADER\_BYTES**: number = 80

*Defined in [io/stl/stl-loader.ts:16](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L16)*

## Methods

### emitProgress

▸ `Private`**emitProgress**(`n`: number): void

*Defined in [io/stl/stl-loader.ts:257](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L257)*

#### Parameters:

Name | Type |
------ | ------ |
`n` | number |

**Returns:** void

___

### isBinary

▸ `Private`**isBinary**(`data`: ArrayBuffer): boolean

*Defined in [io/stl/stl-loader.ts:43](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L43)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | ArrayBuffer |

**Returns:** boolean

___

### matchBytesAt

▸ `Private`**matchBytesAt**(`query`: number[], `buf`: Buffer, `offset`: number): boolean

*Defined in [io/stl/stl-loader.ts:79](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L79)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | number[] |
`buf` | Buffer |
`offset` | number |

**Returns:** boolean

___

### parse

▸ **parse**(`data`: ArrayBuffer): [STLResult](#interfacesstlresultmd)

*Defined in [io/stl/stl-loader.ts:30](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L30)*

parse the given data as stl file

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | ArrayBuffer | the stl file content as array buffer  |

**Returns:** [STLResult](#interfacesstlresultmd)

___

### parseASCII

▸ `Private`**parseASCII**(`data`: ArrayBuffer): [STLResult](#interfacesstlresultmd)

*Defined in [io/stl/stl-loader.ts:186](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L186)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | ArrayBuffer |

**Returns:** [STLResult](#interfacesstlresultmd)

___

### parseBinary

▸ `Private`**parseBinary**(`data`: ArrayBuffer): [STLResult](#interfacesstlresultmd)

*Defined in [io/stl/stl-loader.ts:93](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-loader.ts#L93)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | ArrayBuffer |

**Returns:** [STLResult](#interfacesstlresultmd)


<a name="classesview3dmd"></a>

# Class: View3D

## Hierarchy

* **View3D**

## Index

### Properties

* [View3DAxes](#view3daxes)
* [View3DGeometry](#view3dgeometry)
* [View3DGrid](#view3dgrid)
* [View3DLines](#view3dlines)
* [View3DPoints](#view3dpoints)

## Properties

### View3DAxes

•  **View3DAxes**: *typeof* View3DAxes = View3DAxes

*Defined in [view3d/view3d.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d.ts#L8)*

___

### View3DGeometry

•  **View3DGeometry**: *typeof* View3DGeometry = View3DGeometry

*Defined in [view3d/view3d.ts:12](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d.ts#L12)*

___

### View3DGrid

•  **View3DGrid**: *typeof* View3DGrid = View3DGrid

*Defined in [view3d/view3d.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d.ts#L9)*

___

### View3DLines

•  **View3DLines**: *typeof* View3DLines = View3DLines

*Defined in [view3d/view3d.ts:10](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d.ts#L10)*

___

### View3DPoints

•  **View3DPoints**: *typeof* View3DPoints = View3DPoints

*Defined in [view3d/view3d.ts:11](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d.ts#L11)*


<a name="classesview3daxesmd"></a>

# Class: View3DAxes

## Hierarchy

* [View3DObject](#classesview3dobjectmd)

  ↳ **View3DAxes**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [position](#position)
* [rotation](#rotation)
* [scale](#scale)
* [size](#size)
* [type](#type)

### Methods

* [origin](#origin)

## Constructors

### constructor

\+ **new View3DAxes**(`position?`: [View3DVec3](#interfacesview3dvec3md), `size?`: number, `rotation?`: [View3DVec3](#interfacesview3dvec3md)): [View3DAxes](#classesview3daxesmd)

*Overrides [View3DObject](#classesview3dobjectmd).[constructor](#constructor)*

*Defined in [view3d/objects/view3d-axes.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-axes.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`position?` | [View3DVec3](#interfacesview3dvec3md) |
`size?` | number |
`rotation?` | [View3DVec3](#interfacesview3dvec3md) |

**Returns:** [View3DAxes](#classesview3daxesmd)

## Properties

### position

•  **position**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[position](#position)*

*Defined in [view3d/view3d-object.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L8)*

___

### rotation

•  **rotation**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[rotation](#rotation)*

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

___

### scale

•  **scale**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[scale](#scale)*

*Defined in [view3d/view3d-object.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L7)*

___

### size

•  **size**: number \| undefined

*Defined in [view3d/objects/view3d-axes.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-axes.ts#L7)*

___

### type

•  **type**: [View3DType](#enumsview3dtypemd) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[type](#type)*

*Defined in [view3d/view3d-object.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L6)*

## Methods

### origin

▸ `Static`**origin**(`size?`: number): [View3DAxes](#classesview3daxesmd)

*Defined in [view3d/objects/view3d-axes.ts:20](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-axes.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`size?` | number |

**Returns:** [View3DAxes](#classesview3daxesmd)


<a name="classesview3dgeometrymd"></a>

# Class: View3DGeometry

## Hierarchy

* [View3DObject](#classesview3dobjectmd)

  ↳ **View3DGeometry**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [color](#color)
* [colors](#colors)
* [normals](#normals)
* [position](#position)
* [rotation](#rotation)
* [scale](#scale)
* [type](#type)
* [vertices](#vertices)
* [wireframe](#wireframe)

## Constructors

### constructor

\+ **new View3DGeometry**(`vertices`: number[], `normals?`: number[], `position?`: [View3DVec3](#interfacesview3dvec3md), `rotation?`: [View3DVec3](#interfacesview3dvec3md)): [View3DGeometry](#classesview3dgeometrymd)

*Overrides [View3DObject](#classesview3dobjectmd).[constructor](#constructor)*

*Defined in [view3d/objects/view3d-geometry.ts:16](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`vertices` | number[] |
`normals?` | number[] |
`position?` | [View3DVec3](#interfacesview3dvec3md) |
`rotation?` | [View3DVec3](#interfacesview3dvec3md) |

**Returns:** [View3DGeometry](#classesview3dgeometrymd)

## Properties

### color

•  **color**: string \| undefined

*Defined in [view3d/objects/view3d-geometry.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry.ts#L8)*

the the color for the material

___

### colors

•  **colors**: number[] \| undefined

*Defined in [view3d/objects/view3d-geometry.ts:10](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry.ts#L10)*

the the color for each face

___

### normals

•  **normals**: number[] \| undefined

*Defined in [view3d/objects/view3d-geometry.ts:14](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry.ts#L14)*

the normals

___

### position

•  **position**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[position](#position)*

*Defined in [view3d/view3d-object.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L8)*

___

### rotation

•  **rotation**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[rotation](#rotation)*

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

___

### scale

•  **scale**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[scale](#scale)*

*Defined in [view3d/view3d-object.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L7)*

___

### type

•  **type**: [View3DType](#enumsview3dtypemd) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[type](#type)*

*Defined in [view3d/view3d-object.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L6)*

___

### vertices

•  **vertices**: number[] \| undefined

*Defined in [view3d/objects/view3d-geometry.ts:16](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry.ts#L16)*

the vertices

___

### wireframe

•  **wireframe**: boolean \| undefined

*Defined in [view3d/objects/view3d-geometry.ts:12](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry.ts#L12)*

if true, the object is shown as wireframe


<a name="classesview3dgridmd"></a>

# Class: View3DGrid

## Hierarchy

* [View3DObject](#classesview3dobjectmd)

  ↳ **View3DGrid**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [color](#color)
* [divisions](#divisions)
* [position](#position)
* [rotation](#rotation)
* [scale](#scale)
* [size](#size)
* [type](#type)

## Constructors

### constructor

\+ **new View3DGrid**(`size`: number, `divisions`: number, `color?`: string, `position?`: [View3DVec3](#interfacesview3dvec3md), `rotation?`: [View3DVec3](#interfacesview3dvec3md)): [View3DGrid](#classesview3dgridmd)

*Overrides [View3DObject](#classesview3dobjectmd).[constructor](#constructor)*

*Defined in [view3d/objects/view3d-grid.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-grid.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`size` | number |
`divisions` | number |
`color?` | string |
`position?` | [View3DVec3](#interfacesview3dvec3md) |
`rotation?` | [View3DVec3](#interfacesview3dvec3md) |

**Returns:** [View3DGrid](#classesview3dgridmd)

## Properties

### color

•  **color**: string \| undefined

*Defined in [view3d/objects/view3d-grid.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-grid.ts#L8)*

___

### divisions

•  **divisions**: number \| undefined

*Defined in [view3d/objects/view3d-grid.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-grid.ts#L9)*

___

### position

•  **position**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[position](#position)*

*Defined in [view3d/view3d-object.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L8)*

___

### rotation

•  **rotation**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[rotation](#rotation)*

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

___

### scale

•  **scale**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[scale](#scale)*

*Defined in [view3d/view3d-object.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L7)*

___

### size

•  **size**: number \| undefined

*Defined in [view3d/objects/view3d-grid.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-grid.ts#L7)*

___

### type

•  **type**: [View3DType](#enumsview3dtypemd) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[type](#type)*

*Defined in [view3d/view3d-object.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L6)*


<a name="classesview3dlinesmd"></a>

# Class: View3DLines

## Hierarchy

* [View3DObject](#classesview3dobjectmd)

  ↳ **View3DLines**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [color](#color)
* [points](#points)
* [position](#position)
* [rotation](#rotation)
* [scale](#scale)
* [type](#type)

## Constructors

### constructor

\+ **new View3DLines**(`points`: [View3DVec3](#interfacesview3dvec3md)[], `color?`: string, `position?`: [View3DVec3](#interfacesview3dvec3md), `rotation?`: [View3DVec3](#interfacesview3dvec3md)): [View3DLines](#classesview3dlinesmd)

*Overrides [View3DObject](#classesview3dobjectmd).[constructor](#constructor)*

*Defined in [view3d/objects/view3d-lines.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-lines.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`points` | [View3DVec3](#interfacesview3dvec3md)[] |
`color?` | string |
`position?` | [View3DVec3](#interfacesview3dvec3md) |
`rotation?` | [View3DVec3](#interfacesview3dvec3md) |

**Returns:** [View3DLines](#classesview3dlinesmd)

## Properties

### color

•  **color**: string \| undefined

*Defined in [view3d/objects/view3d-lines.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-lines.ts#L7)*

___

### points

•  **points**: [View3DVec3](#interfacesview3dvec3md)[] \| undefined

*Defined in [view3d/objects/view3d-lines.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-lines.ts#L8)*

___

### position

•  **position**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[position](#position)*

*Defined in [view3d/view3d-object.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L8)*

___

### rotation

•  **rotation**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[rotation](#rotation)*

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

___

### scale

•  **scale**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[scale](#scale)*

*Defined in [view3d/view3d-object.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L7)*

___

### type

•  **type**: [View3DType](#enumsview3dtypemd) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[type](#type)*

*Defined in [view3d/view3d-object.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L6)*


<a name="classesview3dobjectmd"></a>

# Class: View3DObject

## Hierarchy

* **View3DObject**

  ↳ [View3DAxes](#classesview3daxesmd)

  ↳ [View3DGeometry](#classesview3dgeometrymd)

  ↳ [View3DGrid](#classesview3dgridmd)

  ↳ [View3DLines](#classesview3dlinesmd)

  ↳ [View3DPoints](#classesview3dpointsmd)

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [position](#position)
* [rotation](#rotation)
* [scale](#scale)
* [type](#type)

## Constructors

### constructor

\+ **new View3DObject**(`position?`: [View3DVec3](#interfacesview3dvec3md), `rotation?`: [View3DVec3](#interfacesview3dvec3md), `scale?`: [View3DVec3](#interfacesview3dvec3md)): [View3DObject](#classesview3dobjectmd)

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`position?` | [View3DVec3](#interfacesview3dvec3md) |
`rotation?` | [View3DVec3](#interfacesview3dvec3md) |
`scale?` | [View3DVec3](#interfacesview3dvec3md) |

**Returns:** [View3DObject](#classesview3dobjectmd)

## Properties

### position

•  **position**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Defined in [view3d/view3d-object.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L8)*

___

### rotation

•  **rotation**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

___

### scale

•  **scale**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Defined in [view3d/view3d-object.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L7)*

___

### type

•  **type**: [View3DType](#enumsview3dtypemd) \| undefined

*Defined in [view3d/view3d-object.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L6)*


<a name="classesview3dpointsmd"></a>

# Class: View3DPoints

## Hierarchy

* [View3DObject](#classesview3dobjectmd)

  ↳ **View3DPoints**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [color](#color)
* [points](#points)
* [position](#position)
* [rotation](#rotation)
* [scale](#scale)
* [type](#type)

## Constructors

### constructor

\+ **new View3DPoints**(`points`: [View3DVec3](#interfacesview3dvec3md)[], `color?`: string, `position?`: [View3DVec3](#interfacesview3dvec3md), `rotation?`: [View3DVec3](#interfacesview3dvec3md)): [View3DPoints](#classesview3dpointsmd)

*Overrides [View3DObject](#classesview3dobjectmd).[constructor](#constructor)*

*Defined in [view3d/objects/view3d-points.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-points.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`points` | [View3DVec3](#interfacesview3dvec3md)[] |
`color?` | string |
`position?` | [View3DVec3](#interfacesview3dvec3md) |
`rotation?` | [View3DVec3](#interfacesview3dvec3md) |

**Returns:** [View3DPoints](#classesview3dpointsmd)

## Properties

### color

•  **color**: string \| undefined

*Defined in [view3d/objects/view3d-points.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-points.ts#L7)*

___

### points

•  **points**: [View3DVec3](#interfacesview3dvec3md)[] \| undefined

*Defined in [view3d/objects/view3d-points.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-points.ts#L8)*

___

### position

•  **position**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[position](#position)*

*Defined in [view3d/view3d-object.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L8)*

___

### rotation

•  **rotation**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[rotation](#rotation)*

*Defined in [view3d/view3d-object.ts:9](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L9)*

___

### scale

•  **scale**: [View3DVec3](#interfacesview3dvec3md) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[scale](#scale)*

*Defined in [view3d/view3d-object.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L7)*

___

### type

•  **type**: [View3DType](#enumsview3dtypemd) \| undefined

*Inherited from [View3DObject](#classesview3dobjectmd).[type](#type)*

*Defined in [view3d/view3d-object.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-object.ts#L6)*


<a name="enumsview3dtypemd"></a>

# Enumeration: View3DType

## Index

### Enumeration members

* [Axes](#axes)
* [Geometry](#geometry)
* [Grid](#grid)
* [Lines](#lines)
* [Points](#points)

## Enumeration members

### Axes

•  **Axes**:  = "axes"

*Defined in [view3d/view3d-type.ts:2](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-type.ts#L2)*

___

### Geometry

•  **Geometry**:  = "geometry"

*Defined in [view3d/view3d-type.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-type.ts#L6)*

___

### Grid

•  **Grid**:  = "grid"

*Defined in [view3d/view3d-type.ts:3](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-type.ts#L3)*

___

### Lines

•  **Lines**:  = "lines"

*Defined in [view3d/view3d-type.ts:4](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-type.ts#L4)*

___

### Points

•  **Points**:  = "points"

*Defined in [view3d/view3d-type.ts:5](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-type.ts#L5)*


<a name="interfacessquishymd"></a>

# Interface: Squishy

## Hierarchy

* **Squishy**

## Index

### Properties

* [context](#context)
* [io](#io)
* [view3d](#view3d)

### Methods

* [progress](#progress)

## Properties

### context

•  **context**: any

*Defined in [squishy.ts:5](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/squishy.ts#L5)*

___

### io

•  **io**: [SquishyIO](#classessquishyiomd)

*Defined in [squishy.ts:6](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/squishy.ts#L6)*

___

### view3d

•  **view3d**: [View3D](#classesview3dmd)

*Defined in [squishy.ts:7](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/squishy.ts#L7)*

## Methods

### progress

▸ **progress**(`value`: number): void

*Defined in [squishy.ts:8](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/squishy.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** void


<a name="interfacesstlresultmd"></a>

# Interface: STLResult

## Hierarchy

* **STLResult**

## Index

### Properties

* [colors](#colors)
* [normals](#normals)
* [vertices](#vertices)

## Properties

### colors

•  **colors**: number[] \| undefined

*Defined in [io/stl/stl-result.ts:4](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-result.ts#L4)*

___

### normals

•  **normals**: number[]

*Defined in [io/stl/stl-result.ts:2](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-result.ts#L2)*

___

### vertices

•  **vertices**: number[]

*Defined in [io/stl/stl-result.ts:3](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/io/stl/stl-result.ts#L3)*


<a name="interfacesview3dvec3md"></a>

# Interface: View3DVec3

## Hierarchy

* **View3DVec3**

## Index

### Properties

* [x](#x)
* [y](#y)
* [z](#z)

## Properties

### x

•  **x**: number

*Defined in [view3d/view3d-vec3.ts:2](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-vec3.ts#L2)*

___

### y

•  **y**: number

*Defined in [view3d/view3d-vec3.ts:3](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-vec3.ts#L3)*

___

### z

•  **z**: number

*Defined in [view3d/view3d-vec3.ts:4](https://github.com/dayaftereh/squishy/blob/fde2f5f/src/worker/execution/node-executor/script/squishy/view3d/view3d-vec3.ts#L4)*
