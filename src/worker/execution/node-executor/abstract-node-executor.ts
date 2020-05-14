import { NodeExecutor } from './node-executor';
import { ExecutionData } from '../execution-data';
import { Execution } from '../execution';
import { Utils } from 'src/app/utils/utils';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { SquishyProject } from 'src/app/projects-service/squishy-project';

export abstract class AbstractNodeExecutor<T, R> implements NodeExecutor {

    private _executed: boolean

    constructor(
        private readonly _nodeData: T,
        private readonly _executionData: R,
        private readonly _dependencies: string[],
    ) {
        this._executed = false
    }

    get nodeId(): string {
        const nodeData: SquishyNodeData = this.nodeData as any as SquishyNodeData
        return nodeData.id
    }

    get nodeData(): T {
        return this._nodeData as T
    }

    get executionData(): R {
        return this._executionData as R
    }

    get dependencies(): string[] {
        return this._dependencies
    }

    get executed(): boolean {
        return this._executed
    }

    protected id(): string | undefined {
        if (Utils.isNullOrUndefined(this._nodeData)) {
            return undefined
        }
        const squishyNodeData: SquishyNodeData = this._nodeData as any as SquishyNodeData
        return squishyNodeData.id
    }

    async execute(execution: Execution): Promise<void> {
        // check if this node executor executeable
        const executeable: boolean = await this.isExecuteable(execution)
        // check if executeable
        if (!executeable) {
            throw new Error(`unable to execute nod executor [ ${this.id()} ], because node executor not executable`)
        }

        try {
            await this.internalExecute(execution)
        } finally {
            this._executed = true
        }
    }

    async isExecuteable(execution: Execution): Promise<boolean> {
        // get all dependent executors
        const dependentExecutors: NodeExecutor[] = await this.getDependentNodeExecutors(execution)

        // check if all executors are executed
        return dependentExecutors.every((nodeExecutor: NodeExecutor) => {
            return nodeExecutor.executed
        })
    }

    async getDependentNodeExecutors(execution: Execution): Promise<NodeExecutor[]> {
        // get all dependent executors
        const dependentExecutors: NodeExecutor[] = await Promise.all(this._dependencies.map(async (id: string) => {
            // get the executor
            const nodeExecutor: NodeExecutor = await execution.getExecutor(id)
            // check if the executor exists
            if (Utils.isNullOrUndefined(nodeExecutor)) {
                throw new Error(`unable to find node executor for depnendency [ ${id} ]`)
            }
            return nodeExecutor
        }))
        return dependentExecutors
    }

    abstract result(): any

    abstract isOutput(): boolean

    protected abstract internalExecute(execution: Execution): Promise<void>
}