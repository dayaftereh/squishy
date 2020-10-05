import { SquishyNodeData } from '../squishy-node.data';
import { View3DControl } from './view3d.control';

export interface View3DData extends SquishyNodeData {
    grid: boolean
    gridSize: number
    gridDivisions: number
    viewOrigin: boolean
    originSize: number
    control: View3DControl
}