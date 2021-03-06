import { NodeData } from 'rete/types/core/data';
import { ScriptData } from 'src/app/projects/project/graph/components/script/script.data';
import { Utils } from 'src/app/utils/utils';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { NodeExecutor } from '../node-executor';
import { Mathf } from './math/mathf';
import { Plugins } from './plugins/plugins';
import { ScriptExecutionData } from './script.execution-data';
import { ScriptVariable } from './script.variable';
import { Squishy } from './squishy/squishy';
import { SquishyObject } from './squishy/squishy-object';

export class ScriptNodeExecutor extends AbstractNodeExecutor {

    constructor(execution: Execution, nodeData: NodeData, executionData: ScriptExecutionData) {
        super(execution, nodeData, executionData)
    }

    protected async internalExecute(): Promise<void> {
        // create the function
        const fn: () => Promise<any> = await this.createFunction()

        try {
            // call the function
            this.result = await fn()
        } catch (e) {
            // append component to error
            e.component = this.nodeData.name

            // retrow the error
            throw e
        }

    }

    private async createSquishy(): Promise<Squishy> {
        const squishy: Squishy = new SquishyObject(this.execution)
        return squishy
    }

    private async createPlugins(): Promise<Plugins> {
        const plugins: Plugins = new Plugins()
        return plugins
    }

    private async createFunction(): Promise<() => Promise<any>> {
        // create the variables for the script function
        const variables: ScriptVariable[] = await this.variables()

        // create the static variables
        const staticVariables: ScriptVariable[] = await this.createStaticVariables()

        // add the static variables
        variables.push(...staticVariables)

        // get the name of the variable
        const variableNames: string[] = variables.map((variable: ScriptVariable) => {
            return variable.name
        })
        // get the script content
        const script: string = this.getNodeData<ScriptData>().script
        // create the script function
        const fn: Function = new Function(...variableNames, script)

        return async () => {
            // get the variable values
            const variableValues: any[] = variables.map((variable: ScriptVariable) => {
                return variable.value
            })
            // create a new execution context
            const context: any = {}

            // call the script function
            const result = await fn.call(context, ...variableValues)

            return result
        }

    }

    private async createStaticVariables(): Promise<ScriptVariable[]> {
        const squishy: Squishy = await this.createSquishy()
        const plugins: Plugins = await this.createPlugins()

        const variables: ScriptVariable[] = [
            {
                name: 'Squishy',
                value: squishy
            },
            {
                name: 'Mathf',
                value: Mathf
            },
            {
                name: 'Plugins',
                value: plugins
            }
        ]

        return variables
    }

    private async variables(): Promise<ScriptVariable[]> {
        // create the list with the variables
        const variables: ScriptVariable[] = await Promise.all(Utils.mapProperties(this.getNodeData<ScriptData>().variables, async (name: string, id: string) => {
            const variable: ScriptVariable = await this.createVariable(id, name)
            return variable
        }))

        return variables
    }

    private async createVariable(id: string, name: string): Promise<ScriptVariable> {
        // get the node node executor
        const nodeExecutor: NodeExecutor | undefined = await this.getExecutor(id)

        // check if node executor found
        if (Utils.isNullOrUndefined(nodeExecutor)) {
            throw new Error(`unable to find node executor [ ${nodeExecutor.id()} ] for id [ ${id} ] and variable [ ${name} ]`)
        }

        // check if the node executor already executed
        if (!nodeExecutor.isExecuted()) {
            throw new Error(`node executor [ ${nodeExecutor.id()} ] for variable [ ${name}, ${id} ] is not yet executed`)
        }
        // get the result from the node executor
        const result: any = nodeExecutor.getResult()

        // create the variable
        return {
            name,
            value: result
        }
    }

}