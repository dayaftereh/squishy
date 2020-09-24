import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-documentation-content',
    templateUrl: './documentation-content.component.html'
})
export class DocumentationContentComponent implements OnInit, OnDestroy {

    source: string | undefined
    private subscription: Subscription | undefined

    constructor(private readonly activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {       
        const url: Observable<string> = this.activatedRoute.url.pipe(
            map((values: UrlSegment[]) => {
                return values.join('/')
            })
        )

        this.subscription = url.subscribe((url: string) => {
            this.loadMarkdown(url)
        })
    }

    private loadMarkdown(path: string): void {
        if (!path) {
            path = `welcome`
        }
        const url: string = `./assets/documentation/${path}.md`
        this.source = url
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}