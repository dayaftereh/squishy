import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class DocumentationMarkdownService {

    constructor(private readonly router: Router) { }

    cleanHref(href: string | undefined): string | undefined {
        if (!href) {
            return undefined
        }
        href = href.trim()
        return href
    }

    isAbsoluteURL(href: string | undefined): boolean {
        if (!href) {
            return false
        }

        const lower: string = href.toLowerCase()

        const regex: RegExp = new RegExp(/^(?:[a-z]+:)?\/\//i)
        return regex.test(lower)
    }

    isInPage(href: string | undefined): boolean {
        if (!href) {
            return false
        }
        return href.startsWith('#')
    }

    link(href: string | undefined, title: string | undefined, text: string): string {
        console.log(this.router.url)
        this.router.serializeUrl
        // clean the href
        href = this.cleanHref(href)
        // check if a href given
        if (!href) {
            return text
        }

        if (this.isAbsoluteURL(href)) {
            return this.linkElement(href, text, title, '_new')
        }else if(this.isInPage(href)){
            href = this.inPageHref(href)
        }
    }

    inPageHref(href: string): string {
        return href
    }

    linkElement(href: string, text: string, title: string | undefined, target: string | undefined): string {
        href = this.href(href)

        const parts: string[] = [
            `<a`,
            `href="${href}"`
        ]

        if (!!(title)) {
            parts.push(`title="${title}"`)
        }

        if (!!(target)) {
            parts.push(`target="${target}"`)
        }

        parts.push('>', text, '</a>')

        return parts.join(' ')
    }

    href(href: string): string {
        const url: URL = new URL(href)
        href = url.toString()
        return href
    }

}