import { Subject } from 'rxjs';
import { Execution } from '../exectuion/execution';
import { ExecutionStatus } from '../exectuion/execution-status';
import { ExecutionPlan } from '../exectuion/plan/execution-plan';
import { TaskId } from '../exectuion/task/task-id';
import { TaskState } from '../exectuion/task/task-state';
import { ScriptExecuteContext } from './tasks/script/script-execute-context';

export class ExecutorContext {

    running: boolean;

    execution: Execution;

    executionPlan: ExecutionPlan;

    scriptContext: ScriptExecuteContext;

    subject: Subject<ExecutionStatus | undefined>;

    private readonly executionStatus: ExecutionStatus;

    constructor() {
        this.running = true;
        this.executionStatus = {};
        this.subject = new Subject<ExecutionStatus | undefined>();
    }

    isRunning(): boolean {
        return this.running;
    }

    emitStateChange(taskId: TaskId, taskState: TaskState): void {
        this.executionStatus[taskId] = taskState;
        this.subject.next(this.executionStatus);
    }

    abort(): void {
        this.running = false;
    }

}
