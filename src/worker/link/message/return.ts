import { LinkType } from '../link-type';

export interface LinkError {
    stack: string
    name: string,
    message: string,
}

export interface Return {
    id: number
    error?: LinkError
    result?: any
    type: LinkType
}