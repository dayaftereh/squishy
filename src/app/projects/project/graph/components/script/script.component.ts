import { Input, Node, Output } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { GraphNodesManager } from '../../graph-nodes.manager';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { NodeDynamicInputManager } from '../node-dynamic-input.manager';
import { SquishyNodeComponent } from '../squishy-node.component';
import { ScriptNodeComponent } from './script-node.component';
import { ScriptData } from './script.data';

export class ScriptComponent extends SquishyNodeComponent<ScriptData> {

    private dynamicInputManager: NodeDynamicInputManager

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`Script`, ScriptNodeComponent, graphNodesManager)
        this.dynamicInputManager = new NodeDynamicInputManager(
            this.variableFactory,
            graphNodesManager
        )
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

        this.dynamicInputManager.load(node)
    }

    worker(nodeData: NodeData): void {
        this.dynamicInputManager.update(nodeData)
    }

    private variableFactory(id: string): Input {
        const input: Input = new Input(id, 'Variable', anyTypeSocket)
        return input
    }

}