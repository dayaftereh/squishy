import { View3DType } from './view3d-type';
import { View3DVec3 } from './view3d-vec3';

export class View3DObject {

    type: View3DType | undefined
    position: View3DVec3 | undefined
    rotation: View3DVec3 | undefined

    constructor(position?: View3DVec3, rotation?: View3DVec3) {
        if (!position) {
            position = { x: 0.0, y: 0.0, z: 0.0 }
        }

        if (!rotation) {
            rotation = { x: 0.0, y: 0.0, z: 0.0 }
        }

        this.position = position
        this.rotation = rotation
    }

}