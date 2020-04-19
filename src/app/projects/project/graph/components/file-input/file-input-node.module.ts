import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { FileInputNodeComponent } from './file-input-node.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        PanelModule,
        ButtonModule,
        // rete
        ReteModule
    ],
    declarations: [
        FileInputNodeComponent
    ],
    exports: [
        FileInputNodeComponent
    ]
})
export class FileInputNodeModule {

}