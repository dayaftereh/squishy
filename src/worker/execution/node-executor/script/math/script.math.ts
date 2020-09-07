import { ScriptGeometryMath } from './geometry/script-geometry.math';

export class ScriptMath {

    static epsilon: number = 1e-10

    geometry: ScriptGeometryMath | undefined;

    constructor() {
        this.geometry = new ScriptGeometryMath();
    }

    limit(min: number, value: number, max: number): number {
        return ScriptMath.clamp(min, value, max)
    }

    toDegrees(rad: number): number {
        return rad * 180.0 / Math.PI
    }

    toRadians(deg: number): number {
        return deg * Math.PI / 180.0
    }

    static clamp(min: number, value: number, max: number): number {
        return Math.min(max, Math.max(min, value))
    }

    static closeZero(x: number): boolean {
        return this.closeEquals(0.0, x)
    }

    static closeEquals(a: number, b: number): boolean {
        return Math.abs(a - b) < ScriptMath.epsilon
    }

}