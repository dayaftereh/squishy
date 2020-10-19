import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { ErrorManagerService } from 'src/app/error-manager/service/error-manager.service';
import { MarkdownRouterLinkComponent } from './markdown-router-link.component';
import { DocumentationMarkdownService } from './service/documentation-markdown.service';

@Component({
    selector: 'app-documentation-content-markdown',
    templateUrl: './documentation-content-markdown.component.html',
    styleUrls: [
        './documentation-content-markdown.component.scss'
    ]
})
export class DocumentationContentMarkdownComponent implements OnInit, OnDestroy {

    loading: boolean

    source: string | undefined

    fragment: string | undefined

    @ViewChild('markdown')
    markdown: MarkdownComponent | undefined

    private urlChanged: EventEmitter<string | undefined>

    private fragmentChanged: EventEmitter<string | undefined>

    private subscriptions: Subscription[]

    constructor(
        private readonly injector: Injector,
        private readonly applicationRef: ApplicationRef,
        private readonly viewportScroller: ViewportScroller,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly errorManagerService: ErrorManagerService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly documentationMarkdownService: DocumentationMarkdownService) {
        this.loading = false
        this.subscriptions = []
        this.urlChanged = new EventEmitter<string | undefined>(true)
        this.fragmentChanged = new EventEmitter<string | undefined>(true)
    }

    ngOnInit(): void {
        const urlSubscription: Subscription = this.urlChanged.subscribe((path: string | undefined) => {
            // get the src path
            const src: string = this.documentationMarkdownService.markdownUrl(path)
            // check if src are changed
            this.loading = src !== this.source
            this.source = src
        })

        const fragmentSubscription: Subscription = this.fragmentChanged.subscribe((fragment: string) => {
            this.fragment = fragment
            if (!this.loading) {
                this.scrollToFragment()
            }
        })

        this.subscriptions.push(urlSubscription, fragmentSubscription)
    }

    onError(error: Error): void {
        this.delayLoaded()
        this.errorManagerService.error(error)
    }

    onLoaded(): void {
        // inject the links for router link
        this.injectRouterLinks()
        // stop loading
        this.delayLoaded()

        this.scrollToFragment()
    }

    loadMarkdown(path: string): void {
        this.urlChanged.emit(path)
    }

    scrollFragment(fragment: string): void {
        this.fragmentChanged.emit(fragment)
    }

    private delayLoaded(): void {
        setTimeout(() => {
            this.loading = false
        }, 250)
    }

    private scrollToFragment(): void {
        if (!this.fragment) {
            return
        }
        this.viewportScroller.scrollToAnchor(this.fragment)
    }

    private injectRouterLinks(): void {
        // check if markdown element exists
        if (!this.markdown || !this.markdown.element) {
            return
        }
        // get the element ref
        const elementRef: ElementRef<HTMLElement> = this.markdown.element
        // check if a nativeElement found
        if (!elementRef.nativeElement) {
            return
        }

        // get the query for the router link
        const query: string = this.documentationMarkdownService.queryForRouterLink()
        // search all link with routerLink attribute
        elementRef.nativeElement.querySelectorAll(query).forEach((link: Element) => {
            const parent: HTMLElement | undefined = link.parentElement

            // check if found link has a parent
            if (!!(parent)) {
                this.injectRouterLink(parent, link)
            }
        })
    }

    private injectRouterLink(parent: HTMLElement, link: Element): void {
        // create a new span for the container
        const container: HTMLElement = this.document.createElement('span')

        // create the MarkdownRouterLinkComponent
        const component: ComponentRef<MarkdownRouterLinkComponent> = this.componentFactoryResolver.resolveComponentFactory(
            MarkdownRouterLinkComponent
        ).create(this.injector, [], container)
        // attach the new component to view
        this.applicationRef.attachView(component.hostView)

        const href: string = link.getAttribute('href') || ''

        // set text and href for the router link
        component.instance.text = link.textContent || ''
        component.instance.href = this.documentationMarkdownService.getUrl(href)
        component.instance.fragment = this.documentationMarkdownService.getFragment(href)

        // replace link with container
        parent.replaceChild(container, link)
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe()
            })
        }
    }
}