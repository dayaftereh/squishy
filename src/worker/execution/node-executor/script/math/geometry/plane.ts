import { Vec3 } from './vec3';

export class Plane {

    normal: Vec3 | undefined
    constant: number | undefined

    constructor(normal: Vec3, constant: number) {
        this.normal = normal.normalize()
        this.constant = constant
    }

    clone(): Plane {
        const normal: Vec3 = this.normal.clone()
        return new Plane(normal, this.constant)
    }

    negate(): Plane {
        const normal: Vec3 = this.normal.inverse()
        const constant: number = this.constant * -1.0
        return new Plane(normal, constant)
    }

    distanceToPoint(point: Vec3): number {
        return this.normal.dotWith(point) + this.constant
    }

    projectPoint(point: Vec3): Vec3 {
        const distance: number = this.distanceToPoint(point)
        const n: Vec3 = this.normal.scale(-distance)
        const target: Vec3 = n.addWith(point)
        return target
    }

    translate(offset: Vec3): Plane {
        const normal: Vec3 = this.normal.clone()
        const constant: number = this.constant - offset.dotWith(this.normal)
        return new Plane(normal, constant)
    }

    coplanarPoint(): Vec3 {
        const point: Vec3 = this.normal.scale(-this.constant)
        return point
    }

    normalAt(point: Vec3): Vec3 {
        return this.normal.clone()
    }

}