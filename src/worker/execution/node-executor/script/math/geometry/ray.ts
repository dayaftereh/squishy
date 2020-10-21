import { closeZero } from '../math-functions';
import { Matrix4 } from './matrix4';
import { Plane } from './plane';
import { Quaternion } from './quaternion';
import { Sphere } from './sphere';
import { Triangle } from './triangle';
import { Vec3 } from './vec3';

/**
 * A ray that emits from an origin in a certain direction. 
 * This is used by the Raycaster to assist with raycasting.
 */
export class Ray {

    /** the origin of the Ray */
    origin: Vec3 | undefined
    /** The direction of the Ray */
    direction: Vec3 | undefined

    /**
     * Creates a new Ray.
     * @param origin the origin of the Ray
     * @param direction The direction of the Ray
     */
    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin
        this.direction = direction.normalize()
    }

    /**
     * Creates a new Ray with identical origin and direction to this one.
     */
    clone(): Ray {
        const origin: Vec3 = this.origin.clone()
        const direction: Vec3 = this.direction.clone()

        return new Ray(origin, direction)
    }

    /**
     * Get a Vec3 that is a given distance along this Ray.
     * @param t the distance along the Ray to retrieve a position for.
     */
    at(t: number): Vec3 {
        const direction: Vec3 = this.direction.normalize()
        const v: Vec3 = direction.scale(t)
        const point: Vec3 = this.origin.addWith(v)
        return point
    }

    /**
     * The Vec3 to look at.
     * @param v Adjusts the direction of the ray to point at the vector in world coordinates.
     */
    lookAt(v: Vec3): Ray {
        const origin: Vec3 = this.origin.clone()
        const direction: Vec3 = v.subtractWith(origin)
        return new Ray(origin, direction)
    }

    /**
     * Shift the origin of this Ray along its direction by the distance given.
     * @param t The distance along the Ray to interpolate.
     */
    recast(t: number): Ray {
        const origin: Vec3 = this.at(t)
        const direction: Vec3 = this.direction.clone()
        return new Ray(origin, direction)
    }

    /**
     * Get the point along this Ray that is closest to the Vec3 provided.
     * @param point  the point to get the closest approach to.
     */
    closestPointToPoint(point: Vec3): Vec3 {
        const target: Vec3 = point.subtractWith(this.origin)
        const directionDistance: number = target.dotWith(this.direction)
        if (directionDistance < 0.0) {
            return this.origin.clone()
        }

        return this.at(directionDistance)
    }

    /**
     * Get the squared distance of the closest approach between the Ray and the Vec3.
     * @param point the Vec3 to compute a distance to.
     */
    distanceSquaredToPoint(point: Vec3): number {
        const closestPoint: Vec3 = this.closestPointToPoint(point)
        return closestPoint.distanceSquaredTo(point)
    }

    /**
     * Transform this Ray by the Matrix4.
     * @param m the Matrix4 to apply to this Ray.
     */
    applyMatrix4(m: Matrix4): Ray {
        const origin: Vec3 = this.origin.applyMatrix4(m)
        const direction: Vec3 = this.direction.applyMatrix4(m)
        return new Ray(origin, direction)
    }

    /**
     * Transform this Ray by the Quaternion.
     * @param q the Quaternion to apply to this Ray.
     */
    applyQuaternion(q: Quaternion): Ray {
        const origin: Vec3 = this.origin.applyQuaternion(q)
        const direction: Vec3 = this.direction.applyQuaternion(q)
        return new Ray(origin, direction)
    }

    /**
     * Get the distance from origin to the Plane, or undefined if the Ray doesn't intersect the Plane.
     * @param plane the Plane to get the distance to.
     */
    distanceToPlane(plane: Plane): number | undefined {
        const denominator: number = plane.normal.dotWith(this.direction)
        if (closeZero(denominator)) {
            const distance: number = plane.distanceToPoint(this.origin)
            if (closeZero(distance)) {
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

    /**
     * Intersect this Ray with a Plane, returning the intersection point or undefined if there is no intersection.
     * @param plane the Plane to intersect with.
     */
    intersectPlane(plane: Plane): Vec3 | undefined {
        const t: number | undefined = this.distanceToPlane(plane)
        if (t === undefined) {
            return undefined
        }

        return this.at(t)
    }

    /**
     * Return true if this Ray intersects with the Plane.
     * @param plane  the Plane to intersect with.
     */
    intersectsPlane(plane: Plane): boolean {
        const distToPoint: number = plane.distanceToPoint(this.origin);
        if (closeZero(distToPoint)) {
            return true
        }
        const denominator: number = plane.normal.dotWith(this.direction)
        if (denominator * distToPoint < 0.0) {
            return true
        }

        // ray origin is behind the plane (and is pointing behind it)
        return false;
    }

    /**
     * Intersect this Ray with a Sphere, returning the intersection point or undefined if there is no intersection.
     * @param sphere the Sphere to intersect with.
     */
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
        let t0: number = tca - thc

        // t1 = second intersect point - exit point on back of sphere
        let t1: number = tca + thc

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

    /**
     * Return true if this Ray intersects with the Sphere.
     * @param sphere  the Sphere to intersect with.
     */
    intersectsSphere(sphere: Sphere): boolean {
        const co: Vec3 = sphere.center.subtractWith(this.origin)
        const v: number = co.dotWith(this.direction)
        const discriminant: number = v * v - co.dotWith(co) + sphere.radius * sphere.radius
        return discriminant > 0 || closeZero(discriminant)
    }

    /**
     * Intersect this Ray with a triangle, returning the intersection point or undefined if there is no intersection.
     * @param triangle the triangle to check
     * @param backfaceCulling whether to use backface culling
     * @see http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
     */
    intersectTriangle(triangle: Triangle, backfaceCulling?: boolean): Vec3 | undefined {
        if (!backfaceCulling) {
            backfaceCulling = true
        }

        const edge1: Vec3 = triangle.b.subtractWith(triangle.a)
        const edge2: Vec3 = triangle.c.subtractWith(triangle.a)

        const normal: Vec3 = edge1.crossWith(edge2)

        // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
        //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
        //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
        let DdN: number = this.direction.dotWith(normal);

        let sign: number
        if (DdN > 0.0) {
            if (backfaceCulling) {
                return undefined
            }
            sign = 1.0
        } else if (DdN < 0.0) {
            sign = -1.0
            DdN = -DdN
        } else {
            return undefined
        }
        const diff: Vec3 = this.origin.subtractWith(triangle.a)
        const DdQxE2: number = sign * this.direction.dotWith(edge2.crossWith(diff))
        // b1 < 0, no intersection
        if (DdQxE2 < 0.0) {
            return undefined
        }

        const DdE1xQ: number = sign * this.direction.dotWith(edge1.crossWith(diff))
        // b2 < 0, no intersection
        if (DdE1xQ < 0.0) {
            return undefined
        }

        // b1+b2 > 1, no intersection
        if ((DdQxE2 + DdE1xQ) > DdN) {
            return undefined
        }

        // Line intersects triangle, check if ray does.
        const QdN: number = - sign * diff.dotWith(normal);

        // t < 0, no intersection
        if (QdN < 0.0) {
            return undefined
        }

        // Ray intersects triangle.
        const t: number = QdN / DdN

        return this.at(t)
    }

    /**
     * Creates a new ray from the point as reflect of this direction vector off of plane orthogonal to normal. 
     * Normal is assumed to have unit length.
     * @param point the point for the origin
     * @param normal the normal to the reflecting plane 
     */
    reflect(point: Vec3, normal: Vec3): Ray {
        const n: Vec3 = this.direction.reflect(normal)
        const ray: Ray = new Ray(point, n)
        return ray
    }

    /**
     * creates a new ray from the given point to the given point
     * @param from the start point
     * @param to the end point
     */
    static createFromTo(from: Vec3, to: Vec3): Ray {
        const direction: Vec3 = to.subtractWith(from)
        const ray: Ray = new Ray(from, direction)
        return ray
    }

}