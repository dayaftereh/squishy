import { Execution } from '../../exectuion/execution';
import { ExecutionResult } from '../../exectuion/execution-result';
import { ExecutionPlanEntry } from '../../exectuion/plan/execution-plan-entry';
import { TaskExecutor } from './task-executor';

export class OutputTaskExecutor implements TaskExecutor<ExecutionResult> {

    entry: ExecutionPlanEntry;

    constructor(
        private readonly execution: Execution,
        private readonly entry: ExecutionPlanEntry
    ) {
        this.entry = entry;
    }

    async execute(): Promise<ExecutionResult> {

    }

    private runChildren(): Promise<any> {
        if (!this.entry.children || this.entry.children.length < 1) {
            return {};
        }
        const first: ExecutionPlanEntry = this.entry.children[0];

    }

}