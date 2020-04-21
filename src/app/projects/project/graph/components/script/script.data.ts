import { SquishyNodeData } from '../squishy-node.data';

export interface ScriptData extends SquishyNodeData {
    script: string
    variables: { [key: string]: string }
}