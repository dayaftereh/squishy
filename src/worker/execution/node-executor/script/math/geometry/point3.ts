import { Vec3 } from './vec3'

export class Point3 {

    x: number | undefined
    y: number | undefined
    z: number | undefined

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    translate(dx: number, dy: number, dz: number): Point3 {
        const x: number = this.x + dx
        const y: number = this.y + dy
        const z: number = this.z + dz

        return new Point3(x, y, z)
    }

    translateWith(v: Vec3): Point3 {
        return this.translate(v.x, v.y, v.z)
    }

    translateDirection(direction: Vec3, length: number): Point3 {
        const v: Vec3 = direction.scale(length)
        return this.translateWith(v)
    }

    distanceSquared(x: number, y: number, z: number): number {
        const dx: number = this.x - x
        const dy: number = this.y - y
        const dz: number = this.z - z
        return dx * dx + dy * dy + dz * dz
    }

    distanceSquaredTo(p: Point3): number {
        return this.distanceSquared(p.x, p.y, p.z)
    }

    distance(x: number, y: number, z: number): number {
        const distanceSquared: number = this.distanceSquared(x, y, z)
        return Math.sqrt(distanceSquared)
    }

    distanceTo(p: Point3): number {
        return this.distance(p.x, p.y, p.z)
    }

    subtract(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x - x
        const dy: number = this.y - y
        const dz: number = this.z - z
        return new Vec3(dx, dy, dz)
    }

    subtractWith(p: Point3): Vec3 {
        return this.subtract(p.x, p.y, p.z)
    }

    center(x: number, y: number, z: number): Point3 {
        const cx: number = (this.x + x) / 2.0
        const cy: number = (this.y + y) / 2.0
        const cz: number = (this.z + z) / 2.0
        return new Point3(cx, cy, cz)
    }

    centerWith(p: Point3): Point3 {
        return this.center(p.x, p.y, p.z)
    }

    clone(): Point3 {
        const x: number = this.x
        const y: number = this.y
        const z: number = this.z
        return new Point3(x, y, z)
    }

}