import { Vec3 } from './vec3';
import { Plane } from './plane';
import { Matrix4 } from './matrix4';

export class Sphere {

    center: Vec3 | undefined
    radius: number | undefined

    constructor(center: Vec3, radius: number) {
        this.center = center
        this.radius = radius
    }

    containsPoint(point: Vec3): boolean {
        return point.distanceSquaredTo(this.center) <= (this.radius * this.radius)
    }

    distanceToPoint(point: Vec3): number {
        return point.distanceTo(this.center) - this.radius
    }

    intersectsPlane(plane: Plane): boolean {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius
    }

    translate(offset: Vec3): Sphere {
        const center: Vec3 = this.center.addWith(offset)
        return new Sphere(center, this.radius)
    }

    applyMatrix4(m: Matrix4): Sphere {
        const center: Vec3 = this.center.applyMatrix4(m)
        const radius: number = this.radius * m.maxScaleOnAxis()
        return new Sphere(center, radius)
    }
}