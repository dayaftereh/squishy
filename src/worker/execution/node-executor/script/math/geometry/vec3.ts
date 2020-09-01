export class Vec3 {

    x: number | undefined
    y: number | undefined
    z: number | undefined

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    lengthSquared(): number {
        return (this.x * this.x + this.y * this.y + this.z * this.z)
    }

    length(): number {
        const lengthSquared: number = this.lengthSquared()
        return Math.sqrt(lengthSquared)
    }

    dot(x: number, y: number, z: number): number {
        return (this.x * x + this.y * y + this.z * z)
    }

    dotWith(v: Vec3): number {
        return this.dot(v.x, v.y, v.z)
    }

    normalize(): Vec3 {
        const l: number = this.length()
        const x: number = this.x / l
        const y: number = this.y / l
        const z: number = this.z / l
        return new Vec3(x, y, z)
    }

    cross(x: number, y: number, z: number): Vec3 {
        const dx: number = this.y * z - this.z * y
        const dy: number = x * this.z - z * this.x
        const dz: number = this.x * y - this.y * x

        return new Vec3(dx, dy, dz)
    }

    crossWith(v: Vec3): Vec3 {
        return this.cross(v.x, v.y, v.z)
    }

    scale(s: number): Vec3 {
        const x: number = this.x * s
        const y: number = this.y * s
        const z: number = this.z * s

        return new Vec3(x, y, z)
    }

    add(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x + x
        const dy: number = this.y + y
        const dz: number = this.z + z
        return new Vec3(dx, dy, dz)
    }

    addWith(v: Vec3): Vec3 {
        return this.add(v.x, v.y, v.z)
    }

    multiply(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x * x
        const dy: number = this.y * y
        const dz: number = this.z * z
        return new Vec3(dx, dy, dz)
    }

    multiplyWith(v: Vec3): Vec3 {
        return this.multiply(v.x, v.y, v.z)
    }

    divide(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x / x
        const dy: number = this.y / y
        const dz: number = this.z / z
        return new Vec3(dx, dy, dz)
    }

    divideWith(v: Vec3): Vec3 {
        return this.divide(v.x, v.y, v.z)
    }

    inverse(): Vec3 {
        const x: number = this.x * -1.0
        const y: number = this.y * -1.0
        const z: number = this.z * -1.0
        return new Vec3(x, y, z)
    }

    clone(): Vec3 {
        const x: number = this.x
        const y: number = this.y
        const z: number = this.z

        return new Vec3(x, y, z)
    }

}