import { LoadTask } from '../../../exectuion/task/load/load-task';
import { ExecutionObject } from '../../execution-object';
import { AbstractLoadTaskLoader } from './abstract-load-task-loader';

export class LoadTaskJsonLoader extends AbstractLoadTaskLoader {

    constructor(task: LoadTask, files: File[]) {
        super(task, files);
    }

    load(): ExecutionObject {
        let result: ExecutionObject = {};

        this.files.forEach((file: File) => {
            const obj: ExecutionObject = this.readAsJson(file);
            result = Object.assign(result, obj);
        });

        return result;
    }

    private readAsJson<T>(file: File): T {
        const content: string = this.readAsString(file);
        const obj: T = JSON.parse(content);
        return obj;
    }

}
