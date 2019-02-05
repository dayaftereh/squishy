import { TaskExecuteMessage } from '../../src/app/services/execution/message/task-execute-message';
import { TaskMessage } from '../../src/app/services/execution/message/task-message';
import { TaskMessageType } from '../../src/app/services/execution/message/task-message-type';
import { TaskExecution } from '../../src/app/services/execution/task-execution';
import { Task } from '../../src/app/services/task/task';
import { TaskType } from '../../src/app/services/task/task-type';
import { ExecutionWorker } from '../execution-worker/execution-worker';

export class TasksExecutor {

    constructor(private readonly executionWorker: ExecutionWorker) {

    }

    start(): void {
        this.executionWorker.subject.subscribe((message: TaskMessage) => {
            this.dispatch(message);
        });
    }

    private dispatch(message: TaskMessage): void {
        switch (message.type) {
            case TaskMessageType.EXECUTE:
                const executionMessage: TaskExecuteMessage = message as TaskExecuteMessage;
                this.execute(executionMessage.execution);
                return;
            case TaskMessageType.ABORT:
                this.abort();
                return;
        }

        this.executionWorker.error(new Error(`unable to dispatch message with type [ ${message.type} ]`));
    }

    private abort(): void {

    }

    private execute(taskExecution: TaskExecution): void {
        taskExecution.tasks.forEach((task: Task) => {
            if (task.type === TaskType.LOAD) {
                const data: any = taskExecution.data[task.id];
                const files: File[] = data;
                console.log(files)
            }
        });

    }
}