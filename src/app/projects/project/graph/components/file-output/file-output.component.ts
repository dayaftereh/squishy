import { Component, Node, Input } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { FileOutputNodeComponent } from './file-output-node.component';
import { anyTypeSocket } from '../../sockets/any-type.socket';

export class FileOutputComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    constructor() {
        super(`FileOutput`)
        this.data.render = 'angular';
        this.data.component = FileOutputNodeComponent;
    }

    async builder(node: Node): Promise<void> {
        const input: Input = new Input('key', 'Data', anyTypeSocket)
        node.addInput(input)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
    }

}