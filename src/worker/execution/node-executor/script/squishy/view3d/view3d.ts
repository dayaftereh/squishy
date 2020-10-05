import { View3DAxes } from './objects/view3d-axes'
import { View3DGeometry } from './objects/view3d-geometry'
import { View3DGrid } from './objects/view3d-grid'
import { View3DLines } from './objects/view3d-lines'
import { View3DPoints } from './objects/view3d-points'

export class View3D {
    View3DAxes: typeof View3DAxes = View3DAxes
    View3DGrid: typeof View3DGrid = View3DGrid
    View3DLines: typeof View3DLines = View3DLines
    View3DPoints: typeof View3DPoints = View3DPoints
    View3DGeometry: typeof View3DGeometry = View3DGeometry
}
