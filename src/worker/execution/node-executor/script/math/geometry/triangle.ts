import { closeZero } from '../math-functions';
import { Plane } from './plane';
import { Ray } from './ray';
import { Vec3 } from './vec3';

/**
 * A geometric triangle as defined by three Vec3s representing its three corners.
 */
export class Triangle {

    /** the first corner of the triangle */
    a: Vec3 | undefined
    /** the second corner of the triangle */
    b: Vec3 | undefined
    /**  the final corner of the triangle */
    c: Vec3 | undefined

    /**
     * Creates a new Triangle.
     * @param a the first corner of the triangle 
     * @param b the second corner of the triangle
     * @param c the final corner of the triangle 
     */
    constructor(a: Vec3, b: Vec3, c: Vec3) {
        this.a = a
        this.b = b
        this.c = c
    }

    /**
     * Returns a new triangle with the same a, b and c properties as this one.
     */
    clone(): Triangle {
        const a: Vec3 = this.a.clone()
        const b: Vec3 = this.b.clone()
        const c: Vec3 = this.c.clone()

        const t: Triangle = new Triangle(a, b, c)
        return t
    }

    static calculateNormal(a: Vec3, b: Vec3, c: Vec3): Vec3 {
        const v0: Vec3 = c.subtractWith(b)
        const v1: Vec3 = a.subtractWith(b)
        const target: Vec3 = v0.crossWith(v1)

        const targetLengthSq: number = target.lengthSquared()
        if (targetLengthSq > 0.0) {
            const n: Vec3 = target.scale(1.0 / Math.sqrt(targetLengthSq))
            return n
        }

        return Vec3.zero()
    }

    /**
     * the method to calculate barycentric coordinates
     * @param point 
     * @param a 
     * @param b 
     * @param c 
     * @see http://www.blackpawn.com/texts/pointinpoly/default.html
     */
    static calculateBarycoord(point: Vec3, a: Vec3, b: Vec3, c: Vec3): Vec3 {
        const v0: Vec3 = c.subtractWith(a)
        const v1: Vec3 = b.subtractWith(a)
        const v2: Vec3 = point.subtractWith(a)

        const dot00: number = v0.dotWith(v0)
        const dot01: number = v0.dotWith(v1)
        const dot02: number = v0.dotWith(v2)
        const dot11: number = v1.dotWith(v1)
        const dot12: number = v1.dotWith(v2)

        const denom: number = (dot00 * dot11 - dot01 * dot01)

        // collinear or singular triangle
        if (closeZero(denom)) {
            // arbitrary location outside of triangle?
            // not sure if this is the best idea, maybe should be returning undefined
            return new Vec3(-2.0, -1.0, -1.0)
        }

        const invDenom: number = 1.0 / denom

        const u: number = (dot11 * dot02 - dot01 * dot12) * invDenom
        const v: number = (dot00 * dot12 - dot01 * dot02) * invDenom

        // barycentric coordinates must always sum to 1
        const target: Vec3 = new Vec3(1.0 - u - v, v, u)
        return target
    }

    static isContainsPoint(point: Vec3, a: Vec3, b: Vec3, c: Vec3): boolean {
        const barycoord: Vec3 = Triangle.calculateBarycoord(point, a, b, c)
        return (barycoord.x >= 0.0) && (barycoord.y >= 0)
            && ((barycoord.x + barycoord.y) <= 1.0)
    }

    static calculateUV(point: Vec3, a: Vec3, b: Vec3, c: Vec3, uv1: Vec3, uv2: Vec3, uv3: Vec3): Vec3 {
        const barycoord: Vec3 = Triangle.calculateBarycoord(point, a, b, c)
        let target: Vec3 = Vec3.zero()

        target = target.addWith(uv1.scale(barycoord.x))
        target = target.addWith(uv2.scale(barycoord.y))
        target = target.addWith(uv3.scale(barycoord.z))

        return target
    }

    static frontFacing(a: Vec3, b: Vec3, c: Vec3, direction: Vec3): boolean {
        const v0: Vec3 = c.subtractWith(b)
        const v1: Vec3 = a.subtractWith(b)

        const n: Vec3 = v0.crossWith(v1)
        const dot: number = n.dotWith(direction)

        // strictly front facing
        return dot < 0.0
    }

    /**
     * Return the area of the triangle.
     */
    getArea(): number {
        const v0: Vec3 = this.c.subtractWith(this.b)
        const v1: Vec3 = this.a.subtractWith(this.b)

        const n: Vec3 = v0.crossWith(v1)

        const area: number = n.length() * 0.5

        return area
    }

    /**
     * Calculate the midpoint of the triangle.
     */
    getMidpoint(): Vec3 {
        const v0: Vec3 = this.a.addWith(this.b)
        const v1: Vec3 = v0.addWith(this.c)

        const m: Vec3 = v1.scale(1.0 / 3.0)
        return m
    }

    /**
     * Calculate the normal vector of the triangle at the given point
     * @param point the point to calculate the normal
     */
    normalAt(point: Vec3): Vec3 {
        const n: Vec3 = Triangle.calculateNormal(this.a, this.b, this.c)
        return n.normalize()
    }

    /**
     * Calculate a plane based on the triangle.
     */
    getPlane(): Plane {
        const plane: Plane = Plane.fromCoplanarPoints(this.a, this.b, this.c)
        return plane
    }

    /**
     * Return a barycentric coordinate from the given vector.
     * @param point the point for the barycentric coordinate
     */
    getBarycoord(point: Vec3): Vec3 {
        const barycoord: Vec3 = Triangle.calculateBarycoord(point, this.a, this.b, this.c)
        return barycoord
    }

    getUV(point: Vec3, uv1: Vec3, uv2: Vec3, uv3: Vec3): Vec3 {
        const uV: Vec3 = Triangle.calculateUV(point, this.a, this.b, this.c, uv1, uv2, uv3)
        return uV
    }

    /**
     * Returns true if the passed point, when projected onto the plane of the triangle, lies within the triangle.
     * @param point the point to check
     */
    containsPoint(point: Vec3): boolean {
        const contains: boolean = Triangle.isContainsPoint(point, this.a, this.b, this.c)
        return contains
    }

    /**
     * checks if the triangle is front facing
     * @param direction the direction to check
     */
    isFrontFacing(direction: Vec3): boolean {
        const frontFacing: boolean = Triangle.frontFacing(this.a, this.b, this.c, direction)
        return frontFacing
    }

    /**
     * Returns the closest point on the triangle to point.
     * @param point the point to get the closest to
     */
    closestPointToPoint(point: Vec3): Vec3 {
        // algorithm thanks to Real-Time Collision Detection by Christer Ericson,
        // published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
        // under the accompanying license; see chapter 5.1.5 for detailed explanation.
        // basically, we're distinguishing which of the voronoi regions of the triangle
        // the point lies in with the minimum amount of redundant computation.

        const vab: Vec3 = this.b.subtractWith(this.a)
        const vac: Vec3 = this.c.subtractWith(this.a)
        const vap: Vec3 = point.subtractWith(this.a)

        const d1: number = vab.dotWith(vap)
        const d2: number = vac.dotWith(vap)

        if (d1 <= 0.0 && d2 <= 0.0) {
            // vertex region of A; barycentric coords (1, 0, 0)
            const target: Vec3 = this.a.clone()
            return target
        }

        const vbp: Vec3 = point.subtractWith(this.b)
        const d3: number = vab.dotWith(vbp)
        const d4: number = vac.dotWith(vbp)

        if (d3 >= 0.0 && d4 <= d3) {
            // vertex region of B; barycentric coords (0, 1, 0)
            const target: Vec3 = this.b.clone()
            return target
        }

        const vc: number = d1 * d4 - d3 * d2
        if (vc <= 0.0 && d1 >= 0.0 && d3 <= 0.0) {
            const v: number = d1 / (d1 - d3)
            // edge region of AB; barycentric coords (1-v, v, 0)
            const target: Vec3 = this.a.addWith(vab.scale(v))
            return target
        }

        const vcp: Vec3 = point.subtractWith(this.c)
        const d5: number = vab.dotWith(vcp)
        const d6: number = vac.dotWith(vcp)

        if (d6 >= 0.0 && d5 <= d6) {
            // vertex region of C; barycentric coords (0, 0, 1)
            const target: Vec3 = this.c.clone()
            return target
        }

        const vb: number = d5 * d2 - d1 * d6
        if (vb <= 0 && d2 >= 0 && d6 <= 0) {
            const w: number = d2 / (d2 - d6)
            // edge region of AC; barycentric coords (1-w, 0, w)
            const target: Vec3 = this.a.addWith(vac.scale(w))
            return target
        }

        const va: number = d3 * d6 - d5 * d4
        if (va <= 0.0 && (d4 - d3) >= 0.0 && (d5 - d6) >= 0.0) {
            const vbc: Vec3 = this.c.subtractWith(this.b)
            const w: number = (d4 - d3) / ((d4 - d3) + (d5 - d6))
            // edge region of BC; barycentric coords (0, 1-w, w)
            const target: Vec3 = this.b.addWith(vbc.scale(w))
            return target
        }

        // face region
        const denom: number = 1.0 / (va + vb + vc)
        // u = va * denom
        const v: number = vb * denom;
        const w: number = vc * denom;

        const v0: Vec3 = this.a.addWith(vab.scale(v))
        const target: Vec3 = v0.addWith(vac.scale(w))
        return target
    }

    /**
     * Intersect this Ray with this Triangle, returning the intersection point or undefined if there is no intersection. 
     * @param ray the ray to intersect with this triangle
     */
    intersectRay(ray: Ray): Vec3 | undefined {
        return ray.intersectTriangle(this)
    }

}