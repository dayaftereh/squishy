import { Input, Node } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { GraphNodesManager } from '../../graph-nodes.manager';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { SquishyNodeComponent } from '../squishy-node.component';
import { View3DNodeComponent } from './view3d-node.component';
import { View3DUpVector } from './view3d-up.vector';
import { View3DControl } from './view3d.control';
import { View3DData } from './view3d.data';

export class View3DComponent extends SquishyNodeComponent<View3DData> {

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`View3D`, View3DNodeComponent, graphNodesManager)
    }

    protected async nodeData(data: View3DData): Promise<View3DData> {
        const n: number = this.graphNodesManager.size() + 1

        data.name = `View3D_${n}`
        data.type = NodeComponentsType.View3D

        data.fov = 50.0
        data.near = 0.1
        data.far = 2000.0
        data.antiAlias = false

        data.up = View3DUpVector.Y
        data.control = View3DControl.Orbit

        data.viewOrigin = false
        data.originSize = 10.0

        data.grid = false
        data.gridSize = 10.0
        data.gridDivisions = 10.0

        return data
    }

    async builder(node: Node): Promise<void> {
        await super.builder(node)

        const id: string = this.getId(node)
        const input: Input = new Input(id, '3DObjects', anyTypeSocket)
        node.addInput(input)
    }

    worker(nodeData: NodeData): void {

    }


}