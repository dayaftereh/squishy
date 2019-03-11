import { ExecutionPlanEntry } from '../../../exectuion/plan/execution-plan-entry';
import { ScriptTask } from '../../../exectuion/task/script/script-task';
import { TaskId } from '../../../exectuion/task/task-id';
import { TaskState } from '../../../exectuion/task/task-state';
import { ExecutionObject } from '../../execution-object';
import { ExecutorContext } from '../../executor-context';
import { TaskExecutor } from '../task-executor';
import { TaskExecutorFinder } from '../task-executor-finder';
import { ScriptExecuteContext } from './script-execute-context';

export class ScriptTaskExecutor implements TaskExecutor<ExecutionObject> {

    constructor(
        private readonly context: ExecutorContext,
        private readonly entry: ExecutionPlanEntry
    ) {

    }

    execute(): ExecutionObject {
        this.context.emitStateChange(this.entry.task.id, TaskState.PENDING);
        const results: Map<string, ExecutionObject> = this.executeChildren();

        this.context.emitStateChange(this.entry.task.id, TaskState.RUNNING);
        const func: Function = this.createScriptFunction();
        const result: ExecutionObject = this.executeFunction(func, results);

        this.context.emitStateChange(this.entry.task.id, TaskState.COMPLETED);
        return result;
    }

    private executeChildren(): Map<string, ExecutionObject> {
        const tasksResults: Map<string, ExecutionObject> = new Map<string, ExecutionObject>();
        this.entry.children.forEach((child: ExecutionPlanEntry) => {
            const taskId: TaskId = child.task.id;
            const result: ExecutionObject = TaskExecutorFinder.findAndExecute(this.context, child);
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

    private createExecutionContext(): ScriptExecuteContext {
        return this.context.scriptContext;
    }

    private executeFunction(func: Function, results: Map<string, ExecutionObject>): ExecutionObject {
        const scriptTask: ScriptTask = this.task();
        const parameterNames: string[] = Object.keys(scriptTask.input);
        const parameters: (ExecutionObject | undefined)[] = parameterNames.map((parameterName: string) => {
            const taskId: TaskId = scriptTask.input[parameterName];
            const parameter: ExecutionObject | undefined = results.get(taskId);
            return parameter;
        });

        const context: ScriptExecuteContext = this.createExecutionContext();
        const result: ExecutionObject = func.call(context, ...parameters);
        return result;
    }

    private task(): ScriptTask {
        return this.entry.task as ScriptTask;
    }


}