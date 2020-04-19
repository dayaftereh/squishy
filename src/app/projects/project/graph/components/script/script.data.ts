import { SquishyNodeData } from '../squishy-node.data';

export interface ScriptData extends SquishyNodeData {
    variables: { [key: string]: string }
}