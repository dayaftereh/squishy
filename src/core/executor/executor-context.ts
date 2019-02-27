import { Subject } from 'rxjs';
import { Execution } from '../exectuion/execution';
import { ExecutionStatus } from '../exectuion/execution-status';
import { ExecutionPlan } from '../exectuion/plan/execution-plan';
import { TaskId } from '../exectuion/task/task-id';
import { TaskState } from '../exectuion/task/task-state';

export class ExecutorContext {

    running: boolean;

    execution: Execution;

    executionPlan: ExecutionPlan;

    subject: Subject<ExecutionStatus | undefined>;

    constructor() {
    }

    emitStateChange(taskId: TaskId, taskState: TaskState): void {

    }
}