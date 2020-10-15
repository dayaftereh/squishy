import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { DocumentationMarkdownServiceModule } from './service/documentation-markdown-service.module';
import { DocumentationMarkdownService } from './service/documentation-markdown.service';

export function markedOptionsFactory(documentationMarkdownService: DocumentationMarkdownService): MarkedOptions {
    const renderer: MarkedRenderer = new MarkedRenderer()



    

    const fnLink = renderer.link
    renderer.link = (href: string | null, title: string | null, text: string) => {
        const result = documentationMarkdownService.link(href, title, text)
        if(!!result){
            return result
        }

        return fnLink.bind(renderer)(href, title, text)
    }


    return {
        gfm: true,
        renderer,
        baseUrl: './assets/documentation/'
    }
}

@NgModule({
    imports: [
        // markdown
        MarkdownModule.forRoot(
            {
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
        DocumentationMarkdownServiceModule
    ],
    exports: [
        MarkdownModule
    ]
})
export class DocumentationContentMarkdownModule {

}