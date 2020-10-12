import { Vec3 } from '../geometry/vec3';
import { EllipseCurve2 } from './ellipse-curve2';

/**
 * This class represents an elliptical arc on a 2D plane.
 * The class is based on `EllipseCurve2`.
 */
export class ArcCurve2 extends EllipseCurve2 {

    /**
     * creates a elliptical arc with the given values
     * @param xCenter the x center position of the arc
     * @param yCenter the y center position of the arc
     * @param radius the radius of the arc
     * @param startAngle the start angle in radians
     * @param endAngle the end angle in radians
     * @param clockwise if true, the arc is clockwise
     */
    constructor(xCenter: number, yCenter: number, radius: number, startAngle: number, endAngle: number, clockwise?: boolean) {
        super(xCenter, yCenter, radius, radius, startAngle, endAngle, clockwise, undefined)
    }

    /**
     * creates a elliptical arc with the given values
     * @param center the center position of the arc
     * @param radius the radius of the arc
     * @param startAngle the start angle in radians
     * @param endAngle the end angle in radians
     * @param clockwise if true, the arc is clockwise
     * @see ArcCurve2()
     */
    static from(center: Vec3, radius: number, startAngle: number, endAngle: number, clockwise?: boolean): ArcCurve2 {
        return new ArcCurve2(center.x, center.y, radius, startAngle, endAngle, clockwise)
    }

}