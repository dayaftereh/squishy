import { ExecutionObject } from '../../execution-object';

export interface LoadTaskLoader {
    load(): ExecutionObject
}