import { Input, Node, Output, Connection } from 'rete';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { SquishyNodeComponent } from '../squishy-node.component';
import { ScriptNodeComponent } from './script-node.component';
import { ScriptData } from './script.data';
import { GraphNodesManager } from '../../graph-nodes.manager';

export class ScriptComponent extends SquishyNodeComponent<ScriptData> {

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`Script`, ScriptNodeComponent, graphNodesManager)
    }

    protected async nodeData(data: ScriptData): Promise<ScriptData> {
        const n: number = this.graphNodesManager.size() + 1

        data.type = NodeComponentsType.Script
        data.variables = {}
        data.name = `Script${n}`
        return data
    }

    async builder(node: Node): Promise<void> {
        await super.builder(node)

        // create the output
        const id: string = this.getId(node)
        const output: Output = new Output(id, "Return", anyTypeSocket)
        node.addOutput(output)

        // get the node data
        const nodeData: NodeData | undefined = this.graphNodesManager.getNodeDataFromNode(node)
        // check if node data found
        if (!Utils.isNullOrUndefined(nodeData)) {
            // load the node data
            this.loadNodeData(node, nodeData)
        }

        // check if already an input added
        if (node.inputs.size < 1) {            
            this.addVariableInput(node)
        }
    }

    private loadNodeData(node: Node, nodeData: NodeData): void {
        // check if the node has inputs
        if (Utils.isNullOrUndefined(nodeData.inputs)) {
            return
        }

        // add all already created inputs
        Utils.forEachProperty(nodeData.inputs, (_, id: string) => {
            this.addVariableInput(node, id)
        })
    }

    worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
        // get the node from the node data
        const node: Node | undefined = this.graphNodesManager.getNodeFromNodeData(nodeData)

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

    private addVariableInput(node: Node, id?: string): void {
        // check if a id is given
        if (Utils.isNullOrUndefined(id)) {
            // generate a new id
            id = Utils.uuid()
        }
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