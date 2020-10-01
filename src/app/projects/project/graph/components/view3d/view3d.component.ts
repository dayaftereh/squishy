import { Input, Node } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { Color } from 'src/worker/execution/node-executor/script/math/color';
import { GraphNodesManager } from '../../graph-nodes.manager';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { NodeDynamicInputEvent } from '../node-dynamic-input.event';
import { NodeDynamicInputManager } from '../node-dynamic-input.manager';
import { SquishyNodeComponent } from '../squishy-node.component';
import { View3DInputType } from './view3d-input.type';
import { View3DNodeComponent } from './view3d-node.component';
import { View3DControl } from './view3d.control';
import { View3DData } from './view3d.data';
import { View3DInput } from './view3d.input';

export class View3DComponent extends SquishyNodeComponent<View3DData> {

    private dynamicInputManager: NodeDynamicInputManager

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`View3D`, View3DNodeComponent, graphNodesManager)
        this.dynamicInputManager = new NodeDynamicInputManager(
            this.factoryInput.bind(this),
            this.graphNodesManager
        )
    }

    protected async nodeData(data: View3DData): Promise<View3DData> {
        const n: number = this.graphNodesManager.size() + 1

        data.name = `View3D${n}`
        data.type = NodeComponentsType.View3D

        data.inputs = {}
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

        this.dynamicInputManager.load(node)

        this.dynamicInputManager.onDelete.subscribe((event: NodeDynamicInputEvent) => {
            this.removeInput(event.id, event.node)
        })
    }

    worker(nodeData: NodeData): void {
        this.syncInputs(nodeData)
        this.dynamicInputManager.update(nodeData)
    }

    private syncInputs(nodeData: NodeData): void {
        if (Utils.isNullOrUndefined(nodeData.data)) {
            return
        }

        const view3dDate: View3DData = nodeData.data as any as View3DData
        if (Utils.isNullOrUndefined(view3dDate.inputs)) {
            return
        }

        const keys: string[] = Object.keys(view3dDate.inputs)

        keys.filter((id: string) => {
            return !this.dynamicInputManager.hasConnection(nodeData, id)
        }).filter((id: string) => {
            delete view3dDate.inputs[id]
        })
    }

    private factoryInput(id: string, node: Node): Input {
        const view3dData: View3DData = node.data as any as View3DData

        let view3dInput: View3DInput | undefined = view3dData.inputs[id]

        if (Utils.isNullOrUndefined(view3dInput)) {
            view3dInput = this.createNewInput()
            view3dData.inputs[id] = view3dInput
        }

        const input: Input = new Input(id, '3DInput', anyTypeSocket)
        return input
    }

    private createNewInput(): View3DInput {
        const color: Color = Color.random()

        return {
            size: 5.0,
            color: color.toHex(),
            type: View3DInputType.None
        } as View3DInput
    }

    private removeInput(id: string, node: Node): void {
        const view3dData: View3DData = node.data as any as View3DData
        delete view3dData.inputs[id]
    }

}