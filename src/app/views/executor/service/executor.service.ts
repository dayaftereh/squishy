import { EventEmitter, Injectable } from '@angular/core';
import { TaskExecution } from '../../../services/execution/task-execution';

@Injectable()
export class ExecutorService {

    eventEmitter: EventEmitter<TaskExecution>;

    constructor() {
        this.eventEmitter = new EventEmitter<TaskExecution>();
    }

}