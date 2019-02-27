import { BehaviorSubject } from 'rxjs';
import { Execution } from '../exectuion/execution';
import { ExecutionResult } from '../exectuion/execution-result';
import { ExecutionStatus } from '../exectuion/execution-status';
import { ExecutionPlan } from '../exectuion/plan/execution-plan';
import { ExecutionPlanUtils } from '../exectuion/plan/execution-plan.utils';
import { OutputTaskExecutor } from './tasks/output-task-executor';

export class Executor {

    running: boolean;

    subject: BehaviorSubject<ExecutionStatus | undefined>;

    constructor() {
        this.running = false;
        this.subject = new BehaviorSubject<ExecutionStatus | undefined>(undefined);
    }

    async execute(execution: Execution): Promise<ExecutionResult> {
        this.running = true;
        this.subject.next({} as ExecutionStatus);
        const executionPlan: ExecutionPlan = ExecutionPlanUtils.executionPlan(execution.output, execution.tasks);

        const out: OutputTaskExecutor = new OutputTaskExecutor()
    }


}