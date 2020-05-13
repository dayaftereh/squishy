import { FileOutputData } from 'src/app/projects/project/graph/components/file-output/file-output.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { FileOutputExecutionData } from './file-output.execution-data';

export class FileOutputNodeExecutor extends AbstractNodeExecutor<FileOutputData, FileOutputExecutionData> {

    constructor(nodeData: FileOutputData, executionData: FileOutputExecutionData, dependencies: string[]) {
        super(nodeData, executionData, dependencies)
    }

    protected async internalExecute(execution: Execution): Promise<void> {

    }

}