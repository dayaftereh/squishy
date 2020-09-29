import { NodeData } from 'rete/types/core/data';
import { ChartDatasetConfig } from 'src/app/projects/project/graph/components/chart/chart-dataset.config';
import { ChartZoomPanAxis } from 'src/app/projects/project/graph/components/chart/chart-zoom-pan-axis';
import { ChartData } from 'src/app/projects/project/graph/components/chart/chart.data';
import { Utils } from 'src/app/utils/utils';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { NodeExecutor } from '../node-executor';
import { ChartExecutionResult } from './chart-execution.result';
import { ChartExecutionData } from './chart.execution-data';

export class ChartNodeExecutor extends AbstractNodeExecutor {

    constructor(execution: Execution, nodeData: NodeData, executionData: ChartExecutionData) {
        super(execution, nodeData, executionData)
    }

    protected async internalExecute(): Promise<void> {
        // get the chart data
        const chartData: ChartData = this.getNodeData<ChartData>()
        // check if the chart data not empty
        if (Utils.isNullOrUndefined(chartData)) {
            throw new Error('unable to get chart data')
        }

        // load and create all datasets
        const datasets: any[] = await Promise.all(Utils.mapProperties(chartData.datasets, async (value: ChartDatasetConfig, key: string) => {
            // load the dataset
            const dataset: any = this.dataset(key, chartData, value)
            return dataset
        }))

        // remove all undefined datasets
        const filteredDatasets: any[] = datasets.filter((dataset: any) => {
            return !Utils.isNullOrUndefined(dataset)
        })

        // create the options
        const options: any = await this.options(chartData)

        // create the result
        const result: ChartExecutionResult = {
            id: this.id(),
            data: {
                datasets: filteredDatasets
            },
            options
        } as ChartExecutionResult

        // set the final result
        this.result = result
    }

    private async dataset(id: string, chartData: ChartData, datasetConfig: ChartDatasetConfig): Promise<any[]> {
        // get the node node executor
        const nodeExecutor: NodeExecutor | undefined = await this.getExecutor(id)

        // check if a node executor was found
        if (Utils.isNullOrUndefined(nodeExecutor)) {
            return undefined
        }

        // check if the node executor already executed
        if (!nodeExecutor.isExecuted()) {
            throw new Error(`node executor [ ${nodeExecutor.id()} ] for dataset [ ${id}, ${datasetConfig.name} ] is not yet executed`)
        }
        // get the result
        const data: any = nodeExecutor.getResult()
        // create the data set
        const dataset: any = this.createDataset(data, chartData, datasetConfig)

        return dataset
    }

    private async createDataset(data: any, chartData: ChartData, datasetConfig: ChartDatasetConfig): Promise<any> {
        const lineTension: number = chartData.lineTension || 0.0
        return {
            data,
            lineTension,
            fill: datasetConfig.fill,
            label: datasetConfig.name,
            showLine: datasetConfig.lines,
            borderColor: datasetConfig.color,
            pointBackgroundColor: datasetConfig.color,
        }
    }

    private async options(chartData: ChartData): Promise<any> {
        const zoom: any = await this.zoomPanPlugin(chartData)
        const animationDuration: number = Math.max(chartData.animation ? 750.0 : 0.0, 0.0)
        return {
            animation: {
                duration: animationDuration
            },
            hover: {
                animationDuration: animationDuration
            },
            responsiveAnimationDuration: animationDuration,
            plugins: {
                zoom
            }
        }
    }

    private async zoomPanPlugin(chartData: ChartData): Promise<any> {
        const panEnabled: boolean = chartData.pan !== ChartZoomPanAxis.None
        const zoomEnabled: boolean = chartData.zoom !== ChartZoomPanAxis.None

        let zoom: any = {
            pan: {
                enabled: panEnabled
            },
            zoom: {
                enabled: zoomEnabled
            }
        }

        if (panEnabled) {
            zoom.pan.mode = `${chartData.pan}`.toLowerCase()
        }

        if (zoomEnabled) {
            zoom.zoom.mode = `${chartData.zoom}`.toLowerCase()
        }

        return zoom
    }

    hasOutput(): boolean {
        return true
    }

}