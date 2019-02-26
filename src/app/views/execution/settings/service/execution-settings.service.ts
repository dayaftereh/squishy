import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ExecutionSettingsService {

    readonly eventEmitter: EventEmitter<void>;

    constructor() {
        this.eventEmitter = new EventEmitter<void>();
    }
}