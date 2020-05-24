import { NodeData } from 'rete/types/core/data';
import { Subject } from 'rxjs';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { Utils } from 'src/app/utils/utils';
import { ExecutionContext } from './execution-context';
import { ExecutionData } from './execution-data';
import { ExecutionOutputs } from './execution-outputs';
import { ExecutionResult } from './execution-result';
import { ExecutionState } from './execution-state';
import { ExecutionStatus } from './execution-status';
import { NodeExecutor } from './node-executor/node-executor';
import { NodeExecutorFactory } from './node-executor/node-executor.factory';

export class Execution {

    private _progress: number
    private _executed: number
    private _running: boolean
    private _context: ExecutionContext
    private nodeExecutors: Map<string, NodeExecutor>

    constructor(private readonly _status: Subject<ExecutionStatus>) {
        this._context = {}
        this._executed = 0
        this._progress = 0
        this._running = false
        this.nodeExecutors = new Map<string, NodeExecutor>()
    }

    get running(): boolean {
        return this._running
    }

    async getExecutor(id: string): Promise<NodeExecutor | undefined> {
        if (!this.nodeExecutors.has(id)) {
            return undefined
        }

        const nodeExecutor: NodeExecutor = this.nodeExecutors.get(id)
        return nodeExecutor
    }

    context(): ExecutionContext {
        return this._context
    }

    progress(value: number): void {
        // get the max size
        const part: number = 1.0 / this.nodeExecutors.size
        // caclulate the total progress
        this._progress = (part * this._executed) + (part * value)

        // update the current status
        this.status(ExecutionState.RUNNING)
    }

    async cancel(): Promise<void> {
        this._running = false
    }

    async load(project: SquishyProject, data: ExecutionData): Promise<void> {
        // create a new node exector factory
        const factory: NodeExecutorFactory = new NodeExecutorFactory(this)
        // create all node executors
        await Promise.all(Utils.getNodesData(project).map(async (nodeData: NodeData) => {
            // check if the node has data
            if (Utils.isNullOrUndefined(nodeData) || Utils.isNullOrUndefined(nodeData.data)) {
                return
            }
            // get the squishy node data
            const squishyNodeData: SquishyNodeData = nodeData.data as any as SquishyNodeData
            // get the node id
            const id: string = squishyNodeData.id
            // get the node data
            const nodeExecutionData: any | undefined = data[id]
            // create the node executor
            const nodeExecutor: NodeExecutor = await factory.create(nodeData, nodeExecutionData)
            // set the node executors
            this.nodeExecutors.set(id, nodeExecutor)
        }))
    }

    async execute(): Promise<ExecutionResult> {
        const time: number = Date.now()
        // start with zero progress
        this.progress(0.0)
        // runnable node executor list
        const runnable: string[] = []
        // progress all node executors
        await this.run(runnable)

        // get the node execution outputs
        const outputs: ExecutionOutputs = await this.getOutputs()
        // notify about execution done
        this.status(ExecutionState.DONE)

        // calculate time taken
        const delta: number = Date.now() - time

        return {
            outputs,
            time: delta
        } as ExecutionResult
    }

    private async run(runnable: string[]): Promise<void> {
        // check if runnable node executor available
        if (runnable.length > 0) {
            await this.executorRunnable(runnable)
            return
        }

        // find next runnable node executors
        await this.inspectRunnableNodes(runnable)
    }

    private async executorRunnable(runnable: string[]): Promise<void> {
        // get the next runnable node id
        const id: string = runnable.shift()

        // get the node executor for the runnable id
        const nodeExecutor: NodeExecutor = this.nodeExecutors.get(id)
        // execute the executor
        await nodeExecutor.execute()

        // increment executed
        this._executed++
        // update the current progress
        this.progress(0.0)

        // next tick
        return this.tick(runnable)
    }

    private async inspectRunnableNodes(runnable: string[]): Promise<void> {
        // list with all not yet executed executors
        const executors: NodeExecutor[] = []
        // find the not yet finished node executors
        this.nodeExecutors.forEach((nodeExecutor: NodeExecutor) => {
            if (!nodeExecutor.isExecuted()) {
                executors.push(nodeExecutor)
            }
        })

        // check which executor is executable
        await Promise.all(executors.map(async (nodeExecutor: NodeExecutor) => {
            // check if the node executor is executable
            const executable: boolean = await nodeExecutor.isExecuteable()
            if (executable) {
                // add the executor to the runnable executors
                const id: string = nodeExecutor.id()
                runnable.push(id)
            }
        }))

        // check if still runnable executors found
        if (runnable.length > 0) {
            return this.tick(runnable)
        }
    }

    private async tick(runnable: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.run(runnable).then(resolve, reject)
            })
        })
    }

    private async getOutputs(): Promise<ExecutionOutputs> {
        // notifay about output collecting
        this.status(ExecutionState.COLLECTING)
        // create the executions outputs
        const outputs: ExecutionOutputs = {}
        // check each node executor
        this.nodeExecutors.forEach((nodeExecutor: NodeExecutor) => {
            // check if the executor has an output
            if (!nodeExecutor.hasOutput()) {
                return
            }
            // get the id of the executor
            const id: string = nodeExecutor.id()
            // get the result of the node executor
            outputs[id] = nodeExecutor.getResult()
        })

        return outputs
    }

    private status(state: ExecutionState): void {
        // get the total of executions
        const total: number = this.nodeExecutors.size
        // calculate the progress in %
        const progress: number = this._progress * 100.0
        // fire the status
        this._status.next({
            total,
            state,
            progress,
            executed: this._executed,
        })
    }

}