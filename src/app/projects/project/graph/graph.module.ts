import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphComponent } from './graph.component';
import { GraphNodesModule } from './nodes/graph-nodes.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        GraphNodesModule
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