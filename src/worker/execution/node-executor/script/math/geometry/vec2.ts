import { Mathf } from '../Mathf';
import { Matrix3 } from './matrix3';
/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y)
 */
export class Vec2 {

    /**
     * the x value of this vector. Default is 0.
     */
    x: number | undefined;
    /**
     * the y value of this vector. Default is 0.
     */
    y: number | undefined;

    /**
     * creates a new 2D vector
     * @param x the x value of the vector
     * @param y the y value of the vector
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculates the dot product of this vector and given x and y
     * @param x the x value
     * @param y the y value
     */
    dot(x: number, y: number): number {
        return (this.x * x + this.y * y)
    }

    /**
     * Calculates the dot product of this vector and v.
     * @see Vec2.dot()
     * @param v the other vector to calculate the dot product
     */
    dotWith(v: Vec2): number {
        return this.dot(v.x, v.y)
    }

    /**
     * Calculates the cross product of this vector and given x and y. 
     * Note that a 'cross-product' in 2D is not well-defined. 
     * This function computes a geometric cross-product often used in 2D graphics
     * @param x the x value
     * @param y the y value
     */
    cross(x: number, y: number): number {
        return this.x * y - this.y * x
    }

    /**
     * Calculates the cross product of this vector and v.
     * @see Vec2.cross()
     * @param v the other vector to calculate the cross product
     */
    crossWith(v: Vec2): number {
        return this.cross(v.x, v.y)
    }

    /**
     * Computes the square of the Euclidean length (straight-line length) from (0, 0) to (x, y). 
     * If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.
     */
    lengthSquared(): number {
        return (this.x * this.x + this.y * this.y)
    }

    /**
     * Computes the Euclidean length (straight-line length) from (0, 0) to (x, y).
     */
    length(): number {
        const sqLength: number = this.lengthSquared()
        return Math.sqrt(sqLength)
    }

    /**
     * Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.
     */
    normalize(): Vec2 {
        const l: number = this.length()
        if (Mathf.closeZero(l)) {
            return new Vec2(0.0, 0.0)
        }
        const x: number = this.x / l
        const y: number = this.y / l
        return new Vec2(x, y)
    }

    /**
     * Calculates the angle between this vector and given x and y by using the dot product.
     * @param x the x value
     * @param y the y value
     */
    angle(x: number, y: number): number {
        const dot: number = this.dot(x, y)
        const l1: number = this.length()
        const l2: number = Math.sqrt(x * x + y * y)

        const a: number = Math.acos(dot / (l1 * l2))
        return a
    }

    /**
     * Calculates the angle between this vector and given x and y by using the dot product.
     * @see Vec2.angle()
     * @param v the other vector to calculate the angle between
     */
    angleWith(v: Vec2): number {
        return this.angle(v.x, v.y)
    }

    /**
     * Multiplies this vector by scalar s.
     * @param s the scalar
     */
    scale(s: number): Vec2 {
        const x: number = this.x * s
        const y: number = this.y * s
        return new Vec2(x, y)
    }

    /**
     * Adds x and y to this vector
     * @param x the x value
     * @param y the y value
     */
    add(x: number, y: number): Vec2 {
        const dx: number = this.x + x
        const dy: number = this.y + y
        return new Vec2(dx, dy)
    }

    /**
     * Adds v to this vector.
     * @see Vec2.add()
     * @param v the other vector to add
     */
    addWith(v: Vec2): Vec2 {
        return this.add(v.x, v.y)
    }

    /**
     * Multiplies this vector by x and y.
     * @param x the x value
     * @param y the y value
     */
    multiply(x: number, y: number): Vec2 {
        const dx: number = this.x * x
        const dy: number = this.y * y
        return new Vec2(dx, dy)
    }

    /**
     * Multiplies this vector by v.
     * @see Vec2.multiply()
     * @param v the other vector to multiply
     */
    multiplyWith(v: Vec2): Vec2 {
        return this.multiply(v.x, v.y)
    }

    /**
     * Divides this vector by x and y.
     * @param x the x value
     * @param y the y value
     */
    divide(x: number, y: number): Vec2 {
        const dx: number = this.x / x
        const dy: number = this.y / y
        return new Vec2(dx, dy)
    }

    /**
     * Divides this vector by v.
     * @see Vec2.divide()
     * @param v the other vector to divide
     */
    divideWith(v: Vec2): Vec2 {
        return this.divide(v.x, v.y)
    }

    /**
     * Subtracts x and y from this vector.
     * @param x the x value
     * @param y the y value
     */
    subtract(x: number, y: number): Vec2 {
        const dx: number = this.x - x
        const dy: number = this.y - y
        return new Vec2(dx, dy)
    }

    /**
     * Subtracts v from this vector.
     * @see Vec2.subtract()
     * @param v the other vector to subtract
     */
    subtractWith(v: Vec2): Vec2 {
        return this.subtract(v.x, v.y)
    }

    /**
     * Inverts this vector - i.e. sets x = -x and y = -y.
     */
    inverse(): Vec2 {
        const x: number = this.x * -1.0
        const y: number = this.y * -1.0
        return new Vec2(x, y)
    }

    /**
     * Returns a new 2D vector with the same x and y values as this one.
     */
    clone(): Vec2 {
        const x: number = this.x
        const y: number = this.y
        return new Vec2(x, y)
    }

    /**
     * Returns an perpendicular 2D vector in clockwise direction
     */
    perpendicularCW(): Vec2 {
        const x: number = this.y
        const y: number = -this.x
        return new Vec2(x, y)
    }

    /**
     * Returns an perpendicular 2D vector in counterclockwise direction
     */
    perpendicularCCW(): Vec2 {
        const x: number = -this.y
        const y: number = this.x
        return new Vec2(x, y)
    }

    /**
     * Returns a new 2D vector, where each component of the vector are set to a pseudo-random value between 0 and 1, excluding 1.
     */
    static random(): Vec2 {
        const x: number = Math.random()
        const y: number = Math.random()

        return new Vec2(x, y)
    }

    applyMatrix3(m: Matrix3): Vec2 {
        return m.applyVec2(this)
    }

    /**
     * Rotates this vector around center cx and cy by given angle in radians.
     * @param cx the x value of the center point around which to rotate.
     * @param cy the y value of the center point around which to rotate.
     * @param angle the angle to rotate, in radians.
     */
    rotateAround(cx: number, cy: number, angle: number): Vec2 {
        const c: number = Math.cos(angle)
        const s: number = Math.sin(angle);

        const x: number = this.x - cx;
        const y: number = this.y - cy;

        const dx: number = x * c - y * s + cx;
        const dy: number = x * s + y * c + cy;

        return new Vec2(dx, dy)
    }

    /**
     * Rotates this vector around center by given angle in radians.
     * @param center the point around which to rotate.
     * @param angle the angle to rotate, in radians.
     */
    rotateAroundWith(center: Vec2, angle: number): Vec2 {
        return this.rotateAround(center.x, center.y, angle)
    }

    /**
     * Returns a unit vector for the x axis (1.0, 0.0)
     */
    static xAxis(): Vec2 {
        const v: Vec2 = new Vec2(1.0, 0.0);
        return v
    }

    /**
     * Returns a unit vector for the y axis (0.0, 1.0)
     */
    static yAxis(): Vec2 {
        const v: Vec2 = new Vec2(0.0, 1.0);
        return v
    }

}