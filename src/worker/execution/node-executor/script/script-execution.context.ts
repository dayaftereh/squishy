import { ExecutionContext } from '../../execution-context';
import { Execution } from '../../execution';
import { ScriptTools } from './tools/script.tools';
import { Utils } from 'src/app/utils/utils';
import { ScriptMath } from './math/script.math';

export class ScriptExecutionContext {

    math: ScriptMath | undefined

    plugins: ScriptTools | undefined

    constructor(private readonly execution: Execution) {
        this.math = new ScriptMath()
        this.plugins = new ScriptTools()
    }

    get context(): any {
        return this.execution.context()
    }

    progress(value: number): void {
        // limit the value to 0 -> 1
        value = this.math.limit(0.0, value, 1.0)
        // update the progress
        this.execution.progress(value)
    }
}