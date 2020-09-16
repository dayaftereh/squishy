import { NodeData } from 'rete/types/core/data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { TextInputExecutionData } from './text-input.execution-data';
import { TextInputType } from 'src/app/projects/project/graph/components/text-input/text-input.type';
import { TextInputData } from 'src/app/projects/project/graph/components/text-input/text-input.data';
import { Utils } from 'src/app/utils/utils';
import { ReturnStatement } from '@angular/compiler';

export class TextInputNodeExecutor extends AbstractNodeExecutor {

    constructor(execution: Execution, nodeData: NodeData, executionData: TextInputExecutionData) {
        super(execution, nodeData, executionData)
    }

    protected async internalExecute(): Promise<void> {
        this.result = undefined
        const inputType: TextInputType = this.getInputType()

        if (inputType === TextInputType.PlainText) {
            await this.executeAsPlainText()
        } else if (inputType === TextInputType.Json) {
            await this.executeAsJson()
        }
    }

    private async executeAsPlainText(): Promise<void> {
        if (Utils.isNullOrUndefined(this.executionData)) {
            return
        }

        const content: string = `${this.executionData}`
        this.result = content
    }

    private async executeAsJson(): Promise<void> {
        if (Utils.isNullOrUndefined(this.executionData)) {
            return
        }

        const content: string = `${this.executionData}`
        this.result = JSON.parse(content)
    }

    getInputType(): TextInputType {
        const textInputData: TextInputData | undefined = this.getNodeData<TextInputData>();
        if (!textInputData || !textInputData.inputType) {
            return TextInputType.PlainText
        }

        return textInputData.inputType
    }

}