import { NodeComponentsType } from '../projects/project/graph/components/node-components.type';

export interface ExecutionResultEvent {
    id: string
    result: any
    type: NodeComponentsType
}