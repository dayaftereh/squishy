import { NodeData } from 'rete/types/core/data';
import { FileOutputData } from 'src/app/projects/project/graph/components/file-output/file-output.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { NodeExecutor } from '../node-executor';
import { FileOutputExecutionData } from './file-output.execution-data';

export class FileOutputNodeExecutor extends AbstractNodeExecutor {

    constructor(execution: Execution, nodeData: NodeData, executionData: FileOutputExecutionData) {
        super(execution, nodeData, executionData)
    }

    protected async internalExecute(): Promise<void> {
        // get all dependent node executors
        const dependencies: NodeExecutor[] = await this.getDependentNodeExecutors()
        // check if same dependencies exists
        if (!dependencies || dependencies.length < 1) {
            throw new Error(`unable to execute file output executor [ ${this.id()} ], because no dependent node executor found`)
        }

        // get the node executor
        const nodeExecutor: NodeExecutor = dependencies[0]

        // check if the node executor is executed
        if (!nodeExecutor.isExecuted()) {
            throw new Error(`dependet node executor [ ${nodeExecutor.id()} ] for node [ ${this.id()} ] are not executed`)
        }

        // get the content from the depended node executor
        const content: any = nodeExecutor.getResult()

        // create the blob
        const blob: Blob = new Blob([content], {
            type: this.getNodeData<FileOutputData>().contentType,
            endings: this.getNodeData<FileOutputData>().endings
        })

        // create the Blob URL
        const url: string = URL.createObjectURL(blob)
        // set the url as result
        this.result = url
    }

    hasOutput(): boolean {
        return true
    }

}