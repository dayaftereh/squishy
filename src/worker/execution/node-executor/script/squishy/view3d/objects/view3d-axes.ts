import { View3DObject } from '../view3d-object'
import { View3DType } from '../view3d-type'
import { View3DVec3 } from '../view3d-vec3'

export class View3DAxes extends View3DObject {

    size: number | undefined

    constructor(position: View3DVec3, size?: number, rotation?: View3DVec3) {
        super(position, rotation)
        
        if (isNaN(size)) {
            size = 1.0
        }

        this.size = Math.max(1.0, size)
    }

    static origin(size?: number): View3DAxes {
        return new View3DAxes({ x: 0.0, y: 0.0, z: 0.0 }, size)
    }

    get type(): View3DType {
        return View3DType.Axes
    }
}