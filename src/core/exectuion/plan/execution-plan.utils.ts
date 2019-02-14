import { OutputTask } from '../task/output/output-task';
import { ScriptTask } from '../task/script/script-task';
import { Task } from '../task/task';
import { TaskId } from '../task/task-id';
import { TaskType } from '../task/task-type';
import { Tasks } from '../task/tasks';
import { ExecutionPlan } from './execution-plan';
import { ExecutionPlanEntry } from './execution-plan-entry';

export namespace ExecutionPlanUtils {

    export function executionPlan(output: Task, tasks: Tasks): ExecutionPlan {
        const children: ExecutionPlanEntry[] = ExecutionPlanUtils.deep(output, tasks);
        return {
            children,
            task: output
        };
    }

    export function deep(root: Task, tasks: Tasks): ExecutionPlanEntry[] {
        const children: Task [] = ExecutionPlanUtils.getChildren(root, tasks);
        if (!children || children.length < 1) {
            return [];
        }

        return children.map((child: Task) => {
            const entries: ExecutionPlanEntry[] = ExecutionPlanUtils.deep(child, tasks);
            return {
                task: child,
                children: entries
            };
        });
    }

    export function getChildren(root: Task, tasks: Tasks): Task[] {
        const children: Task[] = [];
        if (root.type === TaskType.OUTPUT) {
            const list: Task[] = ExecutionPlanUtils.getOutputChildren(root as OutputTask, tasks);
            children.push(...list);
        } else if (root.type === TaskType.SCRIPT) {
            const list: Task[] = ExecutionPlanUtils.getScriptChildren(root as ScriptTask, tasks);
            children.push(...list);
        }

        return children;
    }

    export function getOutputChildren(outputTask: OutputTask, tasks: Tasks): Task[] {
        if (!outputTask || !outputTask.input) {
            return [];
        }

        const task: Task | undefined = tasks[outputTask.input];
        if (!task) {
            return [];
        }
        return [task];
    }

    export function getScriptChildren(scriptTask: ScriptTask, tasks: Tasks): Task[] {
        if (!scriptTask || !scriptTask.input) {
            return [];
        }

        const keys: string[] = Object.keys(scriptTask.input);
        return keys.map((key: string) => {
            const taskId: TaskId = scriptTask.input[key];
            return taskId;
        }).map((id: TaskId) => {
            const task: Task | undefined = tasks[id];
            return task;
        }).filter((task: Task | undefined) => {
            return !!(task);
        });
    }

}