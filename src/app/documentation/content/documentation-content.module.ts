import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DocumentationContentComponent } from './documentation-content.component';
import { DocumentationContentMarkdownModule } from './markdown/documentation-content-markdown.module';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        RouterModule,
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