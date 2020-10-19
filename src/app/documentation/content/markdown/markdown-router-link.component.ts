import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    templateUrl: './markdown-router-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownRouterLinkComponent {

    @Input()
    href: string | undefined

    @Input()
    text: string | undefined

    @Input()
    fragment: string | undefined

    constructor() {

    }

}