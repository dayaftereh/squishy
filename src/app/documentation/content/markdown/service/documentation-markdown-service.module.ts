import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationMarkdownService } from './documentation-markdown.service';

@NgModule({
    imports: [
        // Angular
        RouterModule
    ],
    providers: [
        DocumentationMarkdownService
    ]
})
export class DocumentationMarkdownServiceModule {

}