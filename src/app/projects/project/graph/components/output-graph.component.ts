import { Component, Node } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';

export class OutputGraphComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    constructor() {
        super(`Output`)
    }

    async builder(node: Node): Promise<void> {
    }
    
    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
    }

}