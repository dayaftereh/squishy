import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphComponent } from './graph.component';
import { NodeComponentsModule } from './components/node-components.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        NodeComponentsModule
    ],
    declarations: [
        GraphComponent
    ],
    exports: [
        GraphComponent
    ]
})
export class GraphModule {

}