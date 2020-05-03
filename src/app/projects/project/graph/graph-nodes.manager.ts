import { Node } from 'rete';
import { Data, NodeData } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { SquishyNodeData } from './components/squishy-node.data';

export class GraphNodesManager {

    private data: Data | undefined

    private nodes: Map<string, Node>

    constructor() {
        this.nodes = new Map<string, Node>()
    }

    size(): number {
        return this.nodes.size
    }

    build(node: Node): void {
        const id: string = this.getId(node)
        if (this.nodes.has(id)) {
            return
        }
        this.nodes.set(id, node)
    }

    getId(node: Node): string {
        const data: SquishyNodeData = (node.data as any) as SquishyNodeData
        return data.id
    }

    getNodeDataFromNode(node: Node): NodeData | undefined {
        if (!this.data || !this.data.nodes) {
            return undefined
        }
        const nodeData: NodeData = this.data.nodes[node.id]
        return nodeData
    }

    getNodeFromNodeData(nodeData: NodeData): Node | undefined {
        if (Utils.isNullOrUndefined(nodeData) || Utils.isNullOrUndefined(nodeData.data)) {
            return undefined
        }
        const data: SquishyNodeData = (nodeData.data as any) as SquishyNodeData

        if (this.nodes.has(data.id)) {
            return this.nodes.get(data.id)
        }
        return undefined
    }

    setData(data: Data): void {
        this.data = data
    }

}