import { Vec2 } from '../geometry/vec2';
import { Curve } from './curve';
import { CurveFrame2 } from './curve-frame2';

/**
 * Extension class for a curve with additional interpolation function for the 2d space.
 */
export class Curve2 extends Curve {

    constructor() {
        super()
    }

    computeFrames(segments: number): CurveFrame2[] {
        const frames: CurveFrame2[] = []

        // compute the tangent vectors for each segment on the curve
        for (let i = 0; i <= segments; i++) {
            const u: number = i / segments
            // get the position
            const position: Vec2 = this.getPointAt(u) as Vec2
            // get the tangent
            const tangent: Vec2 = this.getTangentAt(u) as Vec2
            // create the frame
            const frame: CurveFrame2 = new CurveFrame2(position, tangent)
            frames.push(frame)
        }

        return frames
    }

}