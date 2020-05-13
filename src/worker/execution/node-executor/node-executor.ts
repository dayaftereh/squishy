import { Execution } from '../execution';

export interface NodeExecutor {
    executed: boolean
    dependencies: string[]
    execute(execution: Execution): Promise<void>
    getDependentNodeExecutors(execution: Execution): Promise<NodeExecutor[]>
}