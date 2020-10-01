import { View3DVec3 } from './view3d-vec3'

export class View3DAxesHelper {

    constructor(public position: View3DVec3, public size?: number, public rotation?: View3DVec3) {
        if (!this.rotation) {
            this.rotation = { x: 0.0, y: 0.0, z: 0.0 }
        }
        
        if (this.size === undefined || size === null) {
            this.size = 5.0
        }

        this.size = Math.max(1.0, this.size)
    }

    static origin(): View3DAxesHelper {
        return new View3DAxesHelper({ x: 0.0, y: 0.0, z: 0.0 })
    }
}