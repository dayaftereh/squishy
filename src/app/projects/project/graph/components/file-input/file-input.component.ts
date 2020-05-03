import { Node, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { SquishyNodeComponent } from '../squishy-node.component';
import { FileInputNodeComponent } from './file-input-node.component';
import { FileInputData } from './file-input.data';
import { FileInputMode } from './file-input.mode';
import { Encoding } from 'src/app/utils/encodings';
import { GraphNodesManager } from '../../graph-nodes.manager';

export class FileInputComponent extends SquishyNodeComponent<FileInputData> {

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`File-Input`, FileInputNodeComponent, graphNodesManager)
    }

    protected async nodeData(data: FileInputData): Promise<FileInputData> {
        const n: number = this.graphNodesManager.size() + 1

        data.type = NodeComponentsType.FileInput
        data.name = `File-Input${n}`
        data.mode = FileInputMode.Text
        data.encoding = Encoding.UTF_8
        data.accept = "*"
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