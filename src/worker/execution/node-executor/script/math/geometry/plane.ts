import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';
import { Ray } from './ray';
import { Sphere } from './sphere';
import { Vec3 } from './vec3';
/**
 * A two dimensional surface that extends infinitely in 3d space, 
 * represented in Hessian normal form by a unit length normal vector and a constant.
 */
export class Plane {

    /** a unit length Vec3 defining the normal of the plane */
    normal: Vec3 | undefined
    /** the signed distance from the origin to the plane */
    constant: number | undefined

    /**
     * Creates a new Plane
     * @param normal the unit length Vec3 defining the normal of the plane
     * @param constant the signed distance from the origin to the plane
     */
    constructor(normal: Vec3, constant: number) {
        this.normal = normal.normalize()
        this.constant = constant
    }

    /**
     * Returns a new plane with the same normal and constant as this one.
     */
    clone(): Plane {
        const normal: Vec3 = this.normal.clone()
        return new Plane(normal, this.constant)
    }

    /**
     * Negates both the normal vector and the constant.
     */
    negate(): Plane {
        const normal: Vec3 = this.normal.inverse()
        const constant: number = this.constant * -1.0
        return new Plane(normal, constant)
    }

    /**
     * Returns the signed distance from the point to the plane.
     * @param point the point to get the distance to
     */
    distanceToPoint(point: Vec3): number {
        return this.normal.dotWith(point) + this.constant
    }

    /**
     * Projects a point onto the plane.
     * @param point the Vec3 to project onto the plane.
     */
    projectPoint(point: Vec3): Vec3 {
        const distance: number = this.distanceToPoint(point)
        const n: Vec3 = this.normal.scale(-distance)
        const target: Vec3 = n.addWith(point)
        return target
    }

    /**
     * Translates the plane by the distance defined by the offset vector. 
     * Note that this only affects the plane constant and will not affect the normal vector.
     * @param offset the offset to translate
     */
    translate(offset: Vec3): Plane {
        const normal: Vec3 = this.normal.clone()
        const constant: number = this.constant - offset.dotWith(this.normal)
        return new Plane(normal, constant)
    }

    /**
     * Returns a Vector3 coplanar to the plane, by calculating the projection of the normal vector at the origin onto the plane.
     */
    coplanarPoint(): Vec3 {
        const point: Vec3 = this.normal.scale(-this.constant)
        return point
    }

    /**
     * returns the normal for the given point
     * @param point the point to get the normal at
     */
    normalAt(point: Vec3): Vec3 {
        return this.normal.clone()
    }

    /**
     * Returns the signed distance from the sphere to the plane.
     * @param sphere the sphere to get the distance to
     */
    distanceToSphere(sphere: Sphere): number {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }

    /**
     * checks if the sphere intersects with the plane
     * @param sphere the sphere to check 
     */
    intersectsSphere(sphere: Sphere): boolean {
        return sphere.intersectsPlane(this);

    }

    /**
     * Intersect this Ray with this Plane, returning the intersection point or undefined if there is no intersection. 
     * @param ray the ray to intersect with this plane
     */
    intersectRay(ray: Ray): Vec3 | undefined {
        return ray.intersectPlane(this)
    }

    /**
     * Creates a new plane as defined by a normal and an arbitrary coplanar point.
     * @param n a unit length Vec3 defining the normal of the plane.
     * @param point the coplanar point
     */
    static fromNormalAndCoplanarPoint(n: Vec3, point: Vec3): Plane {
        const normal: Vec3 = n.normalize()
        const constant: number = -point.dotWith(normal)
        const plane: Plane = new Plane(normal, constant)
        return plane
    }

    /**
     * Defines the plane based on the 3 provided points. 
     * The winding order is assumed to be counter-clockwise, and determines the direction of the normal.
     * @param a first point on the plane.
     * @param b second point on the plane.
     * @param c third point on the plane.
     */
    static fromCoplanarPoints(a: Vec3, b: Vec3, c: Vec3): Plane {
        const v0: Vec3 = c.subtractWith(b)
        const v1: Vec3 = a.subtractWith(b)
        const normal: Vec3 = v0.crossWith(v1)
        const plane: Plane = Plane.fromNormalAndCoplanarPoint(normal, a)
        return plane
    }

    /**
     * Apply a Matrix4 to the plane. 
     * The matrix must be an affine, homogeneous transform.
     * @param m the Matrix4 to apply.
     * @param optionalNormalMatrix pre-computed normal Matrix3 of the Matrix4 being applied.
     */
    applyMatrix4(m: Matrix4, optionalNormalMatrix?: Matrix3): Plane {
        if (!optionalNormalMatrix) {
            optionalNormalMatrix = Matrix3.identity()
            optionalNormalMatrix = optionalNormalMatrix.normalMatrix()
        }

        const referencePoint: Vec3 = this.coplanarPoint().applyMatrix4(m)
        const normal: Vec3 = this.normal.applyMatrix3(optionalNormalMatrix).normalize()

        const constant: number = - referencePoint.dotWith(normal)

        const plane: Plane = new Plane(normal, constant)
        return plane
    }

}