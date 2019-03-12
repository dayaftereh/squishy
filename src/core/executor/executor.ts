import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Execution } from '../exectuion/execution';
import { ExecutionResult } from '../exectuion/execution-result';
import { ExecutionStatus } from '../exectuion/execution-status';
import { ExecutionPlanUtils } from '../exectuion/plan/execution-plan.utils';
import { ExecutorContext } from './executor-context';
import { ScriptExecuteContext } from './tasks/script/script-execute-context';
import { ScriptExecuteContextFactory } from './tasks/script/script-execute-context-factory';
import { TaskExecutorFinder } from './tasks/task-executor-finder';

export class Executor {

    subject: Subject<ExecutionStatus | undefined>;

    private context: ExecutorContext | undefined;

    private subscription: Subscription | undefined;

    constructor() {
        this.subject = new BehaviorSubject<ExecutionStatus | undefined>(undefined);
    }

    execute(execution: Execution): ExecutionResult {
        this.abort();
        this.context = this.createExecutorContext(execution);
        const result: ExecutionResult = TaskExecutorFinder.createAndRunOutput(this.context);
        return result;
    }

    private createExecutorContext(execution: Execution): ExecutorContext {
        const executionContext: ExecutorContext = new ExecutorContext();
        executionContext.running = true;
        executionContext.execution = execution;
        executionContext.scriptContext = this.createScriptExecuteContext();
        executionContext.executionPlan = ExecutionPlanUtils.executionPlan(execution.output, execution.tasks);

        this.subscription = executionContext.subject.subscribe(this.subject);

        return executionContext;
    }

    private createScriptExecuteContext(): ScriptExecuteContext {
        const context: ScriptExecuteContext = ScriptExecuteContextFactory.create();
        return context;
    }

    abort(): void {
        if (this.context) {
            this.context.abort();
        }

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.context = undefined;
        this.subscription = undefined;
        this.subject.next(undefined);
    }


}