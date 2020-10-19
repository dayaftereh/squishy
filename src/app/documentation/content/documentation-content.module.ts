import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentationContentComponent } from './documentation-content.component';
import { DocumentationContentMarkdownModule } from './markdown/documentation-content-markdown.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        DocumentationContentMarkdownModule
    ],
    declarations: [
        DocumentationContentComponent
    ],
    exports: [
        DocumentationContentComponent
    ]
})
export class DocumentationContentModule {

}