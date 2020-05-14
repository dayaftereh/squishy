import { ScriptData } from 'src/app/projects/project/graph/components/script/script.data';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { ScriptExecutionData } from './script.execution-data';
import { ScriptExecutionContext } from './script-execution.context';
import { ScriptVariable } from './script.variable';
import { Utils } from 'src/app/utils/utils';
import { NodeExecutor } from '../node-executor';
import { ExecutionContext } from '../../execution-context';
import { InputsData, InputData, InputConnectionData } from 'rete/types/core/data';

export class ScriptNodeExecutor extends AbstractNodeExecutor<ScriptData, ScriptExecutionData> {

    private _result: any

    constructor(nodeData: ScriptData, executionData: ScriptExecutionData, dependencies: string[], private readonly inputs: InputsData) {
        super(nodeData, executionData, dependencies)
    }

    protected async internalExecute(execution: Execution): Promise<void> {
        // create the function
        const fn: () => Promise<any> = await this.createFunction(execution)
        // call the function
        this._result = await fn()
    }

    private async createContext(execution: Execution): Promise<ScriptExecutionContext> {
        // get the execution context
        const executionContext: ExecutionContext = await execution.context()
        const context: ScriptExecutionContext = new ScriptExecutionContext(execution, executionContext)
        return context
    }

    private async createFunction(execution: Execution): Promise<() => Promise<any>> {
        // create the variables for the script function
        const variables: ScriptVariable[] = await this.variables(execution)

        // create the context for the execution
        const context: ScriptExecutionContext = await this.createContext(execution)

        // get the name of the variable
        const variableNames: string[] = variables.map((variable: ScriptVariable) => {
            return variable.name
        })
        // get the script content
        const script: string = this.nodeData.script
        // create the script function
        const fn: Function = new Function(...variableNames, script)

        return async () => {
            // get the variable values
            const variableValues: any[] = variables.map((variable: ScriptVariable) => {
                return variable.value
            })

            // call the script function
            const result = await fn.call(context, ...variableValues)

            return result
        }

    }

    private async variables(execution: Execution): Promise<ScriptVariable[]> {
        // create the list with the variables
        const variables: ScriptVariable[] = await Promise.all(Utils.mapProperties(this.nodeData.variables, async (name: string, id: string) => {
            const variable: ScriptVariable = await this.createVariable(execution, id, name)
            return variable
        }))

        return variables
    }

    private async createVariable(execution: Execution, id: string, name: string): Promise<ScriptVariable> {
        const executorId: string = await this.getExecutorId(id)
        // get the node executor for the given variable id
        const nodeExecutor: NodeExecutor | undefined = await execution.getExecutor(executorId)
        // check if node executor found
        if (Utils.isNullOrUndefined(nodeExecutor)) {
            throw new Error(`unable to find node executor for variable [ ${name}, ${id}, ${executorId} ]`)
        }
        // check if the node executor already executed
        if (!nodeExecutor.executed) {
            throw new Error(`node executor for variable [ ${name}, ${executorId} ] is not yet executed`)
        }
        // get the result from the node executor
        const result: any = nodeExecutor.result()

        return {
            name,
            value: result
        }
    }

    private async getExecutorId(id: string): Promise<string> {
        if (Utils.isNullOrUndefined(this.inputs[id])) {
            throw new Error(`unable to find connected node for id [ ${id} ]`)
        }
        // get the input data
        const inputData: InputData = this.inputs[id]

        // check if the input has a connection
        if (!inputData.connections || inputData.connections.length < 1) {
            throw new Error(`no connected on node input [ ${id} ]`)
        }
        // get the first connection
        const inputConnectionData: InputConnectionData = inputData.connections[0]

        return inputConnectionData.output
    }

    result(): any {
        return this._result
    }

    isOutput(): boolean {
        return false
    }

}