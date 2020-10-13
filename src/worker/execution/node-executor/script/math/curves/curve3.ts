import { Matrix4 } from '../geometry/matrix4';
import { Vec3 } from '../geometry/vec3';
import { EPSILON } from '../math-constants';
import { clamp } from '../math-functions';
import { Curve } from './curve';
import { CurveFrame3 } from './curve-frame3';

/**
 * Extension class for a curve with additional interpolation function for the 3d space.
 */
export class Curve3 extends Curve {

    constructor() {
        super()
    }

    /**
     * Generates the Frenet Frames. Requires a curve definition in 3D space.
     * @param segments number of frames to compute
     * @param closed true if the curve is closed
     * @see http://www.cs.indiana.edu/pub/techreports/TR425.pdf
     */
    computeFrenetFrames(segments: number, closed?: boolean): CurveFrame3[] {
        // list with the frames
        const frames: CurveFrame3[] = []

        // compute the tangent vectors for each segment on the curve
        for (let i = 0; i <= segments; i++) {
            const u: number = i / segments
            // get the position
            const position: Vec3 = this.getPointAt(u) as Vec3
            // get the tangent
            const tangent: Vec3 = this.getTangentAt(u) as Vec3
            // create the frame
            const frame: CurveFrame3 = new CurveFrame3(position, tangent)
            frames.push(frame)
        }

        let frame: CurveFrame3 = frames[0]
        const normal: Vec3 = frame.tangent.orthogonal()

        let vec: Vec3 = frame.tangent.crossWith(normal).normalize()

        frame.normal = frame.tangent.crossWith(vec).normalize()
        frame.binormal = frame.tangent.crossWith(frame.normal).normalize()

        // compute the slowly-varying normal and binormal vectors for each segment on the curve
        for (let i = 1; i <= segments; i++) {
            // get current frame
            const next: CurveFrame3 = frames[i]

            // copy from last frame
            next.normal = frame.normal.clone()
            next.binormal = frame.binormal.clone()

            // calculate helper
            vec = frame.tangent.crossWith(next.tangent)
            // get length
            const length: number = vec.length()

            if (length > EPSILON) {
                vec = vec.normalize()

                const dot: number = frame.tangent.dotWith(next.tangent)
                const theta: number = Math.acos(clamp(-1.0, dot, 1.0)) // clamp for floating point errors
                const matrix: Matrix4 = Matrix4.rotationAxisWith(vec, theta)
                next.normal = next.normal.applyMatrix4(matrix)
            }

            next.binormal = next.tangent.crossWith(next.normal)

            frame = next
        }

        // if the curve is closed, post process the vectors so the first and last normal vectors are the same
        if (closed) {
            const first: CurveFrame3 = frames[0]

            const dot: number = first.tangent.dotWith(frame.tangent)
            let theta: number = Math.acos(clamp(-1.0, dot, 1.0)) // clamp for floating point errors
            theta /= segments

            vec = first.normal.crossWith(frame.normal)
            const n: number = first.tangent.dotWith(vec)
            if (n > 0.0) {
                theta = -theta
            }

            for (let i = 1; i <= segments; i++) {
                // get current frame
                const next: CurveFrame3 = frames[i]
                // twist a little...
                const matrix: Matrix4 = Matrix4.rotationAxisWith(next.tangent, theta * i)

                next.normal = next.normal.applyMatrix4(matrix)
                next.binormal = next.tangent.crossWith(next.normal)
            }
        }

        return frames
    }

}