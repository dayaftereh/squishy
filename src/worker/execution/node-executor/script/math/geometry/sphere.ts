import { Vec3 } from './vec3';
import { Plane } from './plane';
import { Matrix4 } from './matrix4';
import { Ray } from './ray';

/**
 * A sphere defined by a center and radius.
 */
export class Sphere {

    /** A Vec3 defining the center of the sphere */
    center: Vec3 | undefined
    /** The radius of the sphere. */
    radius: number | undefined

    /**
     * Creates a new Sphere.
     * @param center the center of the sphere. 
     * @param radius the radius of the sphere
     */
    constructor(center: Vec3, radius: number) {
        this.center = center
        this.radius = radius
    }

    /**
     * Checks to see if the sphere contains the provided point inclusive of the surface of the sphere.
     * @param point the Vec3 to be checked
     */
    containsPoint(point: Vec3): boolean {
        return point.distanceSquaredTo(this.center) <= (this.radius * this.radius)
    }

    /**
     * Returns the closest distance from the boundary of the sphere to the point. 
     * If the sphere contains the point, the distance will be negative.
     * @param point the Vec3 to get the distance to
     */
    distanceToPoint(point: Vec3): number {
        return point.distanceTo(this.center) - this.radius
    }

    /**
     * Determines whether or not this sphere intersects a given plane.
     * @param plane Plane to check for intersection against.
     */
    intersectsPlane(plane: Plane): boolean {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius
    }

    /**
     * Intersect this Ray with this Sphere, returning the intersection point or undefined if there is no intersection. 
     * @param ray the ray to intersect with this sphere
     */
    intersectRay(ray: Ray): Vec3 | undefined {
        return ray.intersectSphere(this)
    }

    /**
     * Translate the sphere's center by the provided offset Vec3.
     * @param offset the offset to translate the center
     */
    translate(offset: Vec3): Sphere {
        const center: Vec3 = this.center.addWith(offset)
        return new Sphere(center, this.radius)
    }

    /**
     * Transforms this sphere with the provided Matrix4.
     * @param m the Matrix4 to apply
     */
    applyMatrix4(m: Matrix4): Sphere {
        const center: Vec3 = this.center.applyMatrix4(m)
        const radius: number = this.radius * m.maxScaleOnAxis()
        return new Sphere(center, radius)
    }

    /**
     * Returns the normal for the given point
     * @param point the point to get the normal for
     */
    normalAt(point: Vec3): Vec3 {
        const n: Vec3 = point.subtractWith(this.center)
        return n.normalize()
    }
}