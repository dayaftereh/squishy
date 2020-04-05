import { NgModule } from '@angular/core';
import { InputGraphNodeModule } from './input/input-graph-node.module';
import { NodeService } from 'rete-angular-render-plugin';

@NgModule({
    imports: [
        // Custom
        InputGraphNodeModule
    ],
    providers: [
        NodeService
    ]
})
export class GraphNodesModule {

}