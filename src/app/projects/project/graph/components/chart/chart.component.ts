import { Input, Node } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { Color } from 'src/worker/execution/node-executor/script/math/color';
import { Vec2 } from 'src/worker/execution/node-executor/script/math/geometry/vec2';
import { GraphNodesManager } from '../../graph-nodes.manager';
import { anyTypeSocket } from '../../sockets/any-type.socket';
import { NodeComponentsType } from '../node-components.type';
import { NodeDynamicInputEvent } from '../node-dynamic-input.event';
import { NodeDynamicInputManager } from '../node-dynamic-input.manager';
import { SquishyNodeComponent } from '../squishy-node.component';
import { ChartAxisScaling } from './chart-axis-scaling';
import { ChartDatasetConfig } from './chart-dataset.config';
import { ChartNodeComponent } from './chart-node.component';
import { ChartScalingType } from './chart-scaling-type';
import { ChartZoomPanAxis } from './chart-zoom-pan-axis';
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
        data.lineTension = 0.0
        data.name = `Chart_${n}`
        data.animation = true
        data.pan = ChartZoomPanAxis.None
        data.zoom = ChartZoomPanAxis.None
        data.tooltipFractionDigits = 3

        data.axisScaling = ChartAxisScaling.Auto
        data.axisScalingXAxisMin = 0.0
        data.axisScalingXAxisMax = 0.0
        data.axisScalingYAxisMin = 0.0
        data.axisScalingYAxisMax = 0.0

        data.xScalingType = ChartScalingType.Linear
        data.yScalingType = ChartScalingType.Linear

        return data
    }

    async builder(node: Node): Promise<void> {
        await super.builder(node)

        this.dynamicInputManager.load(node)

        this.dynamicInputManager.onDelete.subscribe((event: NodeDynamicInputEvent) => {
            this.removeDataset(event.id, event.node)
        })
    }

    worker(nodeData: NodeData): void {
        this.syncDatasets(nodeData)
        this.dynamicInputManager.update(nodeData)
    }

    private syncDatasets(nodeData: NodeData): void {
        if (Utils.isNullOrUndefined(nodeData.data)) {
            return
        }

        const chartData: ChartData = nodeData.data as any as ChartData
        if (Utils.isNullOrUndefined(chartData.datasets)) {
            return
        }

        const keys: string[] = Object.keys(chartData.datasets)
        keys.filter((id: string) => {
            return !this.dynamicInputManager.hasConnection(nodeData, id)
        }).filter((id: string) => {
            delete chartData.datasets[id]
        })
    }

    private factoryDataset(id: string, node: Node): Input {
        const chartData: ChartData = node.data as any as ChartData

        // load a already configured dataset
        const datasetConfig: ChartDatasetConfig | undefined = chartData.datasets[id]

        // check if a dataset config was found
        if (Utils.isNullOrUndefined(datasetConfig)) {
            // if not create a new dataset config
            const n: number = Object.keys(chartData.datasets).length + 1
            // update the new created dataset config
            chartData.datasets[id] = this.createDatasetConfig(n)
        }

        const input: Input = new Input(id, 'Dataset', anyTypeSocket)
        return input
    }

    private createDatasetConfig(n: number): ChartDatasetConfig {
        const color: Color = Color.random()
        return {
            color: color.toHex(),
            fill: false,
            lines: true,
            lineWidth: 3.0,
            pointRadius: 3.0,
            name: `Dataset_${n}`
        } as ChartDatasetConfig
    }

    private removeDataset(id: string, node: Node): void {
        const chartData: ChartData = node.data as any as ChartData
        delete chartData.datasets[id]
    }

}