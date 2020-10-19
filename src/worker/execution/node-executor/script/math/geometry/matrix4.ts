import { clamp, closeEquals, closeZero } from '../math-functions'
import { Point3 } from './point3'
import { Quaternion } from './quaternion'
import { Vec3 } from './vec3'

/**
 * A class representing a 4x4 matrix.
 * The most common use of a 4x4 matrix in 3D computer graphics is as a Transformation Matrix. 
 * For an introduction to transformation matrices as used in WebGL.
 * @see https://en.wikipedia.org/wiki/Transformation_matrix
 * @see http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/
 */
export class Matrix4 {

    private elements: number[]

    /**
     * Creates a new 4x4 matrix
     * @param n11 
     * @param n12 
     * @param n13 
     * @param n14 
     * @param n21 
     * @param n22 
     * @param n23 
     * @param n24 
     * @param n31 
     * @param n32 
     * @param n33 
     * @param n34 
     * @param n41 
     * @param n42 
     * @param n43 
     * @param n44 
     */
    constructor(
        n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number) {
        this.elements = [
            n11, n21, n31, n41,
            n12, n22, n32, n42,
            n13, n23, n33, n43,
            n14, n24, n34, n44
        ]
    }

    /**
     * creates a new matrix as the 4x4 identity matrix.
     */
    static identity(): Matrix4 {
        const m: Matrix4 = new Matrix4(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
     * creates a new matrix where all elements are zero.
     */
    static zero(): Matrix4 {
        const m: Matrix4 = new Matrix4(
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0
        )
        return m
    }

    /**
     * Creates a new Matrix4 with identical elements to this one.
     */
    clone(): Matrix4 {
        const e: number[] = this.elements
        const m: Matrix4 = new Matrix4(
            e[0], e[4], e[8], e[12],
            e[1], e[5], e[9], e[13],
            e[2], e[6], e[10], e[14],
            e[3], e[7], e[11], e[15]
        )
        return m
    }

    /**
     * creates a new matrix with the rotation specified by the given Euler Angle.      
     * @param x the x axis angle in radians
     * @param y the y axis angle in radians
     * @param z the z axis angle in radians
     */
    static rotationFromEuler(x: number, y: number, z: number): Matrix4 {
        const result: Matrix4 = Matrix4.zero()
        const te: number[] = result.elements

        const a: number = Math.cos(x)
        const b: number = Math.sin(x)
        const c: number = Math.cos(y)
        const d: number = Math.sin(y)
        const e: number = Math.cos(z)
        const f: number = Math.sin(z)

        const ae: number = a * e
        const af: number = a * f
        const be: number = b * e
        const bf: number = b * f

        // XYZ
        // https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js
        te[0] = c * e;
        te[4] = - c * f;
        te[8] = d;

        te[1] = af + be * d;
        te[5] = ae - bf * d;
        te[9] = - b * c;

        te[2] = bf - ae * d;
        te[6] = be + af * d;
        te[10] = a * c;

        // bottom row
        te[3] = 0.0;
        te[7] = 0.0;
        te[11] = 0.0;

        // last column
        te[12] = 0.0;
        te[13] = 0.0;
        te[14] = 0.0;
        te[15] = 1.0;

        return result
    }

    /**
     * Constructs a new rotation matrix, looking from eye towards target oriented by the up vector.
     * @param eye the eye vector
     * @param target the target vector
     * @param up the up vector
     */
    static lookAt(eye: Vec3, target: Vec3, up: Vec3): Matrix4 {
        const result: Matrix4 = Matrix4.identity()
        const te: number[] = result.elements

        let z: Vec3 = eye.subtractWith(target)


        if (closeZero(z.lengthSquared())) {
            // eye and target are in the same position
            z.z = 1.0
        }
        z = z.normalize()

        let x: Vec3 = up.crossWith(z)
        if (closeZero(x.lengthSquared())) {
            const epsilon: number = 0.0001
            // up and z are parallel
            if (closeEquals(Math.abs(up.z), 1.0)) {
                z.x += epsilon
            } else {
                z.z += epsilon
            }

            z = z.normalize()
            x = up.crossWith(z)
        }

        x = x.normalize()
        const y: Vec3 = z.crossWith(x)

        te[0] = x.x; te[4] = y.x; te[8] = z.x;
        te[1] = x.y; te[5] = y.y; te[9] = z.y;
        te[2] = x.z; te[6] = y.z; te[10] = z.z;

        return result
    }

    /**
     * Post-multiplies this matrix by m and returns a new matrix.
     * @param m the matrix to multiply
     */
    multiply(m: Matrix4): Matrix4 {
        return Matrix4.multiplyMatrices(this, m)
    }

    /**
     * Pre-multiplies this matrix by m and returns a new matrix.
     * @param m the matrix to multiply
     */
    premultiply(m: Matrix4): Matrix4 {
        return Matrix4.multiplyMatrices(m, this)
    }

    /**
     * multiplies both matrices with each other
     * @param a the first matrix
     * @param b the second matrix
     */
    static multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4 {
        const result: Matrix4 = Matrix4.zero()

        const ae: number[] = a.elements
        const be: number[] = b.elements
        const te: number[] = result.elements;

        const a11: number = ae[0], a12: number = ae[4], a13: number = ae[8], a14: number = ae[12];
        const a21: number = ae[1], a22: number = ae[5], a23: number = ae[9], a24: number = ae[13];
        const a31: number = ae[2], a32: number = ae[6], a33: number = ae[10], a34: number = ae[14];
        const a41: number = ae[3], a42: number = ae[7], a43: number = ae[11], a44: number = ae[15];

        const b11: number = be[0], b12: number = be[4], b13: number = be[8], b14: number = be[12];
        const b21: number = be[1], b22: number = be[5], b23: number = be[9], b24: number = be[13];
        const b31: number = be[2], b32: number = be[6], b33: number = be[10], b34: number = be[14];
        const b41: number = be[3], b42: number = be[7], b43: number = be[11], b44: number = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return result
    }

    /**
     * Multiplies every element of the matrix by the scalar value s and returns the result in a new matrix.
     * @param s the scalar to multiply
     */
    multiplyScalar(s: number): Matrix4 {
        const result: Matrix4 = this.clone()
        const te: number[] = result.elements

        te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
        te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
        te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
        te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;

        return result
    }

    /**
    * Computes the determinant of this matrix.
    * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    */
    determinant(): number {
        const te: number[] = this.elements

        const n11: number = te[0], n12: number = te[4], n13: number = te[8], n14: number = te[12];
        const n21: number = te[1], n22: number = te[5], n23: number = te[9], n24: number = te[13];
        const n31: number = te[2], n32: number = te[6], n33: number = te[10], n34: number = te[14];
        const n41: number = te[3], n42: number = te[7], n43: number = te[11], n44: number = te[15];

        return (
            n41 * (
                + n14 * n23 * n32
                - n13 * n24 * n32
                - n14 * n22 * n33
                + n12 * n24 * n33
                + n13 * n22 * n34
                - n12 * n23 * n34
            ) +
            n42 * (
                + n11 * n23 * n34
                - n11 * n24 * n33
                + n14 * n21 * n33
                - n13 * n21 * n34
                + n13 * n24 * n31
                - n14 * n23 * n31
            ) +
            n43 * (
                + n11 * n24 * n32
                - n11 * n22 * n34
                - n14 * n21 * n32
                + n12 * n21 * n34
                + n14 * n22 * n31
                - n12 * n24 * n31
            ) +
            n44 * (
                - n13 * n22 * n31
                - n11 * n23 * n32
                + n11 * n22 * n33
                + n13 * n21 * n32
                - n12 * n21 * n33
                + n12 * n23 * n31
            )

        )
    }
    /**
    * Transposes this matrix and returns the result in a new matrix.
    */
    transpose(): Matrix4 {
        const result: Matrix4 = this.clone()
        const te: number[] = result.elements

        let tmp: number

        tmp = te[1]; te[1] = te[4]; te[4] = tmp;
        tmp = te[2]; te[2] = te[8]; te[8] = tmp;
        tmp = te[6]; te[6] = te[9]; te[9] = tmp;

        tmp = te[3]; te[3] = te[12]; te[12] = tmp;
        tmp = te[7]; te[7] = te[13]; te[13] = tmp;
        tmp = te[11]; te[11] = te[14]; te[14] = tmp;

        return result
    }

    /**
     * Returns the inverse matrix for this matrix.
     * You can not invert a matrix with a determinant of zero. 
     * If you attempt this, the method returns a zero matrix instead.
     * @see http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     */
    inverse(): Matrix4 {
        const te: number[] = this.elements
        const result: Matrix4 = Matrix4.zero()
        const me: number[] = result.elements

        const n11: number = me[0], n21: number = me[1], n31: number = me[2], n41: number = me[3],
            n12: number = me[4], n22: number = me[5], n32: number = me[6], n42: number = me[7],
            n13: number = me[8], n23: number = me[9], n33: number = me[10], n43: number = me[11],
            n14: number = me[12], n24: number = me[13], n34: number = me[14], n44: number = me[15]

        const t11: number = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44
        const t12: number = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44
        const t13: number = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44
        const t14: number = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34

        const det: number = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14

        if (closeZero(det)) {
            return result
        }

        const detInv: number = 1.0 / det

        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

        return result
    }

    multiplyScale(x: number, y: number, z: number): Matrix4 {
        const result: Matrix4 = this.clone()
        const te: number[] = result.elements

        te[0] *= x; te[4] *= y; te[8] *= z;
        te[1] *= x; te[5] *= y; te[9] *= z;
        te[2] *= x; te[6] *= y; te[10] *= z;
        te[3] *= x; te[7] *= y; te[11] *= z;

        return result
    }

    multiplyScaleWith(v: Vec3): Matrix4 {
        return this.multiplyScale(v.x, v.y, v.z)
    }

    /**
     * creates a new matrix as a translation transform:
     * @param x the amount to translate in the X axis.
     * @param y the amount to translate in the Y axis.
     * @param z the amount to translate in the Z axis.
     */
    static translation(x: number, y: number, z: number): Matrix4 {
        const m: Matrix4 = new Matrix4(
            1.0, 0.0, 0.0, x,
            0.0, 1.0, 0.0, y,
            0.0, 0.0, 1.0, z,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
     * creates a new matrix as a rotational transformation around the X axis by theta (θ) radians. 
     * @param theta the x axis rotation in radians
     */
    static rotationX(theta: number): Matrix4 {
        const c: number = Math.cos(theta)
        const s: number = Math.sin(theta)

        const m: Matrix4 = new Matrix4(
            1.0, 0.0, 0.0, 0.0,
            0.0, c, -s, 0.0,
            0.0, s, c, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
    * creates a new matrix as a rotational transformation around the Y axis by theta (θ) radians. 
    * @param theta the y axis rotation in radians
    */
    static rotationY(theta: number): Matrix4 {
        const c: number = Math.cos(theta)
        const s: number = Math.sin(theta)

        const m: Matrix4 = new Matrix4(
            c, 0.0, s, 0.0,
            0.0, 1.0, 0.0, 0.0,
            -s, 0.0, c, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
    * creates a new matrix as a rotational transformation around the Z axis by theta (θ) radians. 
    * @param theta the z axis rotation in radians
    */
    static rotationZ(theta: number): Matrix4 {
        const c: number = Math.cos(theta)
        const s: number = Math.sin(theta)

        const m: Matrix4 = new Matrix4(
            c, -s, 0.0, 0.0,
            s, c, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
     * creates a new matrix as rotation transform around axis by theta radians.
     * @param x the x coordination of the rotation axis
     * @param y the y coordination of the rotation axis
     * @param z the z coordination of the rotation axis
     * @param angle Rotation angle in radians.
     */
    static rotationAxis(x: number, y: number, z: number, angle: number): Matrix4 {
        const c: number = Math.cos(angle)
        const s: number = Math.sin(angle)
        const t: number = 1.0 - c

        const tx: number = t * x
        const ty: number = t * y

        const m: Matrix4 = new Matrix4(
            tx * x + c, tx * y - s * z, tx * z + s * y, 0.0,
            tx * y + s * z, ty * y + c, ty * z - s * x, 0.0,
            tx * z - s * y, ty * z + s * x, t * z * z + c, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
     * creates a new matrix as rotation transform around axis by theta radians.
     * @param axis Rotation axis, should be normalized.
     * @param angle Rotation angle in radians.
     * @see Matrix4.rotationAxis()
     */
    static rotationAxisWith(axis: Vec3, angle: number): Matrix4 {
        return Matrix4.rotationAxis(axis.x, axis.y, axis.z, angle)
    }

    /**
     * create a new matrix as scale transform
     * @param x the amount to scale in the X axis.
     * @param y the amount to scale in the Y axis.
     * @param z the amount to scale in the Z axis.
     */
    static scale(x: number, y: number, z: number): Matrix4 {
        const m: Matrix4 = new Matrix4(
            x, 0.0, 0.0, 0.0,
            0.0, y, 0.0, 0.0,
            0.0, 0.0, z, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
     * create a new matrix as scale transform
     * @param v the scale vector
     * @see Matrix4.scale()
     */
    static scaleWith(v: Vec3): Matrix4 {
        return Matrix4.scale(v.x, v.y, v.z)
    }

    /**
     * create a new matrix as a shear transform
     * @param x the amount to shear in the X axis.
     * @param y the amount to shear in the Y axis.
     * @param z the amount to shear in the Z axis.
     */
    static shear(x: number, y: number, z: number): Matrix4 {
        const m: Matrix4 = new Matrix4(
            1.0, y, z, 0.0,
            x, 1.0, z, 0.0,
            x, y, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
        return m
    }

    /**
     * create a new matrix as a shear transform
     * @param v the shear vector
     * @see Matrix4.shear()
     */
    static shearWith(v: Vec3): Matrix4 {
        return Matrix4.shear(v.x, v.y, v.z)
    }

    /**
     * Creates a new perspective projection matrix.
     * @param left 
     * @param right 
     * @param top 
     * @param bottom 
     * @param near 
     * @param far 
     */
    static perspective(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4 {
        const result: Matrix4 = Matrix4.zero()
        const te: number[] = result.elements

        const x: number = 2 * near / (right - left);
        const y: number = 2 * near / (top - bottom);

        const a: number = (right + left) / (right - left);
        const b: number = (top + bottom) / (top - bottom);
        const c: number = - (far + near) / (far - near);
        const d: number = - 2 * far * near / (far - near);

        te[0] = x; te[4] = 0.0; te[8] = a; te[12] = 0.0;
        te[1] = 0.0; te[5] = y; te[9] = b; te[13] = 0.0;
        te[2] = 0.0; te[6] = 0.0; te[10] = c; te[14] = 0.0;
        te[3] = 0.0; te[7] = 0.0; te[11] = -1.0; te[15] = 0.0;

        return result
    }

    /**
     * Creates a new orthographic projection matrix.
     * @param left 
     * @param right 
     * @param top 
     * @param bottom 
     * @param near 
     * @param far 
     */
    static orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4 {
        const result: Matrix4 = Matrix4.zero()
        const te: number[] = result.elements

        const w: number = 1.0 / (right - left);
        const h: number = 1.0 / (top - bottom);
        const p: number = 1.0 / (far - near);

        const x: number = (right + left) * w;
        const y: number = (top + bottom) * h;
        const z: number = (far + near) * p;

        te[0] = 2.0 * w; te[4] = 0.0; te[8] = 0.0; te[12] = -x;
        te[1] = 0.0; te[5] = 2.0 * h; te[9] = 0.0; te[13] = -y;
        te[2] = 0.0; te[6] = 0.0; te[10] = -2.0 * p; te[14] = -z;
        te[3] = 0.0; te[7] = 0.0; te[11] = 0.0; te[15] = 1.0;

        return result
    }

    /**
    * Applies this Matrix transform to the given vector v.
    * @param v the vector to apply
    */
    applyVec3(v: Vec3): Vec3 {
        const e: number[] = this.elements

        const x: number = v.x
        const y: number = v.y
        const z: number = v.z

        const w: number = 1.0 / (e[3] * x + e[7] * y + e[11] * z + e[15])

        const dx: number = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        const dy: number = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        const dz: number = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

        return new Vec3(dx, dy, dz)
    }

    /**
    * Applies this Matrix transform to the given point p.
    * @param p the point to apply
    */
    applyPoint3(p: Point3): Point3 {
        const v: Vec3 = new Vec3(p.x, p.y, p.z)
        const r: Vec3 = this.applyVec3(v)
        return new Point3(r.x, r.y, r.z)
    }

    /**
     * returns the element value at given index
     * @param index the index for the element
     */
    at(index: number): number {
        return this.elements[index]
    }

    /**
     * creates a new matrix to the transformation composed of position, quaternion and scale.
     * @param position the position
     * @param quaternion the quaternion
     * @param scale the scale
     */
    static compose(position: Vec3, quaternion: Quaternion, scale: Vec3): Matrix4 {
        const result: Matrix4 = Matrix4.zero()
        const te: number[] = result.elements

        const x: number = quaternion.x
        const y: number = quaternion.y
        const z: number = quaternion.z
        const w: number = quaternion.w;

        const x2: number = x + x, y2: number = y + y, z2: number = z + z;
        const xx: number = x * x2, xy: number = x * y2, xz: number = x * z2;
        const yy: number = y * y2, yz: number = y * z2, zz: number = z * z2;
        const wx: number = w * x2, wy: number = w * y2, wz: number = w * z2;

        const sx: number = scale.x
        const sy: number = scale.y
        const sz: number = scale.z;

        te[0] = (1 - (yy + zz)) * sx;
        te[1] = (xy + wz) * sx;
        te[2] = (xz - wy) * sx;
        te[3] = 0;

        te[4] = (xy - wz) * sy;
        te[5] = (1 - (xx + zz)) * sy;
        te[6] = (yz + wx) * sy;
        te[7] = 0;

        te[8] = (xz + wy) * sz;
        te[9] = (yz - wx) * sz;
        te[10] = (1 - (xx + yy)) * sz;
        te[11] = 0;

        te[12] = position.x;
        te[13] = position.y;
        te[14] = position.z;
        te[15] = 1;

        return result
    }
    
    /**
     * creates a new rotation matrix from the the rotation specified by the given quaternion q.
     * The rest of the matrix is set to the identity.
     * @param q the quaternion for the rotation
     * @see https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion
     */
    static rotationFromQuaternion(q: Quaternion): Matrix4 {
        const scale: Vec3 = new Vec3(1.0, 1.0, 1.0)
        const position: Vec3 = new Vec3(0.0, 0.0, 0.0)
        return Matrix4.compose(position, q, scale)
    }

    /**
     * Gets the maximum scale value of the 3 axes.
     */
    maxScaleOnAxis(): number {
        const te: number[] = this.elements

        const scaleXSq: number = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        const scaleYSq: number = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        const scaleZSq: number = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }

    /**
     * Returns the euler angles represented by this matrix rotation for the three axes in radians. (Order: XYZ)
     */
    toEuler(): Vec3 {
        const te = this.elements;

        const m11: number = te[0], m12: number = te[4], m13: number = te[8];
        const m21: number = te[1], m22: number = te[5], m23: number = te[9];
        const m31: number = te[2], m32: number = te[6], m33: number = te[10];

        const euler: Vec3 = Vec3.zero()
        // XYZ order
        euler.y = Math.asin(clamp(-1.0, m13, 1.0))

        if (Math.abs(m13) < 0.9999999) {
            euler.x = Math.atan2(-m23, m33)
            euler.z = Math.atan2(-m12, m11)
        } else {
            euler.x = Math.atan2(m32, m22)
            euler.z = 0.0
        }

        return euler
    }

}