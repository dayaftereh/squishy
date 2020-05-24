import { ExecutionState } from './execution-state';

export interface ExecutionStatus {
    total: number
    executed: number
    progress: number
    state: ExecutionState
}