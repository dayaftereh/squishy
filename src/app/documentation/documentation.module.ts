import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentationContentModule } from './content/documentation-content.module';
import { DocumentationComponent } from './documentation.component';
import { DocumentationMenuModule } from './menu/documentation-menu.module';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // Custom
        DocumentationMenuModule,
        DocumentationContentModule
    ],
    declarations: [
        DocumentationComponent
    ],
    exports: [
        DocumentationComponent
    ]
})
export class DocumentationModule {

}