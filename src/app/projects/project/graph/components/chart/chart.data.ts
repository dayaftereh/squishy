import { SquishyNodeData } from '../squishy-node.data';
import { ChartAxisScaling } from './chart-axis-scaling';
import { ChartDatasetConfig } from './chart-dataset.config';
import { ChartScalingType } from './chart-scaling-type';
import { ChartZoomPanAxis } from './chart-zoom-pan-axis';

export interface ChartData extends SquishyNodeData {
    animation: boolean
    lineTension: number
    pan: ChartZoomPanAxis
    zoom: ChartZoomPanAxis
    tooltipFractionDigits: number
    datasets: { [key: string]: ChartDatasetConfig }
    axisScaling: ChartAxisScaling
    axisScalingXAxisMin: number
    axisScalingXAxisMax: number
    axisScalingYAxisMin: number
    axisScalingYAxisMax: number
    xScalingType: ChartScalingType
    yScalingType: ChartScalingType
}