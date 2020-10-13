import { Vec3 } from '../geometry/vec3';
import { clamp } from '../math-functions';
import { CatmullCubicPolynomial } from './catmull-cubic-polynomial';
import { CatmullRomType } from './catmull-rom-type';
import { Curve3 } from './curve3';

/**
 * Centripetal CatmullRom Curve - which is useful for avoiding
 * cusps and self-intersections in non-uniform catmull rom curves.
 * @see http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf
 */
export class CatmullRomCurve3 extends Curve3 {

    constructor(
        private readonly points: Vec3[],
        private readonly closed?: boolean,
        private readonly type?: CatmullRomType,
        private readonly tension?: number
    ) {
        super()
        if (!this.closed) {
            this.closed = false
        }
        if (this.type === undefined || this.type === null) {
            this.type = CatmullRomType.Centripetal
        }
        if (this.tension === undefined || this.tension === null) {
            this.tension = 0.5
        }
    }

    getPoint(t: number): Vec3 {
        // make t between 0 and 1
        t = clamp(0.0, t, 1.0)

        // get the length of the points
        const l: number = this.points.length

        // calculate the current control point
        const p = (l - (this.closed ? 0.0 : 1.0)) * t

        let intPoint: number = Math.floor(p)
        let weight: number = p - intPoint

        // check if spline closed
        if (this.closed) {
            intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
        } else if (weight === 0 && intPoint === l - 1) {
            intPoint = l - 2;
            weight = 1;
        }

        // 4 points (p1 & p2 defined below)
        let p0: Vec3;
        let p3: Vec3;

        if (this.closed || intPoint > 0) {
            p0 = this.points[(intPoint - 1) % l];
        } else {

            // extrapolate first point
            const _p0: Vec3 = this.points[0]
            const _p1: Vec3 = this.points[1]
            p0 = _p0.subtractWith(_p1).addWith(_p0)
        }

        const p1: Vec3 = this.points[intPoint % l];
        const p2: Vec3 = this.points[(intPoint + 1) % l];

        if (this.closed || intPoint + 2 < l) {
            p3 = this.points[(intPoint + 2) % l];
        } else {

            // extrapolate last point
            const _p0: Vec3 = this.points[l - 1]
            const _p1: Vec3 = this.points[l - 2]
            p3 = _p0.subtractWith(_p1).addWith(_p0)
        }

        const px: CatmullCubicPolynomial = new CatmullCubicPolynomial()
        const py: CatmullCubicPolynomial = new CatmullCubicPolynomial()
        const pz: CatmullCubicPolynomial = new CatmullCubicPolynomial()

        if (this.type === CatmullRomType.Centripetal || this.type === CatmullRomType.Chordal) {
            // init Centripetal / Chordal Catmull-Rom
            const pow: number = this.type === CatmullRomType.Chordal ? 0.5 : 0.25;

            let dt0: number = Math.pow(p0.distanceSquaredTo(p1), pow);
            let dt1: number = Math.pow(p1.distanceSquaredTo(p2), pow);
            let dt2: number = Math.pow(p2.distanceSquaredTo(p3), pow);

            // safety check for repeated points
            if (dt1 < 1e-4) {
                dt1 = 1.0;
            }

            if (dt0 < 1e-4) {
                dt0 = dt1;
            }

            if (dt2 < 1e-4) {
                dt2 = dt1;
            }

            px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
            py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
            pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);
        } else if (this.type === CatmullRomType.CatmullRom) {
            px.initCatmullRom(p0.x, p1.x, p2.x, p3.x, this.tension);
            py.initCatmullRom(p0.y, p1.y, p2.y, p3.y, this.tension);
            pz.initCatmullRom(p0.z, p1.z, p2.z, p3.z, this.tension);
        }

        const x: number = px.calculate(weight)
        const y: number = py.calculate(weight)
        const z: number = pz.calculate(weight)

        const point: Vec3 = new Vec3(x, y, z)
        return point;
    }

}