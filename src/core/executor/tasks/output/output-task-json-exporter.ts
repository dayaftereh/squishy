import { OutputTask } from '../../../exectuion/task/output/output-task';
import { ExecutionObject } from '../../execution-object';
import { OutputTaskExporter } from './output-task-exporter';

export class OutputTaskJSONExporter implements OutputTaskExporter {

    constructor(private readonly task: OutputTask) {
    }

    export(result: ExecutionObject): Blob {
        const content: string = JSON.stringify(result, undefined, 2);
        const blob: Blob = new Blob([content], { type: `application/json` });
        return blob;
    }

}
