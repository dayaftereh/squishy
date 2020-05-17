import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import * as Comlink from 'comlink';
import { Executor } from 'src/worker/executor';
import { ExecutionResult } from 'src/worker/execution/execution-result';
import { ExecutionStatus } from 'src/worker/execution/execution-status';
import { ExecutionData } from '../../worker/execution/execution-data';
import { Utils } from '../utils/utils';
import { SquishyNodeData } from '../projects/project/graph/components/squishy-node.data';
import { NodeComponentsType } from '../projects/project/graph/components/node-components.type';
import { FileOutputData } from '../projects/project/graph/components/file-output/file-output.data';
import { Downloader } from '../utils/downloader';
import { UrlHandlingStrategy } from '@angular/router';
import { ExecutionResultManager } from './execution-result.manager';

@Injectable()
export class ExecutorService {

    private worker: Worker | undefined
    private executor: Executor | undefined

    private project: SquishyProject | undefined
    private _status: Subject<ExecutionStatus>
    private _executable: BehaviorSubject<void>
    private executionData: ExecutionData | undefined

    constructor() {
        this.executionData = {}
        this._status = new Subject<ExecutionStatus>()
        this._executable = new BehaviorSubject<void>(undefined)
        this.initWorker()
    }

    private async initWorker(): Promise<void> {
        this.worker = new Worker('../../worker/executor.worker.ts', { type: 'module' })
        const ExecutorProxy: any = Comlink.wrap<Executor>(this.worker)
        this.executor = await (new ExecutorProxy())

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

    async execute(): Promise<ExecutionResult> {
        if (!this.project || !this.executionData) {
            throw new Error()
        }
        const result: ExecutionResult = await this.executor.execute(this.project, this.executionData)
        // create the result manager
        const executionResultManager: ExecutionResultManager = new ExecutionResultManager(this.project)
        // dispatch the received result from the execution
        await executionResultManager.dispatch(result)

        return result
    }



}