import { View3DObject } from '../view3d-object'
import { View3DType } from '../view3d-type'
import { View3DVec3 } from '../view3d-vec3'

export class View3DGeometry extends View3DObject {

    colors: View3DVec3[] | undefined
    normals: View3DVec3[] | undefined
    vertices: View3DVec3[] | undefined

    constructor(vertices: View3DVec3[], normals?: View3DVec3[], colors?: View3DVec3[], position?: View3DVec3, rotation?: View3DVec3) {
        super(position, rotation)
        this.colors = colors
        this.normals = normals
        this.vertices = vertices
    }

    get type(): View3DType {
        return View3DType.Geometry
    }
}