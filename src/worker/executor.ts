import { asyncScheduler, Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
import { SquishyProject } from 'src/app/projects-service/squishy-project'
import { Execution } from './execution/execution'
import { ExecutionData } from './execution/execution-data'
import { ExecutionResult } from './execution/execution-result'
import { ExecutionState } from './execution/execution-state'
import { ExecutionStatus } from './execution/execution-status'

export class Executor {

    private _status: Subject<ExecutionStatus> | undefined

    private execution: Execution | undefined

    constructor() {
        this._status = new Subject<ExecutionStatus>()
    }

    async execute(project: SquishyProject, data: ExecutionData): Promise<ExecutionResult> {
        try {
            // fire the initializing state
            this._status.next({
                total: 0,
                executed: 0,
                progress: 0.0,
                state: ExecutionState.INITIALIZING
            })

            // create a new execution
            this.execution = new Execution(this._status)

            // load the project and the execution data
            await this.execution.load(project, data)

            // execute the execution
            const result: ExecutionResult = await this.execution.execute()

            return result
        } finally {
            this.execution = undefined
        }
    }

    async subscribe(callback: (status: ExecutionStatus) => Promise<void>): Promise<void> {
        // subscribe to the status
        this._status.subscribe(async (status: ExecutionStatus) => {
            // check if callback given
            if (callback) {
                await callback(status)
            }
        })
    }

}