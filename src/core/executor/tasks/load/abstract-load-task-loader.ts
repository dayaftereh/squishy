import { LoadTask } from '../../../exectuion/task/load/load-task';
import { ExecutionObject } from '../../execution-object';
import { LoadTaskLoader } from './load-task-loader';

export abstract class AbstractLoadTaskLoader implements LoadTaskLoader {

    protected constructor(protected readonly task: LoadTask, protected readonly files: File[]) {
    }

    abstract load(): ExecutionObject

    protected readAsString(file: File): string {
        const fileReader: FileReaderSync = new FileReaderSync();
        const content: string = fileReader.readAsText(file);
        return content;
    }

}