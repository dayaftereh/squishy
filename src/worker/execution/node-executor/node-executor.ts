import { Execution } from '../execution';

export interface NodeExecutor {
    id(): string
    hasOutput(): boolean
    isExecuted(): boolean
    getResult(): any | undefined
    execute(): Promise<void>
    isExecuteable(): Promise<boolean>
}