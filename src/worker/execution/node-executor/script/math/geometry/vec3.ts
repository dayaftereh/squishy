import { closeZero } from '../math-functions'
import { Matrix3 } from './matrix3'
import { Matrix4 } from './matrix4'
import { Quaternion } from './quaternion'
/**
 * Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y, and z).
 */
export class Vec3 {

    /**
     * the x value of this vector. Default is 0.
     */
    x: number | undefined
    /**
     * the y value of this vector. Default is 0.
     */
    y: number | undefined
    /**
     * the z value of this vector. Default is 0.
     */
    z: number | undefined

    /**
     * Creates a new 3D vector.
     * @param x the x value of the vector.
     * @param y the y value of the vector.
     * @param z the z value of the vector.
     */
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
        if (closeZero(l)) {
            return new Vec3(0.0, 0.0, 0.0)
        }
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

    subtract(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x - x
        const dy: number = this.y - y
        const dz: number = this.z - z
        return new Vec3(dx, dy, dz)
    }

    subtractWith(v: Vec3): Vec3 {
        return this.subtract(v.x, v.y, v.z)
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

    static random(): Vec3 {
        const x: number = Math.random()
        const y: number = Math.random()
        const z: number = Math.random()

        return new Vec3(x, y, z)
    }

    applyMatrix3(m: Matrix3): Vec3 {
        return m.applyVec3(this)
    }

    applyMatrix4(m: Matrix4): Vec3 {
        return m.applyVec3(this)
    }

    applyQuaternion(q: Quaternion): Vec3 {
        return q.applyVec3(this)
    }

    distanceSquared(x: number, y: number, z: number): number {
        const dx: number = this.x - x
        const dy: number = this.y - y
        const dz: number = this.z - z
        return dx * dx + dy * dy + dz * dz
    }

    distanceSquaredTo(p: Vec3): number {
        return this.distanceSquared(p.x, p.y, p.z)
    }

    distance(x: number, y: number, z: number): number {
        const distanceSquared: number = this.distanceSquared(x, y, z)
        return Math.sqrt(distanceSquared)
    }

    distanceTo(p: Vec3): number {
        return this.distance(p.x, p.y, p.z)
    }

    /**
     * Returns a unit vector for the x axis (1.0, 0.0, 0.0)
     */
    static xAxis(): Vec3 {
        const v: Vec3 = new Vec3(1.0, 0.0, 0.0);
        return v
    }

    /**
     * Returns a unit vector for the y axis (0.0, 1.0, 0.0)
     */
    static yAxis(): Vec3 {
        const v: Vec3 = new Vec3(0.0, 1.0, 0.0);
        return v
    }

    /**
     * Returns a unit vector for the z axis (0.0, 0.0, 1.0)
     */
    static zAxis(): Vec3 {
        const v: Vec3 = new Vec3(0.0, 0.0, 1.0);
        return v
    }

}