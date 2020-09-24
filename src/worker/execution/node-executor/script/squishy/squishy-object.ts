import { Execution } from '../../../execution';
import { Mathf } from '../math/Mathf';
import { SquishyApi } from './squishy-api';

export class SquishyObject implements SquishyApi {

    constructor(private readonly execution: Execution) {

    }

    get context(): any {
        return this.execution.context()
    }

    progress(value: number): void {
        // limit the value to 0 -> 1
        value = Mathf.clamp(0.0, value, 1.0)
        // update the progress
        this.execution.progress(value)
    }
}