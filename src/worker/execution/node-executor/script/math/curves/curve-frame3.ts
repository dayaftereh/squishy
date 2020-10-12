import { Matrix4 } from '../geometry/matrix4';
import { Vec3 } from '../geometry/vec3';

export class CurveFrame3 {

    /** the normal vector */
    normal: Vec3
    /** direction vector of the curve */
    tangent: Vec3
    /** position on the curve for the frame */
    position: Vec3
    /** the cross vector from tangent and normal */
    binormal: Vec3

    constructor(position: Vec3, tangent: Vec3) {
        this.tangent = tangent
        this.position = position

        this.normal = Vec3.zero()
        this.binormal = Vec3.zero()
    }

    /**
     * Computes the three euler angles from binormal, tangent and normal
     */
    rotation(): Vec3 {
        const u: Vec3 = this.binormal.normalize()
        const v: Vec3 = this.tangent.normalize()
        const w: Vec3 = this.normal.normalize()

        const matrix: Matrix4 = new Matrix4(
            u.x, v.x, w.x, 0.0,
            u.y, v.y, w.y, 0.0,
            u.z, v.z, w.z, 0.0,
            0.0, 0.0, 0.0, 1.0
        )

        const euler: Vec3 = matrix.toEuler()

        return euler
    }

}