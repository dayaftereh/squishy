import { Tasks } from '../task/tasks';

export interface Tab {
    id: string
    name: string
    tasks: Tasks
}