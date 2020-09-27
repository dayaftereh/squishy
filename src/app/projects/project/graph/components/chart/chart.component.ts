import { Input, Node } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { Color } from 'src/worker/execution/node-executor/script/math/color';
import { GraphNodesManager } from '../../graph-nodes.manager';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { NodeDynamicInputManager } from '../node-dynamic-input.manager';
import { SquishyNodeComponent } from '../squishy-node.component';
import { ChartDatasetConfig } from './chart-dataset.config';
import { ChartNodeComponent } from './chart-node.component';
import { ChartData } from './chart.data';

export class ChartComponent extends SquishyNodeComponent<ChartData> {

    private dynamicInputManager: NodeDynamicInputManager

    constructor(protected readonly graphNodesManager: GraphNodesManager) {
        super(`Chart`, ChartNodeComponent, graphNodesManager)
        this.dynamicInputManager = new NodeDynamicInputManager(
            this.factoryDataset.bind(this),
            this.graphNodesManager
        )
    }

    protected async nodeData(data: ChartData): Promise<ChartData> {
        const n: number = this.graphNodesManager.size() + 1

        data.type = NodeComponentsType.Chart
        data.datasets = {}
        data.name = `Chart${n}`
        return data
    }

    async builder(node: Node): Promise<void> {
        this.dynamicInputManager.load(node)

        this.dynamicInputManager.onDelete.subscribe((id: string) => {
            this.removeDataset(id, node)
        })
    }

    worker(nodeData: NodeData): void {
        this.dynamicInputManager.update(nodeData)
    }

    private factoryDataset(id: string, node: Node): Input {
        const chartData: ChartData = node.data as any as ChartData
        const n: number = Object.keys(chartData.datasets).length + 1

        const datasetConfig: ChartDatasetConfig = this.createDatasetConfig(n)
        console.log(datasetConfig)

        chartData.datasets[id] = datasetConfig

        const input: Input = new Input(id, 'Dataset', anyTypeSocket)
        return input
    }

    private createDatasetConfig(n: number): ChartDatasetConfig {
        const color: Color = Color.random()
        return {
            color: color.toHex(),
            fill: false,
            lines: true,
            name: `Dataset${n}`
        } as ChartDatasetConfig
    }

    private removeDataset(id: string, node: Node): void {
        const chartData: ChartData = node.data as any as ChartData
        delete chartData.datasets[id]
    }

}