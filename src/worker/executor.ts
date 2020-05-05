import { Subject } from 'rxjs'
import { ExecutionResult } from './execution-result'
import { ExecutionStatus } from './execution-status'

export class Executor {

    private _status: Subject<ExecutionStatus> | undefined

    constructor() {
        this._status = new Subject<ExecutionStatus>()
    }

    async cancel(): Promise<void> {

    }

    async execute(): Promise<ExecutionResult> {
        console.log("Hello")
        return {
            time: 42.0
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