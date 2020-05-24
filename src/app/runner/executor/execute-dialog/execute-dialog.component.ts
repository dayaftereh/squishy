import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExecutorService } from 'src/app/executor-service/executor.service';
import { Subscription } from 'rxjs';
import { ExecutionStatus } from 'src/worker/execution/execution-status';

@Component({
    templateUrl: './execute-dialog.component.html',
    selector: 'app-runner-execute-dialog'
})
export class ExecuteDialogComponent implements OnInit, OnDestroy {

    visible: boolean

    cancelable: boolean

    status: ExecutionStatus | undefined

    private subscriptions: Subscription[]

    constructor(private readonly executorService: ExecutorService) {
        this.visible = false
        this.subscriptions = []
    }

    ngOnInit(): void {
        const statusSubscription: Subscription = this.executorService.status().subscribe((status: ExecutionStatus) => {
            this.status = status;
        })

        const startedSubscription: Subscription = this.executorService.started().subscribe(() => {
            this.started()
        })

        const doneSubscription: Subscription = this.executorService.done().subscribe(() => {
            this.done()
        })

        this.subscriptions.push(statusSubscription, startedSubscription, doneSubscription)
    }

    async cancel(): Promise<void> {
        this.cancelable = false
        await this.executorService.cancel()
    }

    private started(): void {
        // reset all values
        this.visible = true
        this.cancelable = true
        this.status = undefined
    }

    private done(): void {
        // reset the last status
        this.status = {
            total: 0,
            executed: 0,
            progress: 0.0,
            state: undefined
        } as ExecutionStatus

        this.visible = false
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe()
            })
        }
    }


}