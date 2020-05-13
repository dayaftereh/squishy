import { ScriptData } from 'src/app/projects/project/graph/components/script/script.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { ScriptExecutionData } from './script.execution-data';

export class ScriptNodeExecutor extends AbstractNodeExecutor<ScriptData, ScriptExecutionData> {

    constructor(nodeData: ScriptData, executionData: ScriptExecutionData, dependencies: string[]) {
        super(nodeData, executionData, dependencies)
    }

    protected async internalExecute(execution: Execution): Promise<void> {

    }

}