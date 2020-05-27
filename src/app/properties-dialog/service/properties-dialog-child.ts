import { EventEmitter } from '@angular/core';

export interface PropertiesDialogChild {
    submit(): Promise<void>
    cancel(): Promise<void>
    resized(width: number, height: number): void
    inject(submit: EventEmitter<void>, cancel: EventEmitter<void>): void
}