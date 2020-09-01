import { Vec2 } from './vec2'

export class Point2 {

    x: number | undefined
    y: number | undefined

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    translate(dx: number, dy: number): Point2 {
        const x: number = this.x + dx
        const y: number = this.y + dy

        return new Point2(x, y)
    }

    translateWith(v: Vec2): Point2 {
        return this.translate(v.x, v.y)
    }

    translateDirection(direction: Vec2, length: number): Point2 {
        const v: Vec2 = direction.scale(length)
        return this.translateWith(v)
    }

    distanceSquared(x: number, y: number): number {
        const dx: number = this.x - x
        const dy: number = this.y - y
        return dx * dx + dy * dy
    }

    distanceSquaredTo(p: Point2): number {
        return this.distanceSquared(p.x, p.y)
    }

    distance(x: number, y: number): number {
        const distanceSquared: number = this.distanceSquared(x, y)
        return Math.sqrt(distanceSquared)
    }

    distanceTo(p: Point2): number {
        return this.distance(p.x, p.y)
    }

    subtract(x: number, y: number): Vec2 {
        const dx: number = this.x - x
        const dy: number = this.y - y
        return new Vec2(dx, dy)
    }

    subtractWith(p: Point2): Vec2 {
        return this.subtract(p.x, p.y)
    }

    center(x: number, y: number): Point2 {
        const cx: number = (this.x + x) / 2.0
        const cy: number = (this.y + y) / 2.0
        return new Point2(cx, cy)
    }

    centerWith(p: Point2): Point2 {
        return this.center(p.x, p.y)
    }

    clone(): Point2 {
        const x: number = this.x
        const y: number = this.y
        return new Point2(x, y)
    }
    
}