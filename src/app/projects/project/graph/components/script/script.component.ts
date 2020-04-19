import { Input, Node, Output, Connection } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { SquishyNodeComponent } from '../squishy-node.component';
import { ScriptNodeComponent } from './script-node.component';
import { ScriptData } from './script.data';

export class ScriptComponent extends SquishyNodeComponent<ScriptData> {

    constructor() {
        super(`Script`, ScriptNodeComponent)
    }

    protected async nodeData(data: ScriptData): Promise<ScriptData> {
        data.type = NodeComponentsType.Script
        data.variables = {}
        data.name = `Script${this.nodesCount() + 1}`
        return data
    }

    async builder(node: Node): Promise<void> {
        const id: string = this.getId(node)
        const output: Output = new Output(id, "Return", anyTypeSocket)
        node.addOutput(output)

        this.addVariableInput(node)
    }

    worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
        const node: Node | undefined = this.getNodeFromNodeData(nodeData)

        if (!Utils.isNullOrUndefined(node)) {
            this.syncInputs(node)
        }
    }

    private syncInputs(node: Node): void {
        const removeable: string[] = []
        node.inputs.forEach((input: Input, id: string) => {
            if (Utils.isEmpty(input.connections)) {
                removeable.push(id)
            }
        })

        while (removeable.length > 1) {
            const id: string = removeable.pop()
            this.removeVariableInput(node, id)
        }

        if (Utils.isEmpty(removeable)) {
            this.addVariableInput(node)
        }
    }

    private addVariableInput(node: Node): void {
        const id: string = Utils.uuid()
        const input: Input = new Input(id, 'Variable', anyTypeSocket)
        node.addInput(input)
    }

    private removeVariableInput(node: Node, id: string): void {
        if (!node.inputs.has(id)) {
            return
        }
        node.inputs.delete(id)
    }

}