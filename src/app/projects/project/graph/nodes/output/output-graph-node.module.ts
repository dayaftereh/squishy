import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { OutputGraphNodeComponent } from './output-graph-node.component';

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
        OutputGraphNodeComponent
    ],
    exports: [
        OutputGraphNodeComponent
    ]
})
export class OutputGraphNodeModule {

}