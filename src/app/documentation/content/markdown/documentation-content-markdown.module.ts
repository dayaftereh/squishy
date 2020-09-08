import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

export class MM {
    baseUrl: string = ''
}

@NgModule({
    imports: [
        MarkdownModule.forRoot(
            {
                loader: HttpClient,
                markedOptions: {
                    provide: MarkedOptions,
                    useValue: {
                        gfm: true,
                        baseUrl: './assets/documentation/'
                    }
                },
                
            }
        )
    ],
    exports: [
        MarkdownModule
    ]
})
export class DocumentationContentMarkdownModule {

}