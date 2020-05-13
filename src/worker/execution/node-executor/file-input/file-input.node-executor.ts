import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { FileInputExecutionData } from './file-input.execution-data';

export class FileInputNodeExecutor extends AbstractNodeExecutor<FileInputData, FileInputExecutionData> {

    constructor(nodeData: FileInputData, executionData: FileInputExecutionData, dependencies: string[]) {
        super(nodeData, executionData, dependencies)
    }

    protected async internalExecute(execution: Execution): Promise<void> {

    }

}