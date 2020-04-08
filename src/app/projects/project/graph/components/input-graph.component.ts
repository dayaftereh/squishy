import { Component, Output, Node, Input } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { anyTypeSocket } from '../sockets/any-type.socket';
import { InputGraphNodeComponent } from '../nodes/input/input-graph-node.component';

export class InputGraphComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    constructor() {
        super(`Input`)
        this.data.render = 'angular';
        this.data.component = InputGraphNodeComponent;
    }

    async builder(node: Node): Promise<void> {
        console.log(node)

        const input: Input = new Input('key', 'Data', anyTypeSocket)
        node.addInput(input)

        const output: Output = new Output('key', 'Content', anyTypeSocket)
        node.addOutput(output)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
        console.log("input worker")
        outputs['key'] = 1
    }

}