import { Utils } from './utils'

export class DomHandler {

    private constructor() {

    }

    static getWidth(el: HTMLElement): number {
        if (Utils.isNullOrUndefined(el)) {
            return 0.0
        }

        const width: number = el.offsetWidth
        const style: CSSStyleDeclaration = getComputedStyle(el)

        const realWidth: number = width - (
            parseFloat(style.paddingLeft) +
            parseFloat(style.paddingRight) +
            parseFloat(style.borderLeftWidth) +
            parseFloat(style.borderRightWidth)
        )

        return realWidth
    }

    static getHeight(el: HTMLElement): number {
        if (Utils.isNullOrUndefined(el)) {
            return 0.0
        }

        const height: number = el.offsetHeight
        const style: CSSStyleDeclaration = getComputedStyle(el)

        const realHeight: number = height - (
            parseFloat(style.paddingTop) +
            parseFloat(style.paddingBottom) +
            parseFloat(style.borderTopWidth) +
            parseFloat(style.borderBottomWidth)
        )

        return realHeight
    }

}