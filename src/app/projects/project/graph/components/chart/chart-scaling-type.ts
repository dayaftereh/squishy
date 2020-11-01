import { closeZero } from "src/worker/execution/node-executor/script/math/math.module";

export enum ChartScalingType {
    Linear = 'Linear',
    Logarithmic = 'logarithmic'
}

export const ChartScalingTypes: ChartScalingType[] = [
    ChartScalingType.Linear, ChartScalingType.Logarithmic,
]