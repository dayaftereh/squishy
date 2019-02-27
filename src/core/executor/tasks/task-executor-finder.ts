import { ExecutionPlanEntry } from '../../exectuion/plan/execution-plan-entry';
import { TaskType } from '../../exectuion/task/task-type';
import { ExecutorContext } from '../executor-context';
import { LoadTaskExecutor } from './load-task-executor';
import { ScriptTaskExecutor } from './script-task-executor';
import { TaskExecutor } from './task-executor';

export namespace TaskExecutorFinder {

    export function find<T>(context: ExecutorContext, entry: ExecutionPlanEntry): TaskExecutor<T> {
        switch (entry.task.type) {
            case TaskType.SCRIPT:
                return new ScriptTaskExecutor(context, entry);
            case TaskType.LOAD:
                return new LoadTaskExecutor(context, entry);
        }

        throw new Error(`unable to find executor for task type [ ${entry.task.type} ]`);
    }

    export function findAndExecute<T>(context: ExecutorContext, entry: ExecutionPlanEntry): T {
        const executor: TaskExecutor<T> = TaskExecutorFinder.find(context, entry);
        const result: T = executor.execute();
        return result;
    }

}