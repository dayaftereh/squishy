import { View3DObject } from '../view3d-object'
import { View3DType } from '../view3d-type'
import { View3DVec3 } from '../view3d-vec3'

export class View3DGeometry extends View3DObject {

    colors: number[] | undefined
    normals: number[] | undefined
    vertices: number[] | undefined

    constructor(vertices: number[], normals?: number[], colors?: number[], position?: View3DVec3, rotation?: View3DVec3) {
        super(position, rotation)
        this.colors = colors
        this.normals = normals
        this.vertices = vertices
        this.type = View3DType.Geometry
    }

}