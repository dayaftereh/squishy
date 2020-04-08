import { NgModule } from '@angular/core';
import { InputGraphNodeModule } from './input/input-graph-node.module';
import { NodeService } from 'rete-angular-render-plugin';
import { OutputGraphNodeModule } from './output/output-graph-node.module';
import { ScriptGraphNodeModule } from './script/script-graph-node.module';

@NgModule({
    imports: [
        // Custom
        InputGraphNodeModule,
        OutputGraphNodeModule,
        ScriptGraphNodeModule
    ],
    providers: [
        NodeService
    ]
})
export class GraphNodesModule {

}