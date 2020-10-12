/**
 * Based on an optimized c++ solution in
 * - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
 * - http://ideone.com/NoEbVM
 * 
 * This CatmullCubicPolynomial class could be used for reusing some variables and calculations,
 * but for squishy curve use, it could be possible inlined and flatten into a single function call.
 */
export class CatmullCubicPolynomial {

    c0: number
    c1: number
    c2: number
    c3: number

    constructor() {
        this.c0 = 0.0
        this.c1 = 0.0
        this.c2 = 0.0
        this.c3 = 0.0
    }

    /*
     * Compute coefficients for a cubic polynomial
     *   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
     * such that
     *   p(0) = x0, p(1) = x1
     *  and
     *   p'(0) = t0, p'(1) = t1.
     */
    init(x0: number, x1: number, t0: number, t1: number): void {
        this.c0 = x0;
        this.c1 = t0;
        this.c2 = - 3.0 * x0 + 3.0 * x1 - 2.0 * t0 - t1;
        this.c3 = 2.0 * x0 - 2.0 * x1 + t0 + t1;
    }

    initCatmullRom(x0: number, x1: number, x2: number, x3: number, tension: number): void {
        const t0: number = tension * (x2 - x0)
        const t1: number = tension * (x3 - x1)
        this.init(x1, x2, t0, t1)
    }

    initNonuniformCatmullRom(x0: number, x1: number, x2: number, x3: number, dt0: number, dt1: number, dt2: number): void {
        // compute tangents when parameterized in [t1,t2]
        let t1: number = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
        let t2: number = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;

        // rescale tangents for parametrization in [0,1]
        t1 *= dt1;
        t2 *= dt1;

        this.init(x1, x2, t1, t2);
    }

    calculate(t: number): number {
        const t2: number = t * t
        const t3: number = t2 * t

        const p: number = this.c0 + this.c1 * t + this.c2 * t2 + this.c3 * t3;
        return p
    }

}