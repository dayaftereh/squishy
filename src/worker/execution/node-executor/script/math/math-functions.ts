import { EPSILON } from './math-constants'

export function clamp(min: number, value: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

export function toDegrees(rad: number): number {
    return rad * 180.0 / Math.PI
}

export function toRadians(deg: number): number {
    return deg * Math.PI / 180.0
}


export function closeZero(x: number): boolean {
    return closeEquals(0.0, x)
}

export function closeEquals(a: number, b: number): boolean {
    return Math.abs(a - b) < EPSILON
}