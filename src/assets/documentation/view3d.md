# View3D

The view3d node allow to visualize **3d** data with [WebGL](https://en.wikipedia.org/wiki/WebGL). 
The **3d** visualization is using [Three.js](https://threejs.org/) to build and render the scene with the given data to *WebGL*.
The view3d node has only on connection, which accept a list of `View3DObjects`.
The **3d** objects can be created inside a **script** node under `Squishy.view3d.*` for a deeper dive checkout the **3DObjects** section.

<p align="center">
    <img alt="View3D" src="./assets/documentation/png/view3d.png">
</p>

## Properties

Following `chart` properties can be set:

<dl>
  <dt><b>Name</b></dt>
  <dd>The name of the <code>View3D</code> node.</dd>

  <dt><b>Field of View</b></dt>
  <dd>the angle of the field of view for the camera. Default is <code>50</code>.</dd>

  <dt><b>Near plane</b></dt>
  <dd>the threshold for the near plane of the camera. Default is <code>0.1</code>.</dd>

  <dt><b>Far plane</b></dt>
  <dd>the threshold for the far plane of the camera. Default is <code>2000</code>.</dd>

  <dt><b>View Origin</b></dt>
  <dd>if true, at the origin (0,0,0) three axes are displayed. The X axis is red. The Y axis is green. The Z axis is blue.</dd>

  <dt><b>Size of Origin Axes</b></dt>
  <dd>The length of the three axes at the origin. Default is <code>10</code>.</dd>

  <dt><b>Control</b></dt>
  <dd>
    Defines the camera control. Default is <code>Orbit</code>.
    <ul>
        <li><b>Fly</b> enables a navigation similar to fly modes in DCC tools like Blender.</li>
        <li><b>Orbit</b> allow the camera to orbit around a target.</li>
        <li><b>Trackball</b> is similar to <b>Orbit</b>, but without constant camera <i>up</i> vector.  </li>
    </ul>
  </dd>

  <dt><b>Grid</b></dt>
  <dd>If true, a grid is displayed at the origin (0,0,0).</dd>

  <dt><b>Grid-Size</b></dt>
  <dd>The size of the grid. Default is <code>10</code>.</dd>

  <dt><b>Grid-Divisions</b></dt>
  <dd>The number of divisions across the grid. Default is <code>10</code>.</dd>
</dl>

## 3DObjects

The `View3DObjects` can be created with the classes from `Squishy.view3d.*`.
The full documentation about the `View3D` can be found at [Squishy:View3D]() in the *script* section.

The following code snippet gives a short introduction for the `View3D` objects:

```typescript
// a list with 3d points for example
const points = [
    // ...
    {x: 12, y: 34, z: 0.1},
    // ...
    new Mathf.Vec3(0.1, 3.2, 1.6)
]

// a random color
const color = Mathf.Color.random().toHex()

// a position in 3d
const position = new Mathf.Vec3(4.1, 0.2, 1.6)

// the list with the 3d objects
const objects = []

// View 3D Points
const view3dPoints = new Squishy.view3d.View3DPoints(points, color)
objects.push(view3dPoints)

// View 3D Lines
const view3dLines = new Squishy.view3d.View3DLines(points, color)
objects.push(view3dLines)

// View the three axes (X,Y,Z) at the given position
const view3dAxes = new Squishy.view3d.View3DAxes(position)
// rotate the three axes 45 degree around Y Axis
view3dAxes.rotation.y = Mathf.toRadians(45.0)
objects.push(view3dAxes)

// View a grid at position (0,10,0) with a size of 50 and 5 divisions 
const view3dGrid = new Squishy.view3d.View3DGrid(50.0, 5.0, color)
// change the position
view3dGrid.position.y = 10.0
objects.push(view3dGrid)

return objects
```