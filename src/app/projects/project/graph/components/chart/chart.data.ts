import { SquishyNodeData } from '../squishy-node.data';
import { ChartDatasetConfig } from './chart-dataset.config';

export interface ChartData extends SquishyNodeData {
    animation: boolean
    datasets: { [key: string]: ChartDatasetConfig }
}