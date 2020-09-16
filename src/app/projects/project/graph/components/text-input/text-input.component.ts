import { Node, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { GraphNodesManager } from '../../graph-nodes.manager';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { SquishyNodeComponent } from '../squishy-node.component';
import { TextInputNodeComponent } from './text-input-node.component';
import { TextInputData } from './text-input.data';
import { TextInputType } from './text-input.type';

export class TextInputComponent extends SquishyNodeComponent<TextInputData> {

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`Text-Input`, TextInputNodeComponent, graphNodesManager)
    }

    protected async nodeData(data: TextInputData): Promise<TextInputData> {
        const n: number = this.graphNodesManager.size() + 1

        data.name = `TextInput${n}`
        data.type = NodeComponentsType.TextInput

        data.content = undefined
        data.inputType = TextInputType.PlainText

        return data
    }

    async builder(node: Node): Promise<void> {
        await super.builder(node)

        const id: string = this.getId(node)
        const output: Output = new Output(id, 'Content', anyTypeSocket)
        node.addOutput(output)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {

    }

}