import { Execution } from '../../../execution';
import { clamp } from '../math/math-functions';
import { SquishyIO } from './io/squishy-io';
import { Squishy } from './squishy';

export class SquishyObject implements Squishy {

    io: SquishyIO

    constructor(private readonly execution: Execution) {
        this.io = new SquishyIO()
    }

    get context(): any {
        return this.execution.context()
    }

    progress(value: number): void {
        // limit the value to 0 -> 1
        value = clamp(0.0, value, 1.0)
        // update the progress
        this.execution.progress(value)
    }
}