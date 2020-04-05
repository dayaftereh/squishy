import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputGraphNodeComponent } from './input-graph-node.component';
import { ReteModule } from 'rete-angular-render-plugin';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // rete
        ReteModule
    ],
    declarations: [
        InputGraphNodeComponent
    ],
    exports: [
        InputGraphNodeComponent
    ]
})
export class InputGraphNodeModule {

}