import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DocumentationMenuComponent } from './documentation-menu.component';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // PrimeNG
        PanelModule,
        PanelMenuModule,
    ],
    declarations: [
        DocumentationMenuComponent
    ],
    exports: [
        DocumentationMenuComponent
    ]
})
export class DocumentationMenuModule {

}