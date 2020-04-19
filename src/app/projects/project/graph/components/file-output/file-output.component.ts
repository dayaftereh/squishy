import { Input, Node } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { SquishyNodeComponent } from '../squishy-node.component';
import { FileOutputNodeComponent } from './file-output-node.component';
import { FileOutputData } from './file-output.data';
import { NodeComponentsType } from '../node-components.type';

export class FileOutputComponent extends SquishyNodeComponent<FileOutputData> {

    constructor() {
        super(`FileOutput`, FileOutputNodeComponent)
    }

    protected async nodeData(data: FileOutputData): Promise<FileOutputData> {
        data.type = NodeComponentsType.FileOutput
        data.name = `File-Output${this.nodesCount() + 1}`
        return data
    }

    async builder(node: Node): Promise<void> {
        const id: string = this.getId(node)
        const input: Input = new Input(id, 'Data', anyTypeSocket)
        node.addInput(input)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
    }

}