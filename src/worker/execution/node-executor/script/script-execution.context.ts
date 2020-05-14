import { ExecutionContext } from '../../execution-context';
import { Execution } from '../../execution';
import { ScriptTools } from './tools/script.tools';

export class ScriptExecutionContext {

    plugins: ScriptTools | undefined

    constructor(private readonly _execution: Execution, public readonly context: ExecutionContext) {
        this.plugins = new ScriptTools()
    }

    get running(): boolean {
        return this._execution.running
    }

    cancel(): void {
        this._execution.cancel()
    }

    progress(value: number): void {

    }
}