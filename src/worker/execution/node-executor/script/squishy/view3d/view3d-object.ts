import { View3DType } from './view3d-type';
import { View3DVec3 } from './view3d-vec3';

export class View3DObject {

    type: View3DType | undefined
    scale: View3DVec3 | undefined
    position: View3DVec3 | undefined
    rotation: View3DVec3 | undefined

    constructor(position?: View3DVec3, rotation?: View3DVec3, scale?: View3DVec3) {
        if (!position) {
            position = { x: 0.0, y: 0.0, z: 0.0 }
        }

        if (!rotation) {
            rotation = { x: 0.0, y: 0.0, z: 0.0 }
        }

        if (!scale) {
            scale = { x: 1.0, y: 1.0, z: 1.0 }
        }
        this.scale = scale
        this.position = position
        this.rotation = rotation
    }

}