import { closeZero } from '../math-functions'
import { Point2 } from './point2'
import { Point3 } from './point3'
import { Vec2 } from './vec2'
import { Vec3 } from './vec3'

/*
* A class representing a 3x3 matrix.
*/
export class Matrix3 {

    private elements: number[]

    /**
     * Creates and initializes the 3D Matrix to the 3x3. 
     * The constructor takes the arguments in row-major order, while internally they are stored in the elements array in column-major order.
     * @param n11 
     * @param n12 
     * @param n13 
     * @param n21 
     * @param n22 
     * @param n23 
     * @param n31 
     * @param n32 
     * @param n33 
     */
    constructor(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number) {
        this.elements = [
            n11, n21, n31,
            n12, n22, n32,
            n13, n23, n33
        ]
    }

    /**
     * Creates and initializes the 3D Matrix to the 3x3 with zero values. 
     */
    static zero(): Matrix3 {
        const m: Matrix3 = new Matrix3(
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0
        )
        return m
    }

    /**
     * Creates and initializes the 3D Matrix to the 3x3 identity matrix.
     */
    static identity(): Matrix3 {
        const m: Matrix3 = new Matrix3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        )
        return m
    }

    clone(): Matrix3 {
        const te: number[] = this.elements
        const m: Matrix3 = new Matrix3(
            te[0], te[3], te[6],
            te[1], te[4], te[7],
            te[2], te[5], te[8]
        )
        return m
    }

    multiplyWith(m: Matrix3): Matrix3 {
        return Matrix3.multiplyMatrices(this, m)
    }

    premultiplyWith(m: Matrix3): Matrix3 {
        return Matrix3.multiplyMatrices(m, this)
    }

    static multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3 {
        const ae: number[] = a.elements
        const be: number[] = b.elements

        const result: Matrix3 = Matrix3.zero()
        const te: number[] = result.elements

        const a11 = ae[0], a12 = ae[3], a13 = ae[6];
        const a21 = ae[1], a22 = ae[4], a23 = ae[7];
        const a31 = ae[2], a32 = ae[5], a33 = ae[8];

        const b11 = be[0], b12 = be[3], b13 = be[6];
        const b21 = be[1], b22 = be[4], b23 = be[7];
        const b31 = be[2], b32 = be[5], b33 = be[8];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return result
    }

    multiplyScalar(s: number): Matrix3 {
        const result: Matrix3 = this.clone()
        const te: number[] = result.elements

        te[0] *= s; te[3] *= s; te[6] *= s;
        te[1] *= s; te[4] *= s; te[7] *= s;
        te[2] *= s; te[5] *= s; te[8] *= s;

        return result
    }

    determinant(): number {
        const te: number[] = this.elements;

        const a: number = te[0]
        const b: number = te[1]
        const c: number = te[2]
        const d: number = te[3]
        const e: number = te[4]
        const f: number = te[5]
        const g: number = te[6]
        const h: number = te[7]
        const i: number = te[8]

        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }

    inverse(): Matrix3 {
        const result: Matrix3 = Matrix3.zero()
        const me: number[] = result.elements
        const te: number[] = this.elements

        const n11: number = me[0], n21: number = me[1], n31: number = me[2],
            n12: number = me[3], n22: number = me[4], n32: number = me[5],
            n13: number = me[6], n23: number = me[7], n33: number = me[8],

            t11: number = n33 * n22 - n32 * n23,
            t12: number = n32 * n13 - n33 * n12,
            t13: number = n23 * n12 - n22 * n13,

            det: number = n11 * t11 + n21 * t12 + n31 * t13;

        if (closeZero(det)) {
            return Matrix3.zero()
        }

        const detInv: number = 1.0 / det;

        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;

        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;

        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;

        return result;

    }

    transpose(): Matrix3 {
        const result: Matrix3 = this.clone()
        const m: number[] = result.elements

        let tmp: number;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return result
    }

    normalMatrix(): Matrix3 {
        const inverse: Matrix3 = this.inverse()
        const transpose: Matrix3 = inverse.transpose()

        return transpose
    }

    static transform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): Matrix3 {
        const c: number = Math.cos(rotation);
        const s: number = Math.sin(rotation);

        const m: Matrix3 = new Matrix3(
            sx * c, sx * s, - sx * (c * cx + s * cy) + cx + tx,
            - sy * s, sy * c, - sy * (- s * cx + c * cy) + cy + ty,
            0.0, 0.0, 1.0
        )

        return m
    }

    scale(sx: number, sy: number): Matrix3 {
        const result: Matrix3 = this.clone()
        const te: number[] = result.elements

        te[0] *= sx; te[3] *= sx; te[6] *= sx;
        te[1] *= sy; te[4] *= sy; te[7] *= sy;

        return result
    }

    rotate(theta: number): Matrix3 {
        const result: Matrix3 = this.clone()
        const te: number[] = result.elements

        const c: number = Math.cos(theta);
        const s: number = Math.sin(theta);

        const a11: number = te[0], a12: number = te[3], a13: number = te[6];
        const a21: number = te[1], a22: number = te[4], a23: number = te[7];

        te[0] = c * a11 + s * a21;
        te[3] = c * a12 + s * a22;
        te[6] = c * a13 + s * a23;

        te[1] = - s * a11 + c * a21;
        te[4] = - s * a12 + c * a22;
        te[7] = - s * a13 + c * a23;

        return result
    }

    translate(tx: number, ty: number): Matrix3 {
        const result: Matrix3 = this.clone()
        const te: number[] = result.elements

        te[0] += tx * te[2]; te[3] += tx * te[5]; te[6] += tx * te[8];
        te[1] += ty * te[2]; te[4] += ty * te[5]; te[7] += ty * te[8];

        return result
    }

    applyVec2(v: Vec2): Vec2 {
        const x: number = v.x
        const y: number = v.y
        const e: number[] = this.elements

        const dx: number = e[0] * x + e[3] * y + e[6];
        const dy: number = e[1] * x + e[4] * y + e[7];

        return new Vec2(dx, dy)
    }

    applyPoint2(p: Point2): Point2 {
        const v: Vec2 = new Vec2(p.x, p.y)
        const r: Vec2 = this.applyVec2(v)
        return new Point2(r.x, r.y)
    }

    applyVec3(v: Vec3): Vec3 {
        const x: number = v.x
        const y: number = v.y
        const z: number = v.z
        const e: number[] = this.elements

        const dx: number = e[0] * x + e[3] * y + e[6] * z;
        const dy: number = e[1] * x + e[4] * y + e[7] * z;
        const dz: number = e[2] * x + e[5] * y + e[8] * z;

        return new Vec3(dx, dy, dz)
    }

    applyPoint3(p: Point3): Point3 {
        const v: Vec3 = new Vec3(p.x, p.y, p.z)
        const r: Vec3 = this.applyVec3(v)
        return new Point3(r.x, r.y, r.z)
    }

    at(index: number): number {
        return this.elements[index]
    }

}