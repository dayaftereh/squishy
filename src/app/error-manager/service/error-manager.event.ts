import { Message } from 'primeng/api';

export interface ErrorManagerEvent extends Message {
    component: string
    stacktrace: string[]
}