import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class DocumentationMarkdownService {

    constructor(
        private readonly router: Router) { }

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
        // clean the href
        href = this.cleanHref(href)
        // check if a href given
        if (!href) {
            return text
        }

        if (this.isAbsoluteURL(href)) {
            return this.linkElement(href, text, title, '_new')
        } else if (this.isInPage(href)) {
            const url: string = this.inPageUrl(href)
            return this.routerLink(url, text, title)
        }

        return this.routerLink(href, text, title)
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

    inPageUrl(href: string): string {
        const url: string = this.getUrl(this.router.url)
        return `${url}${href}`
    }

    routerLink(href: string, text: string, title: string | undefined): string {
        const parts: string[] = [
            `<a`,
            `href="${href}"`,
            `class="appRouterLink"`,
        ]

        if (!!(title)) {
            parts.push(`title="${title}"`)
        }

        parts.push('>', text, '</a>')

        return parts.join(' ')
    }

    queryForRouterLink(): string {
        return `a.appRouterLink`
    }

    href(href: string): string {
        const url: URL = new URL(href)
        href = url.toString()
        return href
    }

    getUrl(href: string): string {
        if (this.isAbsoluteURL(href)) {
            return href
        }

        const index: number = href.lastIndexOf('#')
        if (index < 0) {
            return href
        }

        return href.substring(0, index)
    }

    getFragment(href: string): string {
        if (this.isAbsoluteURL(href)) {
            return href
        }

        const index: number = href.lastIndexOf('#')
        if (index < 0) {
            return href
        }

        return href.substring(index + 1)
    }

    markdownUrl(path: string): string {
        if (!path) {
            path = `welcome`
        }
        const url: string = `./assets/documentation/${path}.md`
        return url
    }

}