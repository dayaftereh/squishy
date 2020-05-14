import { SquishyNodeData } from '../squishy-node.data';

export interface FileOutputData extends SquishyNodeData {
    filename: string
    contentType: string | undefined
    endings: EndingType | undefined
}