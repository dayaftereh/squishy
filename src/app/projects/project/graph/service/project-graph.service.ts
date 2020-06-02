import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

export class ProjectGraphService {

    private _changed: EventEmitter<void>

    constructor() {
        this._changed = new EventEmitter<void>(true)
    }

    emitDataChanged(): void {
        this._changed.emit()
    }

    onDataChanged(fn: () => void): Subscription {
        return this._changed.subscribe(fn)
    }

}