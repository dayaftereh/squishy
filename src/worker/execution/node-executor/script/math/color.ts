import { clamp } from './math-functions'

/**
 * The class is used to encapsulate colors in the default sRGBA color space.
 * Every color has an implicit alpha value of 1.0 or an explicit undefined provided in the constructor. 
 * The alpha value defines the transparency of a color and can be represented by a value in the range 0.0 - 1.0
 */
export class Color {

    /**
     * the red component [0, 1]
     */
    r: number
    /**
     * the green component [0, 1]
     */
    g: number
    /**
     *  the blue component [0, 1]
     */
    b: number
    /**
     * the alpha component [0, 1]
     */
    a: number | undefined

    /**
     * Creates an sRGBA color with the specified red, green, blue, and alpha values in the range [0, 1].
     * @param r the red component
     * @param g the green component
     * @param b the blue component
     * @param a the alpha component
     */
    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    /**
     * Converts an HSL color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and returns a new color.
     * @param h The hue [0, 1]
     * @param s The saturation [0, 1]
     * @param l The lightness [0, 1]
     */
    static fromHSL(h: number, s: number, l: number): Color {
        const color: Color = new Color(0.0, 0.0, 0.0, undefined)

        if (s == 0.0) {
            color.r = color.g = color.b = l;
        } else {
            var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
                if (t < 0.0) t += 1.0;
                if (t > 1.0) t -= 1.0;

                if (t < 1.0 / 6.0) {
                    return p + (q - p) * 6.0 * t
                }

                if (t < 1.0 / 2.0) {
                    return q
                }

                if (t < 2.0 / 3.0) {
                    return p + (q - p) * (2.0 / 3.0 - t) * 6.0
                }

                return p;
            }

            var q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
            var p = 2.0 * l - q;
            color.r = hue2rgb(p, q, h + 1 / 3);
            color.g = hue2rgb(p, q, h);
            color.b = hue2rgb(p, q, h - 1 / 3);
        }

        return color
    }

    /**
     * Creates a random RGB color using Color.fromHSL() with a random hue
     */
    static random(): Color {
        const h: number = Math.random()
        return Color.fromHSL(h, 1.0, 0.5)
    }

    /**
     * converts the color to an html hexadecimal triplet string like #ffff00 or with alpha #ffff00ff
     */
    toHex(): string {
        const _toHex = (x: number) => {
            let hex: string = Math.round(x * 255.0).toString(16)
            while (hex.length < 2) {
                hex = `0${hex}`
            }
            return hex
        }

        const hexR: string = _toHex(this.r)
        const hexG: string = _toHex(this.g)
        const hexB: string = _toHex(this.b)

        if (!this.isAlpha()) {
            return `#${hexR}${hexG}${hexB}`
        }

        const hexA: string = _toHex(this.a)
        return `#${hexR}${hexG}${hexB}${hexA}`
    }

    /**
     * converts the color to a css color string like rgb(0, 0, 0) or rgba(0, 0, 0)
     */
    toString(): string {
        const r: number = Math.round(this.r * 255.0)
        const g: number = Math.round(this.g * 255.0)
        const b: number = Math.round(this.b * 255.0)

        if (!this.isAlpha()) {
            return `rgb(${r}, ${g}, ${b})`
        }

        return `rgba(${r}, ${g}, ${b}, ${this.a})`
    }

    /**
     * checks if the color has a alpha value
     */
    isAlpha(): boolean {
        return this.a !== undefined && this.a !== null && !isNaN(this.a)
    }

    /**
     * Adds the RGB/A values of color to the RGB/A values of this color and returns a new color as result.
     * @param r Red channel value between [0, 1] to add
     * @param g Green channel value between [0, 1] to add
     * @param b Blue channel value between [0, 1] to add
     * @param a Alpha channel value between [0, 1] to add
     */
    add(r: number, g: number, b: number, a?: number): Color {
        const dr: number = clamp(0.0, this.r + r, 1.0)
        const dg: number = clamp(0.0, this.g + g, 1.0)
        const db: number = clamp(0.0, this.b + b, 1.0)

        let da: number = a
        if (a !== undefined && a !== null && this.isAlpha()) {
            da = clamp(0.0, this.a + a, 1.0)
        }

        const color: Color = new Color(dr, dg, db, da)
        return color
    }

    /**
     * Adds the given color to this color and and returns a new color as result.
     * @param color the color to add
     */
    addWith(color: Color): Color {
        return this.add(color.r, color.g, color.b, color.a)
    }

    /**
     * Returns the red channel value between [0, 255]
     */
    getR(): number {
        return Math.round(this.r * 255.0)
    }

    /**
    * Returns the green channel value between [0, 255]
    */
    getG(): number {
        return Math.round(this.g * 255.0)
    }

    /**
    * Returns the blue channel value between [0, 255]
    */
    getB(): number {
        return Math.round(this.b * 255.0)
    }

    /**
    * Returns the alpha channel value between [0, 1].
    * If the color has no alpha the return is always 1.0
    * @see Color.isAlpha()
    */
    getAlpha(): number {
        if (!this.isAlpha()) {
            return 1.0
        }
        return this.a
    }

    /**
     * Linearly interpolates this color's RGB values toward the RGB values of the passed argument. 
     * The t argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument.
     * @param other color to converge on.
     * @param t interpolation factor in the closed interval [0, 1].
     */
    lerp(other: Color, t: number): Color {
        const r: number = this.r + (other.r - this.r) * t
        const g: number = this.g + (other.g - this.g) * t
        const b: number = this.b + (other.b - this.b) * t

        const color: Color = new Color(
            clamp(0.0, r, 1.0),
            clamp(0.0, g, 1.0),
            clamp(0.0, b, 1.0),
            this.a
        )
        return color
    }

}