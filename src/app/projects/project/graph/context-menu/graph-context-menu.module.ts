import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { GraphContextMenuComponent } from './graph-context-menu.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimNG
        ContextMenuModule,
        // ngx-translate,
        TranslateModule
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