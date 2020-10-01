import { SquishyNodeData } from '../squishy-node.data';
import { View3DControl } from './view3d.control';
import { View3DInput } from './view3d.input';

export interface View3DData extends SquishyNodeData {
    grid: boolean
    gridSize: number
    gridDivisions: number
    viewOrigin: boolean
    originSize: number
    control: View3DControl
    inputs: { [key: string]: View3DInput }
}