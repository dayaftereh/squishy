import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TaskExecution } from '../../services/execution/task-execution';
import { TaskExecutorService } from '../../services/execution/task-executor.service';
import { TaskStatus } from '../../services/execution/task-status';
import { ExecutorService } from './service/executor.service';

@Component({
    selector: 'app-executor',
    templateUrl: './executor.component.html'
})
export class ExecutorComponent implements OnInit, OnDestroy {

    running: boolean;

    status: Observable<TaskStatus>;

    private subscription: Subscription;

    constructor(private readonly executorService: ExecutorService,
                private readonly taskExecutorService: TaskExecutorService) {
        this.running = false;
    }

    ngOnInit(): void {
        this.subscription = this.executorService.eventEmitter.subscribe((taskExecution: TaskExecution) => {
            this.execute(taskExecution);
        });
    }

    private execute(taskExecution: TaskExecution): void {
        this.running = true;
        this.status = this.taskExecutorService.execute(taskExecution);
        this.status.subscribe({
            complete: () => {
                this.running = false;
            }, error: e => {
                console.error(e);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}