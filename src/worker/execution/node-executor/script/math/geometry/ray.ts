import { Vec3 } from './vec3';
import { Vec2 } from './vec2';
import { Matrix4 } from './matrix4';
import { Quaternion } from './quaternion';
import { Plane } from './plane';
import { ScriptMath } from '../script.math';
import { Script } from 'vm';

export class Ray {

    origin: Vec3 | undefined
    direction: Vec3 | undefined

    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin
        this.direction = direction.normalize()
    }

    clone(): Ray {
        const origin: Vec3 = this.origin.clone()
        const direction: Vec3 = this.direction.clone()

        return new Ray(origin, direction)
    }

    at(t: number): Vec3 {
        const direction: Vec3 = this.direction.normalize()
        const v: Vec3 = direction.scale(t)
        const point: Vec3 = this.origin.addWith(v)
        return point
    }

    lookAt(v: Vec3): Ray {
        const origin: Vec3 = this.origin.clone()
        const direction: Vec3 = v.subtractWith(origin)
        return new Ray(origin, direction)
    }

    recast(t: number): Ray {
        const origin: Vec3 = this.at(t)
        const direction: Vec3 = this.direction.clone()
        return new Ray(origin, direction)
    }

    closestPointToPoint(point: Vec3): Vec3 {
        const target: Vec3 = point.subtractWith(this.origin)
        const directionDistance: number = target.dotWith(this.direction)
        if (directionDistance < 0.0) {
            return this.origin.clone()
        }

        return this.at(directionDistance)
    }

    distanceSquaredToPoint(point: Vec3): number {
        const closestPoint: Vec3 = this.closestPointToPoint(point)
        return closestPoint.distanceSquaredTo(point)
    }

    applyMatrix4(m: Matrix4): Ray {
        const origin: Vec3 = this.origin.applyMatrix4(m)
        const direction: Vec3 = this.direction.applyMatrix4(m)
        return new Ray(origin, direction)
    }

    applyQuaternion(q: Quaternion): Ray {
        const origin: Vec3 = this.origin.applyQuaternion(q)
        const direction: Vec3 = this.direction.applyQuaternion(q)
        return new Ray(origin, direction)
    }

    distanceToPlane(plane: Plane): number | undefined {
        const denominator: number = plane.normal.dotWith(this.direction)
        if (ScriptMath.closeZero(denominator)) {
            const distance: number = plane.distanceToPoint(this.origin)
            if (ScriptMath.closeZero(distance)) {
                return 0.0
            }

            return undefined
        }

        const t: number = -(this.origin.dotWith(plane.normal) + plane.constant) / denominator

        if (t < 0.0) {
            return undefined
        }

        return t
    }

    intersectPlane(plane: Plane): Vec3 | undefined {
        const t: number | undefined = this.distanceToPlane(plane)
        if (t === undefined) {
            return undefined
        }

        return this.at(t)
    }

    intersectsPlane(plane: Plane): boolean {
        const distToPoint: number = plane.distanceToPoint(this.origin);
        if (ScriptMath.closeZero(distToPoint)) {
            return true
        }
        const denominator: number = plane.normal.dotWith(this.direction)
        if (denominator * distToPoint < 0.0) {
            return true
        }

        // ray origin is behind the plane (and is pointing behind it)
        return false;
    }

}