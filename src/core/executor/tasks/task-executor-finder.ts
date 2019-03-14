import { ExecutionResult } from '../../exectuion/execution-result';
import { ExecutionPlanEntry } from '../../exectuion/plan/execution-plan-entry';
import { TaskType } from '../../exectuion/task/task-type';
import { ExecutionObject } from '../execution-object';
import { ExecutorContext } from '../executor-context';
import { LoadTaskExecutor } from './load/load-task-executor';
import { OutputTaskExecutor } from './output/output-task-executor';
import { ScriptTaskExecutor } from './script/script-task-executor';
import { TaskExecutor } from './task-executor';

export namespace TaskExecutorFinder {

    export function find(context: ExecutorContext, entry: ExecutionPlanEntry): TaskExecutor<ExecutionObject> {
        switch (entry.task.type) {
            case TaskType.SCRIPT:
                return new ScriptTaskExecutor(context, entry);
            case TaskType.LOAD:
                return new LoadTaskExecutor(context, entry);
        }

        throw new Error(`unable to find executor for task type [ ${entry.task.type} ]`);
    }

    export function findAndExecute(context: ExecutorContext, entry: ExecutionPlanEntry): ExecutionObject {
        const executor: TaskExecutor<ExecutionObject> = TaskExecutorFinder.find(context, entry);
        const result: ExecutionObject = executor.execute();
        return result;
    }

    export function createAndRunOutput(context: ExecutorContext): ExecutionResult {
        const outputTaskExecutor: OutputTaskExecutor = new OutputTaskExecutor(context, context.executionPlan);
        const result: ExecutionResult = outputTaskExecutor.execute();
        return result;
    }

}