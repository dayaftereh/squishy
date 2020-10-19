import { HttpClient } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ErrorManagerServiceModule } from 'src/app/error-manager/service/error-manager-service.module';
import { DocumentationContentMarkdownComponent } from './documentation-content-markdown.component';
import { MarkdownRouterLinkComponent } from './markdown-router-link.component';
import { DocumentationMarkdownServiceModule } from './service/documentation-markdown-service.module';
import { DocumentationMarkdownService } from './service/documentation-markdown.service';

export function markedOptionsFactory(documentationMarkdownService: DocumentationMarkdownService): MarkedOptions {

    const options: MarkedOptions = {
        gfm: true,
        headerIds: true,
        baseUrl: './assets/documentation/'
    }

    const renderer: MarkedRenderer = new MarkedRenderer(options)
    options.renderer = renderer

    renderer.link = (href: string | null, title: string | null, text: string) => {
        const result = documentationMarkdownService.link(href, title, text)
        return result
    }

    return options
}

@NgModule({
    imports: [
        // Angular
        FormsModule,
        RouterModule,
        BrowserModule,
        // PrimeNG
        BlockUIModule,
        ProgressSpinnerModule,
        // markdown
        MarkdownModule.forRoot(
            {
                sanitize: SecurityContext.NONE,
                loader: HttpClient,
                markedOptions: {
                    provide: MarkedOptions,
                    useFactory: markedOptionsFactory,
                    deps: [
                        DocumentationMarkdownService
                    ]
                }

            }
        ),
        // custom
        ErrorManagerServiceModule,
        DocumentationMarkdownServiceModule
    ],
    declarations: [
        MarkdownRouterLinkComponent,
        DocumentationContentMarkdownComponent
    ],
    exports: [
        MarkdownModule,
        DocumentationContentMarkdownComponent
    ]
})
export class DocumentationContentMarkdownModule {

}