import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorManagerService } from 'src/app/error-manager/service/error-manager.service';

@Component({
    selector: 'app-documentation-content',
    templateUrl: './documentation-content.component.html',
    styleUrls: [
        './documentation-content.component.scss'
    ]
})
export class DocumentationContentComponent implements OnInit, OnDestroy {

    source: string | undefined
    loading: boolean

    private subscription: Subscription | undefined

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly errorManagerService: ErrorManagerService) {
        this.loading = false
    }

    ngOnInit(): void {
        const url: Observable<string> = this.activatedRoute.url.pipe(
            map((values: UrlSegment[]) => {
                return values.join('/')
            })
        )

        this.subscription = url.subscribe((url: string) => {
            this.loading = true
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

    onError(error: any): void {
        this.delayLoaded()
        this.errorManagerService.error(error)
    }

    onLoaded(): void {
        this.delayLoaded()
    }

    private delayLoaded(): void {
        setTimeout(() => {
            this.loading = false
        }, 250)
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}