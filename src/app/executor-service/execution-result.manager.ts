import { Subject } from 'rxjs';
import { ExecutionResult } from 'src/worker/execution/execution-result';
import { SquishyProject } from '../projects-service/squishy-project';
import { ChartData } from '../projects/project/graph/components/chart/chart.data';
import { FileOutputData } from '../projects/project/graph/components/file-output/file-output.data';
import { NodeComponentsType } from '../projects/project/graph/components/node-components.type';
import { SquishyNodeData } from '../projects/project/graph/components/squishy-node.data';
import { Downloader } from '../utils/downloader';
import { Utils } from '../utils/utils';
import { ExecutionResultEvent } from './execution-result.event';

export class ExecutionResultManager {

    constructor(private readonly project: SquishyProject, private readonly onChart: Subject<ExecutionResultEvent>) {

    }

    async dispatch(result: ExecutionResult): Promise<void> {
        // handle the file output result for download
        await this.handleFileOutputsFromResult(result)
        // handle the charts output result 
        await this.handleOutputsWithEvents(result, [
            NodeComponentsType.Chart
        ])
    }

    private async handleFileOutputsFromResult(result: ExecutionResult): Promise<void> {
        if (Utils.isNullOrUndefined(result.outputs)) {
            return
        }

        // get all output node data
        const outputNodeData: FileOutputData[] = Utils.getSquishyNodesData(this.project)
            .filter((nodeData: SquishyNodeData) => {
                return nodeData.type === NodeComponentsType.FileOutput
            })
            .map((nodeData: SquishyNodeData) => {
                return nodeData as FileOutputData
            })

        // get all downloadable file output data
        const donwloadable: FileOutputData[] = outputNodeData.filter((nodeData: FileOutputData) => {
            return !Utils.isNullOrUndefined(result.outputs[nodeData.id])
        })

        donwloadable.forEach((nodeData: FileOutputData) => {
            // get the blob download url
            const url: string = result.outputs[nodeData.id]
            // get the filename
            const filename: string = this.fileOutputFilename(nodeData)
            // download the content
            Downloader.download(url, filename)
            // release the blob content
            URL.revokeObjectURL(url)
        })
    }

    private fileOutputFilename(nodeData: FileOutputData): string {
        if (!Utils.isNullOrUndefined(nodeData.filename)) {
            return nodeData.filename
        }
        return nodeData.name
    }

    private async handleOutputsWithEvents(result: ExecutionResult, types: NodeComponentsType[]): Promise<void> {
        if (Utils.isNullOrUndefined(result.outputs)) {
            return
        }

        // get all nodes
        const nodes: SquishyNodeData[] = Utils.getSquishyNodesData(this.project)
            .filter((nodeData: SquishyNodeData) => {
                return this.isType(nodeData.type, types)
            })

        // check if the nodes has output
        const nodesWithOutput: SquishyNodeData[] = nodes.filter((nodeData: ChartData) => {
            return !Utils.isNullOrUndefined(result.outputs[nodeData.id])
        })

        // notify about result
        nodesWithOutput.forEach((node: SquishyNodeData) => {
            // get the result
            const nodeResult: any = result.outputs[node.id]
            // create the execution result event
            const event: ExecutionResultEvent = {
                id: node.id,
                type: node.type,
                result: nodeResult
            }
            // emit the chart
            this.onChart.next(event)
        })
    }

    private isType(type: NodeComponentsType, types: NodeComponentsType[]): boolean {
        return types.some((type2: NodeComponentsType) => {
            return type === type2
        })
    }

}