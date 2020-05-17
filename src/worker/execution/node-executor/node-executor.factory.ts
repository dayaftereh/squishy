import { InputData, InputsData, NodeData, InputConnectionData } from 'rete/types/core/data';
import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { FileOutputData } from 'src/app/projects/project/graph/components/file-output/file-output.data';
import { NodeComponentsType } from 'src/app/projects/project/graph/components/node-components.type';
import { ScriptData } from 'src/app/projects/project/graph/components/script/script.data';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { Utils } from 'src/app/utils/utils';
import { FileInputNodeExecutor } from './file-input/file-input.node-executor';
import { FileOutputNodeExecutor } from './file-output/file-output.node-executor';
import { NodeExecutor } from './node-executor';
import { ScriptNodeExecutor } from './script/script.node-executor';
import { Execution } from '../execution';

export class NodeExecutorFactory {

    private factoryFunction: Map<NodeComponentsType, (nodeData: NodeData, nodeExecutionData: any) => Promise<NodeExecutor>>

    constructor(private readonly execution: Execution) {
        this.init()
    }

    private init(): void {
        // create the map with the factory functions
        this.factoryFunction = new Map<NodeComponentsType, (nodeData: NodeData, nodeExecutionData: any) => Promise<NodeExecutor>>()
        // regster all factories function
        this.factoryFunction.set(NodeComponentsType.FileInput, this.createFileInput)
        this.factoryFunction.set(NodeComponentsType.Script, this.createScript)
        this.factoryFunction.set(NodeComponentsType.FileOutput, this.createFileOutput)
    }

    async create(nodeData: NodeData, nodeExecutionData: any): Promise<NodeExecutor> {
        // get the squishy node data
        const squishyNodeData: SquishyNodeData = nodeData.data as any as SquishyNodeData
        // get the type
        const type: NodeComponentsType = squishyNodeData.type
        // get the factory function
        const factory: ((nodeData: NodeData, nodeExecutionData: any) => Promise<NodeExecutor>) | undefined = this.factoryFunction.get(type)
        // check if a factory function found
        if (Utils.isNullOrUndefined(factory)) {
            throw new Error(`unable to find node executor factory for type [ ${type} ]`)
        }
        // create the executor
        const executor: NodeExecutor = await factory.call(this, nodeData, nodeExecutionData)

        return executor
    }

    private async createFileInput(nodeData: NodeData, nodeExecutionData: any): Promise<FileInputNodeExecutor> {
        // create the file input node executor
        const executor: FileInputNodeExecutor = new FileInputNodeExecutor(this.execution, nodeData, nodeExecutionData)
        return executor
    }

    private async createScript(nodeData: NodeData, nodeExecutionData: any): Promise<ScriptNodeExecutor> {
        // create the script node executor
        const executor: ScriptNodeExecutor = new ScriptNodeExecutor(this.execution, nodeData, nodeExecutionData)
        return executor
    }

    private async createFileOutput(nodeData: NodeData, nodeExecutionData: any): Promise<FileOutputNodeExecutor> {
        // create the file output node executor
        const executor: FileOutputNodeExecutor = new FileOutputNodeExecutor(this.execution, nodeData, nodeExecutionData)

        return executor
    }

}