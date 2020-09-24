import { Mathf } from '../Mathf';
import { Point2 } from './point2';
import { Vec2 } from './vec2';

/**
 * [a c e]
 * [b d f]
 * [0 0 1]
 */
export class Transform2 {

    a: number | undefined;
    b: number | undefined;
    c: number | undefined;
    d: number | undefined;
    e: number | undefined;
    f: number | undefined;

    constructor(a: number, b: number, c: number, d: number, e: number, f: number) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.e = e
        this.f = f
    }

    scale(sx: number, sy: number): Transform2 {
        const t: Transform2 = this.clone()

        if (Mathf.closeZero(t.a)) {
            t.a = sx
        } else {
            t.a *= sx
        }

        t.b *= sx
        t.c *= sy

        if (Mathf.closeZero(t.d)) {
            t.d = sy
        } else {
            t.d *= sy
        }

        return t
    }

    scaleWith(v: Vec2): Transform2 {
        return this.scale(v.x, v.y)
    }

    det(): number {
        return this.a * this.d - this.b * this.c
    }

    inverse(): Transform2 {
        const det: number = this.det()
        if (Mathf.closeZero(det)) {
            return Transform2.identity()
        }

        const a: number = this.d / det
        const b: number = -this.b / det
        const c: number = -this.c / det
        const d: number = this.a / det
        const e: number = (this.c * this.f - this.d * this.e) / det
        const f: number = (this.b * this.e - this.a * this.f) / det

        return new Transform2(a, b, c, d, e, f)
    }

    multiply(t: Transform2): Transform2 {
        const a: number = t.a * this.a + t.b * this.c;
        const b: number = t.a * this.b + t.b * this.d;
        const c: number = t.c * this.a + t.d * this.c;
        const d: number = t.c * this.b + t.d * this.d;
        const e: number = t.e * this.a + t.f * this.c + this.e;
        const f: number = t.e * this.b + t.f * this.d + this.f;

        return new Transform2(a, b, c, d, e, f)
    }

    transform(x: number, y: number): Point2 {
        const x2: number = this.a * x + this.c * y + this.e;
        const y2: number = this.b * x + this.d * y + this.f;
        return new Point2(x2, y2)
    }

    transformVec(v: Vec2): Vec2 {
        const p: Point2 = this.transform(v.x, v.y)
        return new Vec2(p.x, p.y)
    }

    transformPoint(p: Point2) {
        return this.transform(p.x, p.y)
    }

    scaleX(): number {
        return Math.sqrt(this.a * this.a + this.b * this.b)
    }

    scaleY(): number {
        return Math.sqrt(this.c * this.c + this.d * this.d)
    }

    translateX(): number {
        return this.e
    }

    translateY(): number {
        return this.f
    }

    static identity(): Transform2 {
        return new Transform2(
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0
        )
    }

    translate(dx: number, dy: number): Transform2 {
        const translate: Transform2 = new Transform2(1.0, 0.0, 0.0, 1.0, dx, dy)

        const result: Transform2 = this.multiply(translate)
        return result
    }

    rotate(theta: number): Transform2 {
        const cosAngle: number = Math.cos(theta);
        const sinAngle: number = Math.sin(theta);
        const rotate: Transform2 = new Transform2(cosAngle, sinAngle, -sinAngle, cosAngle, 0.0, 0.0);

        const result: Transform2 = this.multiply(rotate)
        return result
    }

    rotateDegrees(theta: number): Transform2 {
        const angle: number = Mathf.toRadians(theta)
        return this.rotate(angle)
    }

    clone(): Transform2 {
        return new Transform2(
            this.a, this.b, this.c, this.d, this.e, this.f
        )
    }
}