import { SquishyNodeData } from '../squishy-node.data';
import { ChartDatasetConfig } from './chart-dataset.config';
import { ChartZoomPanAxis } from './chart-zoom-pan-axis';

export interface ChartData extends SquishyNodeData {
    animation: boolean
    lineTension: number
    pan: ChartZoomPanAxis
    zoom: ChartZoomPanAxis
    tooltipFractionDigits: number
    datasets: { [key: string]: ChartDatasetConfig }
}