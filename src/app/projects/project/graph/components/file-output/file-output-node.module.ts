import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { FileOutputNodeComponent } from './file-output-node.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        PanelModule,
        // rete
        ReteModule
    ],
    declarations: [
        FileOutputNodeComponent
    ],
    exports: [
        FileOutputNodeComponent
    ]
})
export class FileOutputNodeModule {

}