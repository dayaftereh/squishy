import { Observable } from 'rxjs';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { ExecutionData } from './execution-data';
import { ExecutionResult } from './execution-result';
import { ExecutionStatus } from './execution-status';
import { Utils } from 'src/app/utils/utils';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { NodeExecutorFactory } from './node-executor/node-executor.factory';
import { NodeExecutor } from './node-executor/node-executor';
import { NodeData } from 'rete/types/core/data';

export class Execution {

    private _running: boolean
    private nodeExecutors: Map<string, NodeExecutor>

    constructor(private readonly _status: Observable<ExecutionStatus>) {
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

    async cancel(): Promise<void> {
        this._running = false
    }

    async load(project: SquishyProject, data: ExecutionData): Promise<void> {
        const factory: NodeExecutorFactory = new NodeExecutorFactory()
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
        const open: Set<string> = new Set<string>();
        const todo: Set<string> = new Set<string>();

        await this.loop(open, todo)

        return {} as ExecutionResult
    }

    private async loop(open: Set<string>, todo: Set<string>): Promise<void> {
        // get the next todo
        const next: string = Utils.headOfSet(todo)
        // get the next executor
        const nextExecutor: NodeExecutor = this.nodeExecutors.get(next)

        return this.next(open, todo)
    }

    private async next(open: Set<string>, todo: Set<string>): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (todo.size < 1) {
                    resolve()
                    return
                }
                this.loop(open, todo).then(resolve, reject)
            })
        })
    }

}