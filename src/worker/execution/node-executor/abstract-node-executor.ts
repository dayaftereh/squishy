import { InputConnectionData, InputData, InputsData, NodeData } from 'rete/types/core/data';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { Utils } from 'src/app/utils/utils';
import { Execution } from '../execution';
import { NodeExecutor } from './node-executor';

export abstract class AbstractNodeExecutor implements NodeExecutor {

    private executed: boolean

    protected result: any

    constructor(
        protected readonly execution: Execution,
        protected readonly nodeData: NodeData,
        protected readonly executionData: unknown,
    ) {
        this.executed = false
    }

    isExecuted(): boolean {
        return this.executed
    }

    getNodeData<T>(): T | undefined {
        const squishyNodeData: SquishyNodeData | undefined = this.squishyNodeData()
        if (Utils.isNullOrUndefined(squishyNodeData)) {
            return undefined
        }
        return squishyNodeData as any as T
    }

    getExecutionData<T>(): T | undefined {
        if (Utils.isNullOrUndefined(this.executionData)) {
            return undefined
        }
        return this.executionData as any as T
    }

    squishyNodeData(): SquishyNodeData | undefined {
        if (Utils.isNullOrUndefined(this.nodeData) || Utils.isNullOrUndefined(this.nodeData.data)) {
            return undefined
        }
        const squishyNodeData: SquishyNodeData = this.nodeData.data as any as SquishyNodeData
        return squishyNodeData
    }

    id(): string | undefined {
        const squishyNodeData: SquishyNodeData | undefined = this.squishyNodeData()
        if (Utils.isNullOrUndefined(squishyNodeData)) {
            return undefined
        }
        return squishyNodeData.id
    }

    async execute(): Promise<void> {
        // check if this node executor executeable
        const executeable: boolean = await this.isExecuteable()
        // check if executeable
        if (!executeable) {
            throw new Error(`unable to execute nod executor [ ${this.id()} ], because node executor not executable`)
        }

        try {
            await this.internalExecute()
        } finally {
            this.executed = true
        }
    }

    async isExecuteable(): Promise<boolean> {
        // get all dependent executors
        const dependentExecutors: NodeExecutor[] = await this.getDependentNodeExecutors()

        // check if all executors are executed
        return dependentExecutors.every((nodeExecutor: NodeExecutor) => {
            return nodeExecutor.isExecuted()
        })
    }

    async getInputConnections(): Promise<Set<string>> {
        // create a new set with all input connections
        const connections: Set<string> = new Set<string>()
        // check if node data given and node data has input
        if (Utils.isNullOrUndefined(this.nodeData) || Utils.isNullOrUndefined(this.nodeData.inputs)) {
            return connections
        }

        // get the node input
        const inputs: InputsData = this.nodeData.inputs

        Utils.forEachProperty(inputs, (inputData: InputData) => {
            // check if the input has a connection
            if (Utils.isNullOrUndefined(inputData.connections) || !inputData.connections) {
                return
            }
            // get each connection
            inputData.connections.forEach((inputConnectionData: InputConnectionData) => {
                // get the id of the connection
                const id: string = inputConnectionData.output
                connections.add(id)
            })
        })

        return connections
    }

    async getDependentNodeExecutors(): Promise<NodeExecutor[]> {
        // get all input connected node executor ids 
        const connections: Set<string> = await this.getInputConnections()
        // get the dependencies as list
        const dependencies: string[] = Array.from(connections.values())
        // get all dependent executors
        const dependentExecutors: NodeExecutor[] = await Promise.all(dependencies.map(async (id: string) => {
            // get the executor
            const nodeExecutor: NodeExecutor = await this.execution.getExecutor(id)
            // check if the executor exists
            if (Utils.isNullOrUndefined(nodeExecutor)) {
                throw new Error(`unable to find node executor for depnendency [ ${id} ]`)
            }
            return nodeExecutor
        }))

        return dependentExecutors
    }

    async getExecutorId(id: string): Promise<string | undefined> {
        if (Utils.isNullOrUndefined(this.nodeData) || Utils.isNullOrUndefined(this.nodeData.inputs)) {
            return undefined
        }
        // get the inputs for this node
        const inputs: InputsData = this.nodeData.inputs

        // check if
        if (Utils.isNullOrUndefined(inputs[id])) {
            return undefined
        }
        // get the input data
        const inputData: InputData = inputs[id]
        // check if the input has a connection
        if (!inputData.connections || inputData.connections.length < 1) {
            return undefined
        }
        // get the first connection
        const inputConnectionData: InputConnectionData = inputData.connections[0]

        return inputConnectionData.output
    }

    async getExecutor(id: string): Promise<NodeExecutor | undefined> {
        // get the executor id for the given variable
        const executorId: string | undefined = await this.getExecutorId(id)
        // get the node executor
        const nodeExecutor: NodeExecutor | undefined = await this.execution.getExecutor(executorId)

        return nodeExecutor
    }

    getResult(): any | undefined {
        return this.result
    }

    hasOutput(): boolean {
        return false
    }

    protected abstract internalExecute(): Promise<void>
}