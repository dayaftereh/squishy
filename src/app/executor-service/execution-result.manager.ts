import { SquishyProject } from '../projects-service/squishy-project';
import { ExecutionResult } from 'src/worker/execution/execution-result';
import { Utils } from '../utils/utils';
import { FileOutputData } from '../projects/project/graph/components/file-output/file-output.data';
import { SquishyNodeData } from '../projects/project/graph/components/squishy-node.data';
import { NodeComponentsType } from '../projects/project/graph/components/node-components.type';
import { Downloader } from '../utils/downloader';

export class ExecutionResultManager {

    constructor(private readonly project: SquishyProject) {

    }

    async dispatch(result: ExecutionResult): Promise<void> {
        // handle the file output result for download
        await this.handleFileOutputsFromResult(result)
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

}