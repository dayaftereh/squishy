import { ExecutionContext } from '../../execution-context';
import { Execution } from '../../execution';
import { ScriptTools } from './tools/script.tools';

export class ScriptExecutionContext {

    plugins: ScriptTools | undefined

    constructor(private readonly execution: Execution) {
        this.plugins = new ScriptTools()
    }

    get running(): boolean {
        return this.execution.running
    }

    get context(): any {
        return this.execution.context()
    }

    cancel(): void {
        this.execution.cancel()
    }

    progress(value: number): void {

    }
}