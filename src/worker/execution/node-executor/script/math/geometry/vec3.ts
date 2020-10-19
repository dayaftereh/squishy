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

    /**
     * Computes the square of the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z). 
     */
    lengthSquared(): number {
        return (this.x * this.x + this.y * this.y + this.z * this.z)
    }

    /**
     * Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
     */
    length(): number {
        const lengthSquared: number = this.lengthSquared()
        return Math.sqrt(lengthSquared)
    }

    /**
     * Calculate the dot product of this vector and the given parameters.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    dot(x: number, y: number, z: number): number {
        return (this.x * x + this.y * y + this.z * z)
    }

    /**
     * Calculate the dot product of this vector and v.
     * @param v the other vector
     * @see Vec3.dot()
     */
    dotWith(v: Vec3): number {
        return this.dot(v.x, v.y, v.z)
    }

    /**
     * Convert this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.
     */
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

    /**
     * returns the cross product of this vec3 and the given parameters.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    cross(x: number, y: number, z: number): Vec3 {
        const dx: number = this.y * z - this.z * y
        const dy: number = x * this.z - z * this.x
        const dz: number = this.x * y - this.y * x

        return new Vec3(dx, dy, dz)
    }

    /**
     * returns the cross product of this vec3 and v.
     * @param v the other vector
     * @see Vec3.cross()
     */
    crossWith(v: Vec3): Vec3 {
        return this.cross(v.x, v.y, v.z)
    }

    /**
     * Multiplies this vector and the scalar s to a new vector vector.
     * @param s the scalar
     */
    scale(s: number): Vec3 {
        const x: number = this.x * s
        const y: number = this.y * s
        const z: number = this.z * s

        return new Vec3(x, y, z)
    }

    /**
     * adds this vector and the given parameters to a new vector vector.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    add(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x + x
        const dy: number = this.y + y
        const dz: number = this.z + z
        return new Vec3(dx, dy, dz)
    }

    /**
     * adds this vector and v to a new vector vector.
     * @param v the other vector
     * @see Vec3.add()
     */
    addWith(v: Vec3): Vec3 {
        return this.add(v.x, v.y, v.z)
    }

    /**
     * Adds this vector and the multiple of v and s to a new vector vector.
     * @param v the vector to scale
     * @param s the scale factor
     * @see Vec3.scale()
     * @see Vec3.addWith()
     */
    addScaledVector(v: Vec3, s: number): Vec3 {
        const scale: Vec3 = v.scale(s)
        const target: Vec3 = this.addWith(scale)
        return target
    }

    /**
     * multiply this vector and the given parameters to a new vector vector.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    multiply(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x * x
        const dy: number = this.y * y
        const dz: number = this.z * z
        return new Vec3(dx, dy, dz)
    }

    /**
    * multiply this vector and v to a new vector vector.
    * @param v the other vector
    * @see Vec3.multiply()
    */
    multiplyWith(v: Vec3): Vec3 {
        return this.multiply(v.x, v.y, v.z)
    }

    /**
     * divide this vector and the given parameters to a new vector vector.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    divide(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x / x
        const dy: number = this.y / y
        const dz: number = this.z / z
        return new Vec3(dx, dy, dz)
    }

    /**
    * divide this vector and v to a new vector vector.
    * @param v the other vector
    * @see Vec3.divide()
    */
    divideWith(v: Vec3): Vec3 {
        return this.divide(v.x, v.y, v.z)
    }

    /**
    * subtract this vector and the given parameters to a new vector vector.
    * @param x the x coordination 
    * @param y the y coordination 
    * @param z the z coordination 
    */
    subtract(x: number, y: number, z: number): Vec3 {
        const dx: number = this.x - x
        const dy: number = this.y - y
        const dz: number = this.z - z
        return new Vec3(dx, dy, dz)
    }

    /**
    * subtract this vector and v to a new vector vector.
    * @param v the other vector
    * @see Vec3.subtract()
    */
    subtractWith(v: Vec3): Vec3 {
        return this.subtract(v.x, v.y, v.z)
    }

    /**
     * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
     */
    inverse(): Vec3 {
        const x: number = this.x * -1.0
        const y: number = this.y * -1.0
        const z: number = this.z * -1.0
        return new Vec3(x, y, z)
    }

    /**
     * Returns a new vector3 with the same x, y and z values as this one.
     */
    clone(): Vec3 {
        const x: number = this.x
        const y: number = this.y
        const z: number = this.z

        return new Vec3(x, y, z)
    }

    /**
     * Creates a new vector with each component of this vector to a pseudo-random value between 0 and 1, excluding 1.
     */
    static random(): Vec3 {
        const x: number = Math.random()
        const y: number = Math.random()
        const z: number = Math.random()

        return new Vec3(x, y, z)
    }

    /**
     * Multiplies this vector and m to a new vector vector.
     * @param m the matrix to multiply
     */
    applyMatrix3(m: Matrix3): Vec3 {
        return m.applyVec3(this)
    }

    /**
     * Multiplies this vector and m to a new vector vector.
     * @param m the matrix to multiply
     */
    applyMatrix4(m: Matrix4): Vec3 {
        return m.applyVec3(this)
    }

    /**
     * Multiplies this vector and q to a new vector vector.
     * @param q the quaternion to multiply
     */
    applyQuaternion(q: Quaternion): Vec3 {
        return q.applyVec3(this)
    }

    /**
     * Computes the squared distance from this vector to the given parameters.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    distanceSquared(x: number, y: number, z: number): number {
        const dx: number = this.x - x
        const dy: number = this.y - y
        const dz: number = this.z - z
        return dx * dx + dy * dy + dz * dz
    }

    /**
     * Computes the squared distance from this vector to the given vector p.
     * @param p the other vector
     * @see Vec3.distanceSquared()
     */
    distanceSquaredTo(p: Vec3): number {
        return this.distanceSquared(p.x, p.y, p.z)
    }

    /**
     * Computes the distance from this vector to the given parameters.
     * @param x the x coordination 
     * @param y the y coordination 
     * @param z the z coordination 
     */
    distance(x: number, y: number, z: number): number {
        const distanceSquared: number = this.distanceSquared(x, y, z)
        return Math.sqrt(distanceSquared)
    }

     /**
     * Computes the distance from this vector to the given vector p.
     * @param p the other vector
     * @see Vec3.distance()
     */
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

    /**
     * Returns a new vector with 0.0 for x, y and z
     */
    static zero(): Vec3 {
        return new Vec3(0.0, 0.0, 0.0)
    }

    /**
     * creates new orthogonal vector to this vector
     */
    orthogonal(): Vec3 {
        const n: Vec3 = this.normalize()

        if ((Math.abs(n.y) >= 0.9 * Math.abs(n.x)) && (Math.abs(n.z) >= 0.9 * Math.abs(n.x))) {
            return new Vec3(0.0, -n.z, n.y)
        } else if ((Math.abs(n.x) >= 0.9 * Math.abs(n.y)) && (Math.abs(n.z) >= 0.9 * Math.abs(n.y))) {
            return new Vec3(-n.z, 0.0, n.x);
        }
        return new Vec3(-n.y, n.x, 0.0);
    }

    /**
     * Reflect this vector off of plane orthogonal to normal. Normal is assumed to have unit length.
     * @param normal the normal to the reflecting plane
     */
    reflect(normal: Vec3): Vec3 {
        const dot: number = this.dotWith(normal)
        const n: Vec3 = normal.scale(2.0 * dot)
        const target: Vec3 = this.subtractWith(n)
        return target
    }

}