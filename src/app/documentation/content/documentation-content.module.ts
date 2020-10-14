import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ErrorManagerServiceModule } from 'src/app/error-manager/service/error-manager-service.module';
import { DocumentationContentComponent } from './documentation-content.component';
import { DocumentationContentMarkdownModule } from './markdown/documentation-content-markdown.module';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        RouterModule,
        BrowserModule,
        // PrimeNG
        BlockUIModule,
        ProgressSpinnerModule,
        // Custom
        ErrorManagerServiceModule,
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