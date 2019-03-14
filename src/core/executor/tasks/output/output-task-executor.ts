import { ExecutionResult } from '../../../exectuion/execution-result';
import { ExecutionPlanEntry } from '../../../exectuion/plan/execution-plan-entry';
import { OutputTask } from '../../../exectuion/task/output/output-task';
import { OutputTaskFormat } from '../../../exectuion/task/output/output-task-format';
import { TaskState } from '../../../exectuion/task/task-state';
import { ExecutionObject } from '../../execution-object';
import { ExecutorContext } from '../../executor-context';
import { TaskExecutor } from '../task-executor';
import { TaskExecutorFinder } from '../task-executor-finder';
import { OutputTaskCSVExporter } from './output-task-csv-exporter';
import { OutputTaskExporter } from './output-task-exporter';
import { OutputTaskJSONExporter } from './output-task-json-exporter';
import { OutputTaskPlainExporter } from './output-task-plain-exporter';

export class OutputTaskExecutor implements TaskExecutor<ExecutionResult> {

    constructor(
        private readonly context: ExecutorContext,
        private readonly entry: ExecutionPlanEntry
    ) {
    }

    execute(): ExecutionResult {
        this.context.emitStateChange(this.entry.task.id, TaskState.PENDING);
        const data: ExecutionObject | undefined = this.runChildren();

        try {
            return this.execute0(data);
        } catch (e) {
            this.context.emitStateChange(this.entry.task.id, TaskState.FAILED);
            throw e;
        }
    }

    private execute0(data: ExecutionObject | undefined): ExecutionResult {
        this.context.emitStateChange(this.entry.task.id, TaskState.RUNNING);

        const result: ExecutionResult = {
            blob: undefined
        } as ExecutionResult;

        if (data) {
            const exporter: OutputTaskExporter = this.findExporter();
            result.blob = exporter.export(data);
        }

        this.context.emitStateChange(this.entry.task.id, TaskState.COMPLETED);

        return result;

    }

    private findExporter(): OutputTaskExporter {
        const task: OutputTask = this.task();
        switch (task.format) {
            case OutputTaskFormat.CSV:
                return new OutputTaskCSVExporter(task);
            case OutputTaskFormat.PLAIN:
                return new OutputTaskPlainExporter(task);
            case OutputTaskFormat.JSON:
                return new OutputTaskJSONExporter(task);
        }

        return new OutputTaskCSVExporter(task);
    }

    private runChildren(): ExecutionObject | undefined {
        if (!this.entry.children || this.entry.children.length < 1) {
            return undefined;
        }
        const first: ExecutionPlanEntry = this.entry.children[0];
        const result: ExecutionObject = TaskExecutorFinder.findAndExecute(this.context, first);
        return result;
    }

    private task(): OutputTask {
        return this.entry.task as OutputTask;
    }

}
