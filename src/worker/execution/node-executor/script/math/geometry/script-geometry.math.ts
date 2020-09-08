import { Vec2 } from './vec2';
import { Vec3 } from './vec3';
import { Point2 } from './point2';
import { Point3 } from './point3';
import { Transform2 } from './transform2';
import { Matrix4 } from './matrix4';
import { Matrix3 } from './matrix3';
import { Quaternion } from './quaternion';
import { Ray } from './ray';
import { Plane } from './plane';
import { Sphere } from './sphere';

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

    matrix3(): Matrix3 {
        return Matrix3.identity()
    }

    matrix4(): Matrix4 {
        return Matrix4.identity()
    }

    quaternion(): Quaternion {
        return Quaternion.identity()
    }

    ray(origin: Vec3, direction: Vec3): Ray {
        return new Ray(origin, direction)
    }

    plane(normal: Vec3, constant: number): Plane {
        return new Plane(normal, constant)
    }

    sphere(origin: Vec3, radius: number): Sphere {
        return new Sphere(origin, radius)
    }

}