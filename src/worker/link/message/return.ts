import { LinkType } from '../link-type';

export interface Return {
    id: number
    error?: Error
    result?: any
    type: LinkType
}