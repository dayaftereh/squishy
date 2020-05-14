import { FileOutputData } from 'src/app/projects/project/graph/components/file-output/file-output.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { FileOutputExecutionData } from './file-output.execution-data';
import { NodeExecutor } from '../node-executor';
import { UrlObject } from 'url';

export class FileOutputNodeExecutor extends AbstractNodeExecutor<FileOutputData, FileOutputExecutionData> {

    private _result: any

    constructor(nodeData: FileOutputData, executionData: FileOutputExecutionData, dependencies: string[]) {
        super(nodeData, executionData, dependencies)
    }

    protected async internalExecute(execution: Execution): Promise<void> {
        // get all dependent node executors
        const dependencies: NodeExecutor[] = await this.getDependentNodeExecutors(execution)
        // check if same dependencies exists
        if (!dependencies || dependencies.length < 1) {
            return
        }

        // get the node executor
        const nodeExecutor: NodeExecutor = dependencies[0]
        // check if the node executor is executed
        if (!nodeExecutor.executed) {
            throw new Error(`dependet node executor [ ${nodeExecutor.nodeId} ] for node [ ${this.nodeId} ] are not executed`)
        }
        // get the content from the depended node executor
        const content: any = nodeExecutor.result()

        // create the blob
        const blob: Blob = new Blob([content], {
            type: this.nodeData.contentType,
            endings: this.nodeData.endings
        })

        // create the Blob URL
        const url: string = URL.createObjectURL(blob)
        // set the url as result
        this._result = url
    }

    isOutput(): boolean {
        return true
    }

    result(): any {
        return this._result
    }

}