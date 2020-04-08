import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { ScriptGraphNodeComponent } from './script-graph-node.component';

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
        ScriptGraphNodeComponent
    ],
    exports: [
        ScriptGraphNodeComponent
    ]
})
export class ScriptGraphNodeModule {

}