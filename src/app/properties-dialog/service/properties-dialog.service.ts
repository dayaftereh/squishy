import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertiesDialogServiceEvent } from './properties-dialog-service.event';

@Injectable()
export class PropertiesDialogService {

    private _open: EventEmitter<PropertiesDialogServiceEvent>

    constructor() {
        this._open = new EventEmitter<PropertiesDialogServiceEvent>(true)
    }

    open(event: PropertiesDialogServiceEvent): void {
        this._open.emit(event)
    }

    onOpen(fn: (event: PropertiesDialogServiceEvent) => void): Subscription {
        return this._open.subscribe(fn)
    }

}