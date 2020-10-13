import { Vec2 } from '../geometry/vec2'

export class CurveFrame2 {

    /** direction vector of the curve */
    tangent: Vec2
    /** position on the curve for the frame */
    position: Vec2

    constructor(position: Vec2, tangent: Vec2) {
        this.tangent = tangent
        this.position = position
    }

    rotation(): number {
        const n: Vec2 = this.tangent.normalize()
        const theta: number = Math.atan2(n.x, n.y)
        return theta
    }

}