import { Vec2 } from './vec2';
import { Vec3 } from './vec3';
import { Point2 } from './point2';
import { Point3 } from './point3';
import { Transform2 } from './transform2';

export class ScriptGeometryMath {

    constructor() {

    }

    vec2(x: number, y: number): Vec2 {
        return new Vec2(x, y)
    }

    vec3(x: number, y: number, z: number): Vec3 {
        return new Vec3(x, y, z)
    }

    point2(x: number, y: number): Point2 {
        return new Point2(x, y)
    }

    point3(x: number, y: number, z: number): Point3 {
        return new Point3(x, y, z)
    }

    transform2(): Transform2 {
        return Transform2.identity()
    }

}