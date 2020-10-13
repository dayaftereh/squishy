import { Vec2 } from '../geometry/vec2';
import { catmullRom } from '../math-functions';
import { Curve2 } from './curve2';

/**
 * Create a smooth 2d spline curve from a series of points. 
 * Internally this uses Mathf.catmullRom() to create the curve.
 */
export class SplineCurve2 extends Curve2 {

    /**
     * Creates the spline curve for 2d
     * @param points An array of Vec2 points that define the curve.
     */
    constructor(private readonly points: Vec2[]) {
        super()
    }

    getPoint(t: number): Vec2 {
        const p: number = (this.points.length - 1.0) * t
        const intPoint: number = Math.floor(p)
        const weight: number = p - intPoint

        const p0: Vec2 = this.points[intPoint === 0 ? intPoint : intPoint - 1];
        const p1: Vec2 = this.points[intPoint];
        const p2: Vec2 = this.points[intPoint > this.points.length - 2 ? this.points.length - 1 : intPoint + 1];
        const p3: Vec2 = this.points[intPoint > this.points.length - 3 ? this.points.length - 1 : intPoint + 2];

        const x: number = catmullRom(weight, p0.x, p1.x, p2.x, p3.x)
        const y: number = catmullRom(weight, p0.y, p1.y, p2.y, p3.y)

        const point: Vec2 = new Vec2(x, y)
        return point
    }

}