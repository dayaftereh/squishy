import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { ScriptNodeComponent } from './script-node.component';

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
        ScriptNodeComponent
    ],
    exports: [
        ScriptNodeComponent
    ]
})
export class ScriptNodeModule {

}