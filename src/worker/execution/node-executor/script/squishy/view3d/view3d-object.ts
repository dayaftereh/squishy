import { View3DVec3 } from 'dist/script/squishy/view3d/view3d-vec3';
import { View3DType } from './view3d-type';

export class View3DObject {
    
    position: View3DVec3 | undefined
    rotation: View3DVec3 | undefined

    constructor(position?: View3DVec3, rotation?: View3DVec3) {
        if (!position) {
            position = { x: 0.0, y: 0.0, z: 0.0 }
        }

        if (!rotation) {
            rotation = { x: 0.0, y: 0.0, z: 0.0 }
        }
    }

    get type(): View3DType {
        throw new Error('type not implemented')
    }
}