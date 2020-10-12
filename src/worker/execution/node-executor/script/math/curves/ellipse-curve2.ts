import { Vec2 } from '../geometry/vec2'
import { EPSILON, TWO_PI } from '../math-constants'
import { clamp, closeEquals, closeZero, normalizeRadians } from '../math-functions'
import { Curve } from './curve'

/**
 * Creates a 2D curve in the shape of an ellipse. 
 * Setting the xRadius equal to the yRadius will result in a circle.
 */
export class EllipseCurve2 extends Curve {

    /**
     * 
     * @param xCenter The X center of the ellipse. Default is 0.
     * @param yCenter The Y center of the ellipse. Default is 0.
     * @param xRadius The radius of the ellipse in the x direction. Default is 1.
     * @param yRadius The radius of the ellipse in the y direction. Default is 1.
     * @param startAngle The start angle of the curve in radians starting from the positive X axis. Default is 0.
     * @param endAngle The end angle of the curve in radians starting from the positive X axis. Default is 2 x Math.PI.
     * @param clockwise Whether the ellipse is drawn clockwise. Default is false.
     * @param rotation The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is 0.
     */
    constructor(
        private readonly xCenter: number,
        private readonly yCenter: number,
        private readonly xRadius: number,
        private readonly yRadius: number,
        private readonly startAngle: number,
        private readonly endAngle: number,
        private readonly clockwise?: boolean,
        private readonly rotation?: number
    ) {
        super()
        this.xCenter = this.xCenter || 0.0
        this.yCenter = this.yCenter || 0.0

        this.xRadius = this.xRadius || 1.0
        this.yRadius = this.yRadius || 1.0

        this.startAngle = this.startAngle || 0.0
        this.endAngle = this.endAngle || 2.0 * Math.PI

        this.clockwise = this.clockwise || false
        this.rotation = this.rotation || undefined
    }

    static with(center: Vec2, radius: Vec2, startAngle: number, endAngle: number, clockwise?: boolean, rotation?: number): EllipseCurve2 {
        return new EllipseCurve2(center.x, center.x, radius.x, radius.y, startAngle, endAngle, clockwise, rotation)
    }

    /**
     * Returns a vector for a given position on the curve.
     * @param t A position on the curve
     */
    getPoint(t: number): Vec2 {
        // make t between 0 and 1
        t = clamp(0.0, t, 1.0)

        let deltaAngle: number = normalizeRadians(this.endAngle - this.startAngle)
        const samePoints: boolean = closeZero(deltaAngle)

        if (deltaAngle < EPSILON) {
            if (samePoints) {
                deltaAngle = 0.0
            } else {
                deltaAngle = TWO_PI
            }
        }

        if (this.clockwise && !samePoints) {
            if (closeEquals(deltaAngle, TWO_PI)) {
                deltaAngle = -TWO_PI
            } else {
                deltaAngle = deltaAngle - TWO_PI
            }
        }

        const angle: number = this.startAngle + deltaAngle

        let x: number = this.xCenter + this.xRadius * Math.cos(angle)
        let y: number = this.yCenter + this.yRadius * Math.sin(angle)

        if (this.rotation) {
            const cos: number = Math.cos(this.rotation)
            const sin: number = Math.sin(this.rotation)

            const tx: number = x - this.xCenter
            const ty: number = y - this.yCenter

            x = tx * cos - ty * sin + this.xCenter
            y = tx * sin + ty * cos + this.yCenter
        }

        const p: Vec2 = new Vec2(x, y)
        return p
    }

    is3D(): boolean {
        return false
    }

}