import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentationContentMarkdownComponent } from './markdown/documentation-content-markdown.component';

@Component({
    selector: 'app-documentation-content',
    templateUrl: './documentation-content.component.html'
})
export class DocumentationContentComponent implements AfterViewInit, OnDestroy {

    @ViewChild('documentationMarkdown')
    documentationMarkdown: DocumentationContentMarkdownComponent | undefined

    private subscriptions: Subscription[]

    constructor(
        private readonly activatedRoute: ActivatedRoute) {
        this.subscriptions = []
    }

    ngAfterViewInit(): void {
        const url: Observable<string> = this.activatedRoute.url.pipe(
            map((values: UrlSegment[]) => {
                return values.join('/')
            })
        )

        const urlSubscription: Subscription = url.subscribe((url: string) => {
            this.loadMarkdown(url)

        })

        const fragmentSubscription: Subscription = this.activatedRoute.fragment.subscribe((fragment: string) => {
            this.scrollFragment(fragment)
        })

        this.subscriptions.push(urlSubscription, fragmentSubscription)
    }

    private loadMarkdown(url: string): void {
        if (!this.documentationMarkdown) {
            return
        }
        this.documentationMarkdown.loadMarkdown(url)
    }

    private scrollFragment(fragment: string): void {
        if (!this.documentationMarkdown) {
            return
        }
        this.documentationMarkdown.scrollFragment(fragment)
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe()
            })
        }
    }

}