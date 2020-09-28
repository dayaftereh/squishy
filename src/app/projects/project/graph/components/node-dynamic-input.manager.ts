import { EventEmitter } from '@angular/core';
import { Input, Node } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { GraphNodesManager } from '../graph-nodes.manager';
import { NodeDynamicInputEvent } from './node-dynamic-input.event';
import { NodeInputFactory } from './node-input-factory';

export class NodeDynamicInputManager {

    onDelete: EventEmitter<NodeDynamicInputEvent>

    constructor(
        private readonly factory: NodeInputFactory,
        private readonly graphNodesManager: GraphNodesManager) {
        this.onDelete = new EventEmitter<NodeDynamicInputEvent>();
    }

    load(node: Node): void {
        // get the node data
        const nodeData: NodeData | undefined = this.graphNodesManager.getNodeDataFromNode(node)

        // check if node data found
        if (!Utils.isNullOrUndefined(nodeData)) {
            // load the node data
            this.loadNodeData(node, nodeData)
        }

        // check if already an input added
        if (!node.inputs || node.inputs.size < 1) {
            this.addInput(node)
        }
    }

    private loadNodeData(node: Node, nodeData: NodeData): void {
        // check if the node has inputs
        if (Utils.isNullOrUndefined(nodeData.inputs)) {
            return
        }

        // add all already created inputs
        Utils.forEachProperty(nodeData.inputs, (_, id: string) => {
            this.addInput(node, id)
        })
    }

    update(nodeData: NodeData): void {
        // get the node from the node data
        const node: Node | undefined = this.graphNodesManager.getNodeFromNodeData(nodeData)

        if (!Utils.isNullOrUndefined(node)) {
            this.syncInputs(node)
        }
    }

    hasConnection(nodeData: NodeData, id: string): boolean {
        // get the node from the node data
        const node: Node | undefined = this.graphNodesManager.getNodeFromNodeData(nodeData)
        if (Utils.isNullOrUndefined(node)) {
            return false
        }
        return node.inputs.has(id)
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
            this.removeInput(node, id)
        }

        if (Utils.isEmpty(removeable)) {
            this.addInput(node)
        }
    }

    private addInput(node: Node, id?: string): void {
        // check if a id is given
        if (Utils.isNullOrUndefined(id)) {
            // generate a new id
            id = Utils.uuid()
        }
        const input: Input = this.factory(id, node)
        node.addInput(input)
    }

    private removeInput(node: Node, id: string): void {
        const event: NodeDynamicInputEvent = {
            id,
            node
        }

        this.onDelete.emit(event)

        if (!node.inputs.has(id)) {
            return
        }
        node.inputs.delete(id)
    }

}