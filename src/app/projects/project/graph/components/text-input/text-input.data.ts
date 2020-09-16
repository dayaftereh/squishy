import { SquishyNodeData } from '../squishy-node.data';
import { TextInputType } from './text-input.type';

export interface TextInputData extends SquishyNodeData {
    content: string | undefined
    inputType: TextInputType
}