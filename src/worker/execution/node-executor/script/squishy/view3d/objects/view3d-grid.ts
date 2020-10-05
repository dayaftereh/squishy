import { View3DVec3 } from 'dist/script/squishy/view3d/view3d-vec3';
import { View3DObject } from '../view3d-object';
import { View3DType } from '../view3d-type';

export class View3DGrid extends View3DObject {

    size: number | undefined
    color: string | undefined
    divisions: number | undefined

    constructor(size: number, divisions: number, color?: string, position?: View3DVec3, rotation?: View3DVec3) {
        super(position, rotation)
        this.size = size
        this.color = color
        this.divisions = divisions
    }

    get type(): View3DType {
        return View3DType.Grid
    }

}