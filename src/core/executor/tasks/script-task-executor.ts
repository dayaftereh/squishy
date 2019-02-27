import { ExecutionPlanEntry } from '../../exectuion/plan/execution-plan-entry';
import { ScriptTask } from '../../exectuion/task/script/script-task';
import { TaskId } from '../../exectuion/task/task-id';
import { TaskState } from '../../exectuion/task/task-state';
import { ExecutorContext } from '../executor-context';
import { TaskExecutor } from './task-executor';
import { TaskExecutorFinder } from './task-executor-finder';

export class ScriptTaskExecutor<T> implements TaskExecutor<T> {

    constructor(
        private readonly context: ExecutorContext,
        private readonly entry: ExecutionPlanEntry
    ) {

    }

    execute(): T {
        this.context.emitStateChange(this.entry.task.id, TaskState.PENDING);
        const results: Map<string, T> = this.executeChildren();

        this.context.emitStateChange(this.entry.task.id, TaskState.RUNNING);
        const func: Function = this.createScriptFunction();
        const result: T = this.executeFunction(func, results);

        this.context.emitStateChange(this.entry.task.id, TaskState.COMPLETED);
        return result;
    }

    private executeChildren(): Map<string, T> {
        const tasksResults: Map<string, T> = new Map<string, T>();
        this.entry.children.forEach((child: ExecutionPlanEntry) => {
            const taskId: TaskId = child.task.id;
            const result: T = TaskExecutorFinder.findAndExecute(this.context, child);
            tasksResults.set(taskId, result);
        });
        return tasksResults;
    }

    private createScriptFunction(): Function {
        const scriptTask: ScriptTask = this.task();
        const parameterNames: string[] = Object.keys(scriptTask.input);
        const func: Function = new Function(...parameterNames, scriptTask.script);
        return func;
    }

    private executeFunction(func: Function, results: Map<string, T>): T {
        const scriptTask: ScriptTask = this.task();
        const parameterNames: string[] = Object.keys(scriptTask.input);
        const parameters: (T | undefined)[] = parameterNames.map((parameterName: string) => {
            const taskId: TaskId = scriptTask.input[parameterName];
            const parameter: T | undefined = results.get(taskId);
            return parameter;
        });

        const result: T = func(...parameters);
        return result;
    }

    task(): ScriptTask {
        return this.entry.task as ScriptTask;
    }


}