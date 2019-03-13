import { LoadTask } from '../../../exectuion/task/load/load-task';
import { ExecutionDataLine } from '../../execution-data-line';
import { ExecutionObject } from '../../execution-object';
import { AbstractLoadTaskLoader } from './abstract-load-task-loader';

export class LoadTaskPlainLoader extends AbstractLoadTaskLoader {

    constructor(task: LoadTask, files: File[]) {
        super(task, files);
    }

    load(): ExecutionObject {
        const result: ExecutionObject = {};
        const key: string = this.getInputKey();
        result[key] = this.readFiles();
        return result;
    }

    private readFiles(): ExecutionDataLine {
        const dataLine: ExecutionDataLine = {};
        this.files.forEach((file: File) => {
            dataLine[file.name] = this.readAsString(file);
        });
        return dataLine;
    }

    private getInputKey(): string {
        if (!this.task || !this.task.plainKey) {
            return 'input';
        }

        return this.task.plainKey;
    }

}
