import { Component, Node, Output, Input } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { ScriptNodeComponent } from './script-node.component';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { Mathf } from 'src/app/utils/mathf';

export class ScriptComponent extends Component implements AngularComponent {

    data: AngularComponentData;

    private node: Node

    constructor() {
        super(`Script`)
        this.data.render = 'angular';
        this.data.component = ScriptNodeComponent;
    }

    async builder(node: Node): Promise<void> {
        this.node = node;

        const output: Output = new Output("key", "Return", anyTypeSocket)
        node.addOutput(output)


        this.addVariableInput()

    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
        this.syncInputs(inputs)
    }

    created(node: Node): void {
        console.log('created', node);
    }

    destroyed(node: Node): void {
        console.log('destroyed', node);
    }

    private syncInputs(connected: WorkerInputs): void {

        const removeable: string[] = []

        console.log(connected)
        console.log(this.node)

        this.node.inputs.forEach((_, id: string) => {
            if (connected[id] === undefined || connected[id] === null || connected[id].length < 1) {
                removeable.push(id)
            }
        })

        while (removeable.length > 1) {
            const id: string = removeable.pop()
            this.removeVariableInput(id)
        }

        if (!removeable || removeable.length < 1) {
            this.addVariableInput()
        }

        //this.node.update()
    }

    private addVariableInput(): void {
        const id: string = Mathf.uuid()
        const input: Input = new Input(id, 'Variable', anyTypeSocket)
        this.node.addInput(input)
    }

    private removeVariableInput(id: string): void {
        if (!this.node.inputs.has(id)) {
            return
        }

        this.node.inputs.delete(id)
    }


}