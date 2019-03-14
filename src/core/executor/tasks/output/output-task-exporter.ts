import { ExecutionObject } from '../../execution-object';

export interface OutputTaskExporter {

    export(result: ExecutionObject): Blob

}
