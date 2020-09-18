import { Mathf } from '../Mathf';
import { Matrix3 } from './matrix3';

export class Vec2 {

    x: number | undefined;
    y: number | undefined;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    dot(x: number, y: number): number {
        return (this.x * x + this.y * y)
    }

    dotWith(v: Vec2): number {
        return this.dot(v.x, v.y)
    }

    cross(x: number, y: number): number {
        return this.x * y - this.y * x
    }

    crossWith(v: Vec2): number {
        return this.cross(v.x, v.y)
    }

    lengthSquared(): number {
        return (this.x * this.x + this.y * this.y)
    }

    length(): number {
        const sqLength: number = this.lengthSquared()
        return Math.sqrt(sqLength)
    }

    normalize(): Vec2 {
        const l: number = this.length()
        if (Mathf.closeZero(l)) {
            return new Vec2(0.0, 0.0)
        }
        const x: number = this.x / l
        const y: number = this.y / l
        return new Vec2(x, y)
    }

    angle(x: number, y: number): number {
        const dot: number = this.dot(x, y)
        const l1: number = this.length()
        const l2: number = Math.sqrt(x * x + y * y)

        const a: number = Math.acos(dot / (l1 * l2))
        return a
    }

    angleWith(v: Vec2): number {
        return this.angle(v.x, v.y)
    }

    scale(s: number): Vec2 {
        const x: number = this.x * s
        const y: number = this.y * s
        return new Vec2(x, y)
    }

    add(x: number, y: number): Vec2 {
        const dx: number = this.x + x
        const dy: number = this.y + y
        return new Vec2(dx, dy)
    }

    addWith(v: Vec2): Vec2 {
        return this.add(v.x, v.y)
    }

    multiply(x: number, y: number): Vec2 {
        const dx: number = this.x * x
        const dy: number = this.y * y
        return new Vec2(dx, dy)
    }

    multiplyWith(v: Vec2): Vec2 {
        return this.multiply(v.x, v.y)
    }

    divide(x: number, y: number): Vec2 {
        const dx: number = this.x / x
        const dy: number = this.y / y
        return new Vec2(dx, dy)
    }

    divideWith(v: Vec2): Vec2 {
        return this.divide(v.x, v.y)
    }

    subtract(x: number, y: number): Vec2 {
        const dx: number = this.x - x
        const dy: number = this.y - y
        return new Vec2(dx, dy)
    }

    subtractWith(v: Vec2): Vec2 {
        return this.subtract(v.x, v.y)
    }

    inverse(): Vec2 {
        const x: number = this.x * -1.0
        const y: number = this.y * -1.0
        return new Vec2(x, y)
    }

    clone(): Vec2 {
        const x: number = this.x
        const y: number = this.y
        return new Vec2(x, y)
    }

    perpendicularCW(): Vec2 {
        const x: number = this.y
        const y: number = -this.x
        return new Vec2(x, y)
    }

    perpendicularCCW(): Vec2 {
        const x: number = -this.y
        const y: number = this.x
        return new Vec2(x, y)
    }

    random(): Vec2 {
        const x: number = Math.random()
        const y: number = Math.random()

        return new Vec2(x, y)
    }

    applyMatrix3(m: Matrix3): Vec2 {
        return m.applyVec2(this)
    }

    rotateAround(cx: number, cy: number, angle: number): Vec2 {
        const c: number = Math.cos(angle)
        const s: number = Math.sin(angle);

        const x: number = this.x - cx;
        const y: number = this.y - cy;

        const dx: number = x * c - y * s + cx;
        const dy: number = x * s + y * c + cy;

        return new Vec2(dx, dy)
    }

    rotateAroundWith(center: Vec2, angle: number): Vec2 {
        return this.rotateAround(center.x, center.y, angle)
    }

}