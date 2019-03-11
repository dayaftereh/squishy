import { LinkType } from '../link-type';

export interface Call {
    id: number
    args: any[]
    type: LinkType
    operation: string
}