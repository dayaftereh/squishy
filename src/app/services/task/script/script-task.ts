import { Task } from '../task';

export interface ScriptTask extends Task {
    script: string
}