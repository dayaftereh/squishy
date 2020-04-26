import { Node, Output } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { SquishyNodeComponent } from '../squishy-node.component';
import { FileInputNodeComponent } from './file-input-node.component';
import { FileInputData } from './file-input.data';
import { FileInputMode } from './file-input.mode';
import { Encoding } from 'src/app/utils/encodings';

export class FileInputComponent extends SquishyNodeComponent<FileInputData> {

    constructor() {
        super(`File-Input`, FileInputNodeComponent)
    }

    protected async nodeData(data: FileInputData): Promise<FileInputData> {
        data.type = NodeComponentsType.FileInput
        data.name = `File-Input${this.nodesCount() + 1}`
        data.mode = FileInputMode.Text
        data.encoding = Encoding.UTF_8
        data.accept = "*"
        return data
    }

    async builder(node: Node): Promise<void> {
        const id: string = this.getId(node)
        const output: Output = new Output(id, 'Content', anyTypeSocket)
        node.addOutput(output)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {

    }

}