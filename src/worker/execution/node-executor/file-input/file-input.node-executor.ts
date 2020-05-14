import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { FileInputExecutionData } from './file-input.execution-data';
import { Utils } from 'src/app/utils/utils';
import { Encoding } from 'src/app/utils/encodings';
import { FileInputMode } from 'src/app/projects/project/graph/components/file-input/file-input.mode';

export class FileInputNodeExecutor extends AbstractNodeExecutor<FileInputData, FileInputExecutionData> {

    private _result: any

    constructor(nodeData: FileInputData, executionData: FileInputExecutionData, dependencies: string[]) {
        super(nodeData, executionData, dependencies)
    }

    protected async internalExecute(execution: Execution): Promise<void> {
        // check if execution data given
        if (Utils.isNullOrUndefined(this.executionData)) {
            return
        }

        // read all files and get the content
        const result: any[] = await Promise.all(this.executionData.map(async (file: File) => {
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

        // verify result
        if (!result) {
            this._result = undefined
        } else if (result.length < 2) {
            this._result = result[0]
        } else {
            this._result = result
        }
    }

    private async read(file: File): Promise<string | ArrayBuffer> {
        // check if the input mode is text
        if (this.nodeData.mode === FileInputMode.Text) {
            const content: string = await Utils.readFileAsText(file, this.endocing)
            return content
        }

        // read the file as array buffer
        const buffer: ArrayBuffer = await Utils.readFileAsArrayBuffer(file)
        return buffer

    }

    get endocing(): string {
        if (!this.nodeData.encoding) {
            return Encoding.UTF_8
        }
        return this.nodeData.encoding
    }

    get extendedOutput(): boolean {
        if (!this.nodeData.extendedOutput) {
            return false
        }

        return this.nodeData.extendedOutput
    }

    isOutput(): boolean {
        return false
    }

    result(): any {
        return this._result
    }

}