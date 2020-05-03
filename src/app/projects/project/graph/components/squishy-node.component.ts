import { Component, Node } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { SquishyNodeData } from './squishy-node.data';
import { GraphNodesManager } from '../graph-nodes.manager';

export class SquishyNodeComponent<T extends SquishyNodeData> extends Component implements AngularComponent {

    data: AngularComponentData | undefined;

    constructor(name: string, component: any, protected readonly graphNodesManager: GraphNodesManager) {
        super(name)
        this.data.render = 'angular';
        this.data.component = component;
    }

    async createNode(nodeData?: {}): Promise<Node> {
        const id: string = Utils.uuid()

        const data: T = Object.assign({
            type: undefined
        } as T, nodeData)

        data.id = id

        nodeData = await this.nodeData(data)
        const node: Node = await super.createNode(nodeData)
        // invoke the new node to the graph nodes manager
        this.graphNodesManager.build(node)
        return node
    }

    protected async nodeData(data: T): Promise<T> {
        return data as T
    }

    protected getId(node: Node): string {
        const data: SquishyNodeData = (node.data as any) as SquishyNodeData
        return data.id
    }

    async builder(node: Node): Promise<void> {
        // invoke the new node to the graph nodes manager
        this.graphNodesManager.build(node)
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
        throw new Error("Method not implemented.");
    }

}