import { EPSILON, TWO_PI } from './math-constants'

/**
 * Clamps the given value between the given minimum float and maximum float values. 
 * Returns the given value if it is within the min and max range.
 * @param min The minimum floating point value to compare against.
 * @param value The floating point value to restrict inside the range defined by the min and max values.
 * @param max The maximum floating point value to compare against.
 */
export function clamp(min: number, value: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

/**
 * The method converts an angle measured in radians to an approximately equivalent angle measured in degrees. 
 * The conversion from radians to degrees is generally inexact; users should not expect cos(toRadians(90.0)) to exactly equal 0.0.
 * @param rad an angle, in radians
 */
export function toDegrees(rad: number): number {
    return rad * 180.0 / Math.PI
}

/**
 * The method converts an angle measured in degrees to an approximately equivalent angle measured in radians. 
 * The conversion from degrees to radians is generally inexact.
 * @param deg an angle, in degrees
 */
export function toRadians(deg: number): number {
    return deg * Math.PI / 180.0
}

/**
 * The method normalize the given radians to be between [ 0.0, 2*PI ]
 * @param rad the angle, in radians
 */
export function normalizeRadians(rad: number): number {
    while (rad < 0.0) {
        rad += TWO_PI
    }

    while (rad > TWO_PI) {
        rad -= TWO_PI
    }

    return rad
}

/**
 * The method normalize the given degrees to be between [ 0.0, 360.0 ]
 * @param deg the angle, in degrees
 */
export function normalizeDegrees(deg: number): number {
    while (deg < 0.0) {
        deg += 360.0
    }

    while (deg > 360.0) {
        deg -= 360.0
    }

    return deg
}

/**
 * The method compares the given float point number with zero based on an epsilon
 * @param x the float point number to compare
 */
export function closeZero(x: number): boolean {
    return closeEquals(0.0, x)
}

/**
 * The method compares two given float point number to check if there are equals based on an epsilon
 * @param a the first float point number to compare
 * @param b the second float point number to compare
 */
export function closeEquals(a: number, b: number): boolean {
    return Math.abs(a - b) < EPSILON
}

/**
 * Perform the cubic Catmull-Rom-interpolation
 * @param t interpolation weight.
 * @param p0 The first point
 * @param p1 The second point
 * @param p2 The third point
 * @param p3 The fourth point
 */
export function catmullRom(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const v0: number = (p2 - p0) * 0.5;
    const v1: number = (p3 - p1) * 0.5;
    const t2: number = t * t;
    const t3: number = t * t2;

    return (2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (- 3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1;
}
