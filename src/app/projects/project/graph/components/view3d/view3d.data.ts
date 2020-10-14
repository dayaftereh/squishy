import { SquishyNodeData } from '../squishy-node.data';
import { View3DUpVector } from './view3d-up.vector';
import { View3DControl } from './view3d.control';

export interface View3DData extends SquishyNodeData {
    fov: number
    near: number
    far: number
    antiAlias: boolean
    up: View3DUpVector
    grid: boolean
    gridSize: number
    gridDivisions: number
    viewOrigin: boolean
    originSize: number
    control: View3DControl
}