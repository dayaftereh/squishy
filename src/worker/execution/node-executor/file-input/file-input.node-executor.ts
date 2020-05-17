import { NodeData } from 'rete/types/core/data';
import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { FileInputMode } from 'src/app/projects/project/graph/components/file-input/file-input.mode';
import { Encoding } from 'src/app/utils/encodings';
import { Utils } from 'src/app/utils/utils';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { FileInputExecutionData } from './file-input.execution-data';

export class FileInputNodeExecutor extends AbstractNodeExecutor {

    constructor(execution: Execution, nodeData: NodeData, executionData: FileInputExecutionData) {
        super(execution, nodeData, executionData)
    }

    get fileInputExecutionData(): FileInputExecutionData {
        return this.executionData as FileInputExecutionData
    }

    protected async internalExecute(): Promise<void> {
        this.result = undefined
        // check if execution data given
        if (Utils.isNullOrUndefined(this.fileInputExecutionData) || !this.fileInputExecutionData) {
            return
        }

        // read all files and get the content
        const result: any[] = await Promise.all(this.fileInputExecutionData.map(async (file: File) => {
            // read the file content
            const content: string | ArrayBuffer = await this.read(file)
            // if not extended output
            if (!this.extendedOutput) {
                return content
            }

            return {
                file,
                data: content
            }
        }))

        // check if a reasult was found
        if (Utils.isNullOrUndefined(result) || !result) {
            this.result = result
            return
        }

        // set the found file as result
        if (result.length < 2) {
            this.result = result[0]
        }
    }

    private async read(file: File): Promise<string | ArrayBuffer> {
        // check if the input mode is text
        if (this.getNodeData<FileInputData>().mode === FileInputMode.Text) {
            const content: string = await Utils.readFileAsText(file, this.endocing)
            return content
        }

        // read the file as array buffer
        const buffer: ArrayBuffer = await Utils.readFileAsArrayBuffer(file)
        return buffer

    }

    get endocing(): string {
        if (!this.getNodeData<FileInputData>().encoding) {
            return Encoding.UTF_8
        }
        return this.getNodeData<FileInputData>().encoding
    }

    get extendedOutput(): boolean {
        if (!this.getNodeData<FileInputData>().extendedOutput) {
            return false
        }

        return this.getNodeData<FileInputData>().extendedOutput
    }

}