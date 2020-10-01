import { SquishyIO } from './io/squishy-io';
import { View3D } from './view3d/view3d';

export interface Squishy {
    context: any
    io: SquishyIO
    view3d: View3D
    progress(value: number): void
}