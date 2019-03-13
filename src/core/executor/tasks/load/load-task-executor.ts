import { ExecutionData } from '../../../exectuion/data/execution-data';
import { ExecutionPlanEntry } from '../../../exectuion/plan/execution-plan-entry';
import { LoadTask } from '../../../exectuion/task/load/load-task';
import { LoadTaskFormat } from '../../../exectuion/task/load/load-task-format';
import { TaskId } from '../../../exectuion/task/task-id';
import { TaskState } from '../../../exectuion/task/task-state';
import { ExecutionObject } from '../../execution-object';
import { ExecutorContext } from '../../executor-context';
import { TaskExecutor } from '../task-executor';
import { LoadTaskCSVLoader } from './load-task-csv-loader';
import { LoadTaskJsonLoader } from './load-task-json-loader';
import { LoadTaskLoader } from './load-task-loader';
import { LoadTaskPlainLoader } from './load-task-plain-loader';

export class LoadTaskExecutor implements TaskExecutor<ExecutionObject> {

    constructor(
        private readonly context: ExecutorContext,
        private readonly entry: ExecutionPlanEntry
    ) {
    }

    execute(): ExecutionObject {
        try {
            return this.execute0();
        } catch (e) {
            this.context.emitStateChange(this.entry.task.id, TaskState.FAILED);
            throw e;
        }
    }

    private execute0(): ExecutionObject {
        this.context.emitStateChange(this.entry.task.id, TaskState.RUNNING);
        const loader: LoadTaskLoader = this.findLoader();
        const result: ExecutionObject = loader.load();
        this.context.emitStateChange(this.entry.task.id, TaskState.COMPLETED);
        return result;
    }

    private findLoader(): LoadTaskLoader {
        const files: File[] = this.files();
        const task: LoadTask = this.task();

        switch (task.format) {
            case LoadTaskFormat.CSV:
                return new LoadTaskCSVLoader(task, files);
            case LoadTaskFormat.PLAIN:
                return new LoadTaskPlainLoader(task, files);
            case LoadTaskFormat.JSON:
                return new LoadTaskJsonLoader(task, files);
        }

        return new LoadTaskCSVLoader(task, files);
    }

    private task(): LoadTask {
        return this.entry.task as LoadTask;
    }

    private files(): File[] {
        const executionData: ExecutionData = this.context.execution.data;
        if (!executionData) {
            return [];
        }
        const taskId: TaskId = this.entry.task.id;
        const files: File[] = executionData[taskId];
        if (!files) {
            return [];
        }
        return files;
    }

}