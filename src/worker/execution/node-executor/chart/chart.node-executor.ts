import { NodeData } from 'rete/types/core/data';
import { ChartAxisScaling } from 'src/app/projects/project/graph/components/chart/chart-axis-scaling';
import { ChartDatasetConfig } from 'src/app/projects/project/graph/components/chart/chart-dataset.config';
import { ChartScalingType } from 'src/app/projects/project/graph/components/chart/chart-scaling-type';
import { ChartZoomPanAxis } from 'src/app/projects/project/graph/components/chart/chart-zoom-pan-axis';
import { ChartData } from 'src/app/projects/project/graph/components/chart/chart.data';
import { Utils } from 'src/app/utils/utils';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { NodeExecutor } from '../node-executor';
import { Vec2 } from '../script/math/geometry/vec2';
import { ChartExecutionResult } from './chart-execution.result';
import { ChartExecutionData } from './chart.execution-data';

export class ChartNodeExecutor extends AbstractNodeExecutor {

    private minValues: Vec2
    private maxValues: Vec2

    constructor(execution: Execution, nodeData: NodeData, executionData: ChartExecutionData) {
        super(execution, nodeData, executionData)
        this.minValues = new Vec2(Infinity, Infinity)
        this.maxValues = new Vec2(-Infinity, -Infinity)
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

        // check if data is an array
        if (Array.isArray(data)) {
            // get each entry
            data.forEach((entry: any) => {
                this.updateMinMaxValues(entry)
            })
        }

        // create the data set
        const dataset: any = this.createDataset(data, chartData, datasetConfig)

        return dataset
    }

    private async createDataset(data: any, chartData: ChartData, datasetConfig: ChartDatasetConfig): Promise<any> {
        const lineTension: number = chartData.lineTension || 0.0
        const lineWidth: number = isNaN(datasetConfig.lineWidth) ? 3.0 : datasetConfig.lineWidth
        const pointRadius: number = isNaN(datasetConfig.pointRadius) ? 3.0 : datasetConfig.pointRadius

        return {
            data,
            lineTension,
            fill: datasetConfig.fill,
            label: datasetConfig.name,
            showLine: datasetConfig.lines,
            borderColor: datasetConfig.color,
            pointBackgroundColor: datasetConfig.color,
            pointRadius: Math.max(pointRadius, 0.0),
            borderWidth: Math.max(lineWidth, 0.0),
        }
    }

    private updateMinMaxValues(entry: any): void {
        const x: number | undefined = entry.x
        const y: number | undefined = entry.y

        // check if x given
        if (!Utils.isNullOrUndefined(x) && !isNaN(x)) {
            this.minValues.x = Math.min(this.minValues.x, x)
            this.maxValues.x = Math.max(this.maxValues.x, x)
        }

        // check if y given
        if (!Utils.isNullOrUndefined(y) && !isNaN(y)) {
            this.minValues.y = Math.min(this.minValues.y, y)
            this.maxValues.y = Math.max(this.maxValues.y, y)
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
            },
            scales: this.createScales(chartData)
        }
    }

    private createScales(chartData: ChartData): any {
        let axisScaling: ChartAxisScaling | undefined = chartData.axisScaling
        if (Utils.isNullOrUndefined(axisScaling)) {
            axisScaling = ChartAxisScaling.Auto
        }

        if (axisScaling === ChartAxisScaling.Auto) {
            return this.createAutoAxesScaling(chartData)
        }

        if (axisScaling === ChartAxisScaling.Fixed) {
            return this.createFixedAxesScaling(chartData)
        }

        return this.createAspectRatioAxesScaling(chartData)
    }

    private createAutoAxesScaling(chartData: ChartData): any {
        return {
            x: {
                type: this.getXScalingType(chartData),
            },
            y: {
                type: this.getYScalingType(chartData),
            }
        }
    }

    private createFixedAxesScaling(chartData: ChartData): any {
        return {
            xAxes: [
                {
                    display: true,
                    type: this.getXScalingType(chartData),
                    ticks: {
                        min: chartData.axisScalingXAxisMin,
                        max: chartData.axisScalingXAxisMax,
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    type: this.getYScalingType(chartData),
                    ticks: {
                        min: chartData.axisScalingYAxisMin,
                        max: chartData.axisScalingYAxisMax,
                    }
                }
            ]
        }
    }

    private createAspectRatioAxesScaling(chartData: ChartData): any {
        const width: number = Math.abs(this.minValues.x - this.maxValues.x)
        const height: number = Math.abs(this.minValues.y - this.maxValues.y)

        let xMin: number = this.minValues.x
        let xMax: number = this.maxValues.x
        let yMin: number = this.minValues.y
        let yMax: number = this.maxValues.y

        if (width > height) {
            const diff: number = width - height
            yMin = this.minValues.y - (diff / 2.0)
            yMax = this.maxValues.y + (diff / 2.0)
        } else {
            const diff: number = height - width
            xMin = this.minValues.x - (diff / 2.0)
            xMax = this.maxValues.x + (diff / 2.0)
        }

        return {
            xAxes: [{
                type: this.getXScalingType(chartData),
                ticks: {
                    suggestedMin: xMin,
                    suggestedMax: xMax,
                }
            }],
            yAxes: [{
                type: this.getYScalingType(chartData),
                ticks: {
                    suggestedMin: yMin,
                    suggestedMax: yMax,
                }
            }]
        }
    }

    private getXScalingType(chartData: ChartData): string {
        let type: ChartScalingType | undefined = chartData.xScalingType
        if (Utils.isNullOrUndefined(type)) {
            type = ChartScalingType.Linear
        }

        return `${type}`.toLowerCase()
    }

    private getYScalingType(chartData: ChartData): string {
        let type: ChartScalingType | undefined = chartData.yScalingType
        if (Utils.isNullOrUndefined(type)) {
            type = ChartScalingType.Linear
        }

        return `${type}`.toLowerCase()
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