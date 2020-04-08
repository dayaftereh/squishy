import { Component, Node } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { OutputGraphNodeComponent } from '../nodes/output/output-graph-node.component';

export class OutputGraphComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    constructor() {
        super(`Output`)
        this.data.render = 'angular';
        this.data.component = OutputGraphNodeComponent;
    }

    async builder(node: Node): Promise<void> {
    }
    
    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
    }

}