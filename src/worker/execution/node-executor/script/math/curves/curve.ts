import { Matrix4 } from '../geometry/matrix4';
import { Vec2 } from '../geometry/vec2';
import { Vec3 } from '../geometry/vec3';
import { EPSILON } from '../math-constants';
import { clamp, closeEquals } from '../math-functions';
import { CurveFrame3 } from './curve-frame3';

/**
 * A base class for creating a Curve object that contains methods for interpolation.
 */
export class Curve {

    private lengths: number[] | undefined

    private static APPROX_DELTA: number = 1e-4
    private static ARC_LENGTH_DIVISIONS: number = 200.0

    /**
     * This constructor creates a new Curve.
     */
    constructor() {
        this.lengths = undefined
    }

    /**
     * Returns a vector for a given position on the curve.
     * @param t  A position on the curve. Must be in the range [ 0, 1 ].
     */
    getPoint(t: number): Vec2 | Vec3 {
        throw new Error('curve .getPoint() not implemented.')
    }

    /**
     * Returns a vector for a given position on the curve according to the arc length.
     * @param u  A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
     */
    getPointAt(u: number): Vec2 | Vec3 {
        const t: number = this.getUtoTmapping(u)
        const p: Vec2 | Vec3 = this.getPoint(t)
        return p
    }

    /**
     * Get sequence of points using getPoint( t )
     * @see Curve.getPoint()
     * @param divisions number of pieces to divide the curve into. Default is 5.
     */
    getPoints(divisions?: number): (Vec2 | Vec3)[] {
        if (!divisions || isNaN(divisions)) {
            divisions = 5.0
        }

        const points: (Vec2 | Vec3)[] = []
        for (let d = 0; d <= divisions; d++) {
            const t: number = d / divisions
            const p: Vec2 | Vec3 = this.getPoint(t)

            points.push(p)
        }

        return points
    }

    /**
     * Returns a set of divisions + 1 equi-spaced points using getPointAt( u ).
     * @param divisions number of pieces to divide the curve into. Default is 5.
     */
    getSpacedPoints(divisions: number): (Vec2 | Vec3)[] {
        if (!divisions || isNaN(divisions)) {
            divisions = 5.0
        }

        const points: (Vec2 | Vec3)[] = []

        for (let d = 0; d <= divisions; d++) {
            const u: number = d / divisions
            const p: Vec2 | Vec3 = this.getPointAt(u)

            points.push(p)
        }

        return points
    }

    /**
     * Get total curve arc length.
     */
    getLength(): number {
        const lengths: number[] = this.getLengths();
        const last: number = lengths[lengths.length - 1]
        return last
    }

    /**
     * Get list of cumulative segment lengths.
     * @param divisions number of pieces to cumulative segment of the curve. Default is 200.
     */
    getLengths(divisions?: number): number[] {
        if (this.lengths !== undefined && this.lengths !== null) {
            return this.lengths
        }

        if (divisions === undefined || divisions === null) {
            divisions = Curve.ARC_LENGTH_DIVISIONS
        }

        let sum: number = 0.0
        const cache: number[] = [0.0]

        let last: Vec2 | Vec3 = this.getPoint(0.0)

        for (let p = 1; p <= divisions; p++) {
            const t: number = p / divisions
            const current: Vec2 | Vec3 = this.getPoint(t)
            sum += (last as any).distanceTo(current)
            cache.push(sum)
            last = current
        }

        this.lengths = cache

        return cache
    }

    /**
     * Given u in the range ( 0 .. 1 ), returns t also in the range ( 0 .. 1 ). 
     * u and t can then be used to give you points which are equidistant from the ends of the curve, using .getPoint.
     * @param u u in the range [0, 1]
     * @param distance
     */
    getUtoTmapping(u: number, distance?: number): number {
        const arcLengths: number[] = this.getLengths()

        let i: number = 0
        const il: number = arcLengths.length

        let targetArcLength: number = 0

        if (distance !== undefined && distance !== null) {
            targetArcLength = distance
        } else {
            targetArcLength = u * arcLengths[il - 1]
        }

        let low: number = 0
        let high: number = il - 1

        // binary search for the index with largest value smaller than target u distance
        while (low <= high) {
            i = Math.floor(low + (high - low) / 2.0) // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
            const comparison: number = arcLengths[i] - targetArcLength

            if (comparison < 0.0) {
                low = i + 1
            } else if (comparison > 0.0) {
                high = i - 1
            } else {
                high = i
                break
            }
        }

        i = high

        if (closeEquals(arcLengths[i], targetArcLength)) {
            return i / (il - 1.0)
        }

        // we could get finer grain at lengths, or use simple interpolation between two points
        const lengthBefore: number = arcLengths[i]
        const lengthAfter: number = arcLengths[i + 1]
        const segmentLength: number = lengthAfter - lengthBefore

        // determine where we are between the 'before' and 'after' points
        const segmentFraction: number = (targetArcLength - lengthBefore) / segmentLength

        // add that fractional amount to t
        const t = (i + segmentFraction) / (il - 1.0)

        return t;
    }

    /**
     * Returns a unit vector tangent at t. If the derived curve does not implement its tangent derivation, 
     * two points a small delta apart will be used to find its gradient which seems to give a reasonable approximation.
     * @param t A position on the curve. Must be in the range [ 0, 1 ].
     */
    getTangent(t: number): Vec2 | Vec3 {
        let t1: number = t - Curve.APPROX_DELTA
        let t2: number = t + Curve.APPROX_DELTA


        t1 = Math.max(0.0, t1)
        t2 = Math.min(1.0, t2)

        const pt1: Vec2 | Vec3 = this.getPoint(t1)
        const pt2: Vec2 | Vec3 = this.getPoint(t2)

        const tangent: Vec2 | Vec3 = (pt2 as any).subtractWith(pt1).normalize()

        return tangent
    }

    /**
     * Returns tangent at a point which is equidistant to the ends of the curve from the point given in .getTangent.
     * @param u A position on the curve according to the arc length. Must be in the range [ 0, 1 ].
     */
    getTangentAt(u: number): Vec2 | Vec3 {
        const t: number = this.getUtoTmapping(u)
        const tangent: Vec2 | Vec3 = this.getTangent(t)
        return tangent
    }

    /**
     * Generates the Frenet Frames. Requires a curve definition in 3D space.
     * @param segments number of frames to compute
     * @param closed true if the curve is closed
     * @see http://www.cs.indiana.edu/pub/techreports/TR425.pdf
     */
    computeFrenetFrames(segments: number, closed?: boolean): CurveFrame3[] {
        // check if the curve is 3d
        if (!this.is3D()) {
            throw new Error('unable to compute frenet frames for a non 3D curve')
        }

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

    /**
     * checks if the curve is in 3D
     */
    is3D(): boolean {
        return true
    }

}