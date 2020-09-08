import { ScriptMath } from '../script.math'
import { Matrix3 } from './matrix3'
import { Matrix4 } from './matrix4'
import { Point3 } from './point3'
import { Vec3 } from './vec3'

export class Quaternion {
    x: number | undefined
    y: number | undefined
    z: number | undefined
    w: number | undefined

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    static zero(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 1.0)
    }

    clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w)
    }

    fromEuler(x: number, y: number, z: number): Quaternion {
        const result: Quaternion = Quaternion.zero()

        const c1: number = Math.cos(x / 2.0)
        const c2: number = Math.cos(y / 2.0)
        const c3: number = Math.cos(z / 2.0)

        const s1: number = Math.sin(x / 2.0)
        const s2: number = Math.sin(y / 2.0)
        const s3: number = Math.sin(z / 2.0)

        // xyz
        result.x = s1 * c2 * c3 + c1 * s2 * s3
        result.y = c1 * s2 * c3 - s1 * c2 * s3
        result.z = c1 * c2 * s3 + s1 * s2 * c3
        result.w = c1 * c2 * c3 - s1 * s2 * s3

        return result
    }

    fromEulerWith(v: Vec3): Quaternion {
        return this.fromEuler(v.x, v.y, v.z)
    }

    fromAxisAngle(x: number, y: number, z: number, angle: number): Quaternion {
        const result: Quaternion = Quaternion.zero()

        const halfAngle: number = angle / 2.0
        const s: number = Math.sin(halfAngle)

        result.x = x * s
        result.y = y * s
        result.z = z * s
        result.w = Math.cos(halfAngle)

        return result
    }

    fromAxisAngleWith(v: Vec3, angle: number): Quaternion {
        return this.fromAxisAngle(v.x, v.y, v.z, angle)
    }

    private fromMatrix(
        m11: number, m12: number, m13: number,
        m21: number, m22: number, m23: number,
        m31: number, m32: number, m33: number): Quaternion {

        const result: Quaternion = Quaternion.zero()

        const trace: number = m11 + m22 + m33;

        if (trace > 0.0) {

            const s: number = 0.5 / Math.sqrt(trace + 1.0);

            result.w = 0.25 / s;
            result.x = (m32 - m23) * s;
            result.y = (m13 - m31) * s;
            result.z = (m21 - m12) * s;

        } else if (m11 > m22 && m11 > m33) {

            const s: number = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

            result.w = (m32 - m23) / s;
            result.x = 0.25 * s;
            result.y = (m12 + m21) / s;
            result.z = (m13 + m31) / s;

        } else if (m22 > m33) {

            const s: number = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

            result.w = (m13 - m31) / s;
            result.x = (m12 + m21) / s;
            result.y = 0.25 * s;
            result.z = (m23 + m32) / s;

        } else {

            const s: number = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

            result.w = (m21 - m12) / s;
            result.x = (m13 + m31) / s;
            result.y = (m23 + m32) / s;
            result.z = 0.25 * s;
        }

        return result
    }

    fromMatrix3(m: Matrix3): Quaternion {
        return this.fromMatrix(
            m.at(0), m.at(4), m.at(8),
            m.at(1), m.at(5), m.at(9),
            m.at(2), m.at(6), m.at(9),
        )
    }

    fromMatrix4(m: Matrix4): Quaternion {
        return this.fromMatrix(
            m.at(0), m.at(4), m.at(8),
            m.at(1), m.at(5), m.at(9),
            m.at(2), m.at(6), m.at(9),
        )
    }

    fromUnitVectors(vFrom: Vec3, vTo: Vec3): Quaternion {
        const eps: number = ScriptMath.epsilon
        const result: Quaternion = Quaternion.zero()

        let r: number = vFrom.dotWith(vTo)

        if (r < eps) {
            r = 0.0
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                result.x = - vFrom.y;
                result.y = vFrom.x;
                result.z = 0.0;
                result.w = r;
            } else {
                result.x = 0.0;
                result.y = - vFrom.z;
                result.z = vFrom.y;
                result.w = r;
            }
        } else {
            // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
            result.x = vFrom.y * vTo.z - vFrom.z * vTo.y;
            result.y = vFrom.z * vTo.x - vFrom.x * vTo.z;
            result.z = vFrom.x * vTo.y - vFrom.y * vTo.x;
            result.w = r;
        }

        const n: Quaternion = result.normalize();
        return n
    }

    angleTo(q: Quaternion): number {
        return 2.0 * Math.acos(Math.abs(ScriptMath.clamp(-1.0, this.dot(q), 1.0)))
    }

    static identity(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 1.0)
    }

    inverse(): Quaternion {
        return this.conjugate()
    }

    conjugate(): Quaternion {
        const result: Quaternion = this.clone()

        result.x *= - 1;
        result.y *= - 1;
        result.z *= - 1;

        return result
    }

    dot(q: Quaternion): number {
        return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }

    length(): number {
        const lengthSquared: number = this.lengthSquared()
        return Math.sqrt(lengthSquared)
    }

    normalize(): Quaternion {
        const result: Quaternion = this.clone()

        let l: number = this.length()

        if (ScriptMath.closeZero(l)) {
            return Quaternion.identity()
        }

        result.x = result.x / l
        result.y = result.y / l
        result.z = result.z / l
        result.w = result.w / l

        return result
    }

    multiply(q: Quaternion): Quaternion {
        return Quaternion.multiplyQuaternions(this, q)
    }

    premultiply(q: Quaternion): Quaternion {
        return Quaternion.multiplyQuaternions(q, this)
    }

    static multiplyQuaternions(a: Quaternion, b: Quaternion): Quaternion {
        const qax: number = a.x, qay: number = a.y, qaz: number = a.z, qaw: number = a.w;
        const qbx: number = b.x, qby: number = b.y, qbz: number = b.z, qbw: number = b.w;

        const result: Quaternion = Quaternion.zero()

        result.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        result.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        result.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        result.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return result
    }

    slerp(q: Quaternion, t: number): Quaternion {
        t = ScriptMath.clamp(0.0, t, 1.0)

        const result: Quaternion = this.clone()

        if (ScriptMath.closeZero(t)) {
            return result
        }

        if (ScriptMath.closeEquals(1.0, t)) {
            return q.clone()
        }

        const x: number = result.x
        const y: number = this.y
        const z: number = this.z
        const w: number = this.w;

        let cosHalfTheta: number = w * q.w + x * q.x + y * q.y + z * q.z;

        if (cosHalfTheta < 0.0) {
            result.w = - q.w;
            result.x = - q.x;
            result.y = - q.y;
            result.z = - q.z;
            cosHalfTheta = - cosHalfTheta;
        } else {
            result.w = q.w;
            result.x = q.x;
            result.y = q.y;
            result.z = q.z;
        }

        if (cosHalfTheta >= 1.0) {
            result.w = w;
            result.x = x;
            result.y = y;
            result.z = z;

            return result
        }

        const sqrSinHalfTheta: number = 1.0 - cosHalfTheta * cosHalfTheta

        if (sqrSinHalfTheta <= Number.EPSILON) {
            const s: number = 1.0 - t;
            result.w = s * w + t * result.w;
            result.x = s * x + t * result.x;
            result.y = s * y + t * result.y;
            result.z = s * z + t * result.z;

            return result
        }

        const sinHalfTheta: number = Math.sqrt(sqrSinHalfTheta)
        const halfTheta: number = Math.atan2(sinHalfTheta, cosHalfTheta)
        const ratioA: number = Math.sin((1.0 - t) * halfTheta) / sinHalfTheta
        const ratioB: number = Math.sin(t * halfTheta) / sinHalfTheta

        result.w = (w * ratioA + result.w * ratioB);
        result.x = (x * ratioA + result.x * ratioB);
        result.y = (y * ratioA + result.y * ratioB);
        result.z = (z * ratioA + result.z * ratioB);

        return result
    }

    applyVec3(v: Vec3): Vec3 {
        const x: number = v.x
        const y: number = v.y
        const z: number = v.z

        const qx: number = this.x
        const qy: number = this.y
        const qz: number = this.z
        const qw: number = this.w

        // calculate quat * vector
        const ix: number = qw * x + qy * z - qz * y;
        const iy: number = qw * y + qz * x - qx * z;
        const iz: number = qw * z + qx * y - qy * x;
        const iw: number = - qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        const dx: number = ix * qw + iw * - qx + iy * - qz - iz * - qy;
        const dy: number = iy * qw + iw * - qy + iz * - qx - ix * - qz;
        const dz: number = iz * qw + iw * - qz + ix * - qy - iy * - qx;

        return new Vec3(dx, dy, dz)
    }

    applyPoint3(p: Point3): Point3 {
        const v: Vec3 = new Vec3(p.x, p.y, p.z)
        const r: Vec3 = this.applyVec3(v)
        return new Point3(r.x, r.y, r.z)
    }
}