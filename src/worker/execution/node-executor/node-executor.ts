import { Execution } from '../execution';

export interface NodeExecutor {
    nodeId: string
    executed: boolean
    dependencies: string[]
    isOutput(): boolean
    result(): any
    execute(execution: Execution): Promise<void>
    isExecuteable(execution: Execution): Promise<boolean>
    getDependentNodeExecutors(execution: Execution): Promise<NodeExecutor[]>
}