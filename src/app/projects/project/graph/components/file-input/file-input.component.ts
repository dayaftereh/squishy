import { Component, Output, Node, Input } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { FileInputNodeComponent } from './file-input-node.component';
import { anyTypeSocket } from '../../sockets/any-type.socket';

export class FileInputComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    constructor() {
        super(`File-Input`)
        this.data.render = 'angular';
        this.data.component = FileInputNodeComponent;
    }

    async builder(node: Node): Promise<void> {
        const output: Output = new Output('key', 'Content', anyTypeSocket)
        node.addOutput(output)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
       
    }

}