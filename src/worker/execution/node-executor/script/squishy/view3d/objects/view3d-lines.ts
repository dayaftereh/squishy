import { View3DVec3 } from 'dist/script/squishy/view3d/view3d-vec3';
import { View3DObject } from '../view3d-object';
import { View3DType } from '../view3d-type';

export class View3DLines extends View3DObject {

    color: string | undefined
    points: View3DVec3[] | undefined

    constructor(points: View3DVec3[], color?: string, position?: View3DVec3, rotation?: View3DVec3) {
        super(position, rotation)
        this.color = color
        this.points = points
    }

    get type(): View3DType {
        return View3DType.Lines
    }

}