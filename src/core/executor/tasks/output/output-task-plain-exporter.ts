import { OutputTask } from '../../../exectuion/task/output/output-task';
import { ExecutionObject } from '../../execution-object';
import { OutputTaskExporter } from './output-task-exporter';

export class OutputTaskPlainExporter implements OutputTaskExporter {

    constructor(private readonly task: OutputTask) {
    }

    export(result: ExecutionObject): Blob {
        const key: string = this.getOutputKey();
        const content: string = result[key] as string;
        const blob: Blob = new Blob([content], { type: `text/plain` });
        return blob;
    }

    private getOutputKey(): string {
        if (!this.task || !this.task.outputKey) {
            return 'output';
        }

        return this.task.outputKey;
    }

}