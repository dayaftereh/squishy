import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContextMenuModule } from 'primeng/contextmenu';
import { GraphContextMenuComponent } from './graph-context-menu.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimNG
        ContextMenuModule
    ],
    declarations: [
        GraphContextMenuComponent
    ],
    exports: [
        GraphContextMenuComponent
    ]
})
export class GraphContextMenuModule {

}