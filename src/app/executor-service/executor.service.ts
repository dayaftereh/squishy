import { Injectable } from '@angular/core';
import * as Comlink from 'comlink';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { ExecutionResult } from 'src/worker/execution/execution-result';
import { ExecutionStatus } from 'src/worker/execution/execution-status';
import { Executor } from 'src/worker/executor';
import { ExecutionData } from '../../worker/execution/execution-data';
import { ExecutionResultManager } from './execution-result.manager';
import { ExecutionState } from 'src/worker/execution/execution-state';
import { ExecutionLatch } from '../utils/execution-latch';

@Injectable()
export class ExecutorService {

    private _workerId: number

    private worker: Worker | undefined
    private executor: Executor | undefined

    private project: SquishyProject | undefined
    private executionData: ExecutionData | undefined

    private _status: Subject<ExecutionStatus>
    private _executable: BehaviorSubject<void>

    private _cancelLatch: ExecutionLatch<void> | undefined

    constructor() {
        this._workerId = 0
        this.executionData = {}
        this._status = new Subject<ExecutionStatus>()
        this._executable = new BehaviorSubject<void>(undefined)
        this.createWorker()
    }

    private async createWorker(): Promise<void> {
        // create the web worker
        this.worker = new Worker('../../worker/executor.worker.ts', {
            type: 'module',
            name: `SquishyWorker-${this._workerId++}`
        })
        // make a proxy around the web worker
        const ExecutorProxy: any = Comlink.wrap<Executor>(this.worker)
        // create the executor
        this.executor = await (new ExecutorProxy())
        // subscribe to the execution status
        this.executor.subscribe(Comlink.proxy(async (status: ExecutionStatus) => {
            this._status.next(status)
        }))
    }

    setProject(project: SquishyProject): void {
        // reset the excutor data
        this.executionData = {}
        // update the project
        this.project = project;
    }

    setData(id: string, data: unknown): void {
        if (this.executionData) {
            this.executionData[id] = data
        }
        this._executable.next()
    }

    isExecuteable(): boolean {
        if (!this.project) {
            return false
        }
        if (!this.executionData) {
            return false
        }
    }

    executeable(): Observable<boolean> {
        return this._executable.pipe(
            map(() => {
                return this.isExecuteable()
            })
        )
    }

    status(): Observable<ExecutionStatus> {
        return this._status.asObservable()
    }

    done(): Observable<void> {
        return this._status.pipe(
            filter((status: ExecutionStatus) => {
                return status.state === ExecutionState.DONE
            }),
            map(() => undefined)
        )
    }

    started(): Observable<void> {
        return this._status.pipe(
            filter((status: ExecutionStatus) => {
                return status.state === ExecutionState.STARTED
            }),
            map(() => undefined)
        )
    }

    async execute(): Promise<ExecutionResult | undefined> {
        // check for project and execute data
        if (!this.project || !this.executionData) {
            throw new Error('no project or execution data given')
        }

        // create the cancel latch for this execution
        this._cancelLatch = new ExecutionLatch<void>()

        // fire the started state
        this.emitStatus(ExecutionState.STARTED)

        try {
            // execute the project with the given execution data
            const result: ExecutionResult | void = await Promise.race([
                // wait for cancel or execution done
                this._cancelLatch.await(),
                this.executor.execute(this.project, this.executionData)
            ])
            // check if the execution has been canceled
            if (!result) {
                return undefined
            }

            // create the result manager
            const executionResultManager: ExecutionResultManager = new ExecutionResultManager(this.project)
            // dispatch the received result from the execution
            await executionResultManager.dispatch(result)

            return result
        } finally {
            // reset the cancel latch
            this._cancelLatch = undefined
            // fire the done state
            this.emitStatus(ExecutionState.DONE)
        }
    }

    private emitStatus(state: ExecutionState): void {
        // create a empty state
        this._status.next({
            state,
            total: 0,
            executed: 0,
            progress: 0.0,
        } as ExecutionStatus)
    }

    async cancel(): Promise<void> {
        // check if a worker has been created
        if (this.worker) {
            // terminate the worker
            this.worker.terminate()
        }

        // check if a cancel latch active
        if (this._cancelLatch) {
            // release the cancel latch to cancel the execution
            this._cancelLatch.resolve()
        }
        // create a new worker, because last was canceled
        this.createWorker()
    }


}