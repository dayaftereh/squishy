import { View3DObject } from '../view3d-object'
import { View3DType } from '../view3d-type'
import { View3DVec3 } from '../view3d-vec3'

export class View3DGeometry extends View3DObject {

    /** the the color for the material */
    color: string | undefined
    /** the the color for each face */
    colors: number[] | undefined
    /** if true, the object is shown as wireframe */
    wireframe: boolean | undefined
    /** the normals */
    normals: number[] | undefined
    /** the vertices */
    vertices: number[] | undefined

    constructor(vertices: number[], normals?: number[], position?: View3DVec3, rotation?: View3DVec3) {
        super(position, rotation)
        this.normals = normals
        this.vertices = vertices
        this.type = View3DType.Geometry
    }

}