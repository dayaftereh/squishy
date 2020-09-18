import { Mathf } from '../Mathf';
import { Matrix4 } from './matrix4';
import { Plane } from './plane';
import { Quaternion } from './quaternion';
import { Sphere } from './sphere';
import { Vec3 } from './vec3';

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
        if (Mathf.closeZero(denominator)) {
            const distance: number = plane.distanceToPoint(this.origin)
            if (Mathf.closeZero(distance)) {
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
        if (Mathf.closeZero(distToPoint)) {
            return true
        }
        const denominator: number = plane.normal.dotWith(this.direction)
        if (denominator * distToPoint < 0.0) {
            return true
        }

        // ray origin is behind the plane (and is pointing behind it)
        return false;
    }

    intersectSphere(sphere: Sphere): Vec3 | undefined {
        const vector: Vec3 = sphere.center.subtractWith(this.origin)
        const tca: number = vector.dotWith(this.direction)
        const d2: number = vector.dotWith(vector) - tca * tca
        const radius2: number = sphere.radius * sphere.radius

        if (d2 > radius2) {
            return undefined
        }

        const thc: number = Math.sqrt(radius2 - d2)

        // t0 = first intersect point - entrance on front of sphere
        const t0: number = tca - thc

        // t1 = second intersect point - exit point on back of sphere
        const t1: number = tca + thc

        // test to see if both t0 and t1 are behind the ray - if so, return undefined
        if (t0 < 0.0 && t1 < 0.0) {
            return undefined
        }

        // test to see if t0 is behind the ray:
        // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
        // in order to always return an intersect point that is in front of the ray.
        if (t0 < 0.0) {
            return this.at(t1)
        }

        // else t0 is in front of the ray, so return the first collision point scaled by t0
        return this.at(t0)
    }

    intersectsSphere(sphere: Sphere): boolean {
        const co: Vec3 = sphere.center.subtractWith(this.origin)
        const v: number = co.dotWith(this.direction)
        const discriminant: number = v * v - co.dotWith(co) + sphere.radius * sphere.radius
        return discriminant > 0 || Mathf.closeZero(discriminant)
    }

}