import { Component, Node } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { ScriptGraphNodeComponent } from '../nodes/script/script-graph-node.component';

export class ScriptGraphComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    constructor() {
        super(`Script`)
        this.data.render = 'angular';
        this.data.component = ScriptGraphNodeComponent;
    }

    async builder(node: Node): Promise<void> {
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
    }

}