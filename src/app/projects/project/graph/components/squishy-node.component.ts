import { Component, Node } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { NodeData, WorkerInputs, WorkerOutputs } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { SquishyNodeData } from './squishy-node.data';

export class SquishyNodeComponent<T extends SquishyNodeData> extends Component implements AngularComponent {

    data: AngularComponentData | undefined;

    private nodes: Map<string, Node>

    constructor(name: string, component: any) {
        super(name)
        this.data.render = 'angular';
        this.data.component = component;
        this.nodes = new Map<string, Node>();
    }

    async createNode(nodeData?: {}): Promise<Node> {
        const id: string = Utils.uuid()

        const data: T = Object.assign({
            id,
            type: undefined
        } as T, nodeData)

        nodeData = await this.nodeData(data)
        const node: Node = await super.createNode(nodeData)
        this.nodes.set(id, node)
        return node
    }

    protected getNode(id: string): Node | undefined {
        if (this.nodes.has(id)) {
            return this.nodes.get(id)
        }
        return undefined
    }

    protected getNodeFromNodeData(node: NodeData): Node | undefined {
        if (Utils.isNullOrUndefined(node) || Utils.isNullOrUndefined(node.data)) {
            return undefined
        }
        const data: SquishyNodeData = (node.data as any) as SquishyNodeData
        if (this.nodes.has(data.id)) {
            return this.nodes.get(data.id)
        }
        return undefined
    }

    protected async nodeData(data: T): Promise<T> {
        return data as T
    }

    protected getId(node: Node): string {
        const data: SquishyNodeData = (node.data as any) as SquishyNodeData
        return data.id
    }

    protected nodesCount(): number {
        return this.nodes.size
    }

    async builder(node: Node): Promise<void> {
        throw new Error("Method not implemented.");
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
        throw new Error("Method not implemented.");
    }

}