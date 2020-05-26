export class ElementUtils {

    private constructor() {

    }

    static getElementDimension(element: HTMLElement): { width: number, height: number } {
        const style: CSSStyleDeclaration = getComputedStyle(element)

        const marginLeft: number = parseInt(style.marginLeft) || 0;
        const marginRight: number = parseInt(style.marginRight) || 0;
        const marginTop: number = parseInt(style.marginTop) || 0;
        const marginBottom: number = parseInt(style.marginBottom) || 0;

        const paddingLeft: number = parseInt(style.paddingLeft) || 0;
        const paddingRight: number = parseInt(style.paddingRight) || 0;
        const paddingTop: number = parseInt(style.paddingTop) || 0;
        const paddingBottom: number = parseInt(style.paddingBottom) || 0;

        const width: number = element.clientWidth - (marginLeft + marginRight + paddingLeft + paddingRight)
        const height: number = element.clientHeight - (marginTop + marginBottom + paddingTop + paddingBottom)

        return {
            width, height
        }
    }
}