import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { ErrorManagerEvent } from './error-manager.event';

@Injectable()
export class ErrorManagerService {

    private _error: EventEmitter<ErrorManagerEvent>

    constructor() {
        this._error = new EventEmitter<ErrorManagerEvent>(true)
    }

    error(error: Error): void {
        const event: ErrorManagerEvent = this.errorToEvent(error)
        this._error.emit(event)
    }

    clear(): void {

    }

    private errorToEvent(error: Error): ErrorManagerEvent {
        const event: ErrorManagerEvent = {} as ErrorManagerEvent

        event.sticky = true
        event.summary = error.name
        event.detail = error.message
        event.component = this.component(error)
        event.stacktrace = this.stacktrace(error)

        return event
    }

    private stacktrace(error: Error): string[] {
        if (Utils.isNullOrUndefined(error.stack)) {
            return []
        }

        const lines: string[] = error.stack.split(/[\n|\r\n]+/g)
        return lines
    }

    private component(error: any): string | undefined {
        if (Utils.isNullOrUndefined(error.component)) {
            return undefined
        }

        return error.component
    }

    onErrorEvent(fn: (event: ErrorManagerEvent) => void): Subscription {
        return this._error.subscribe(fn)
    }

}