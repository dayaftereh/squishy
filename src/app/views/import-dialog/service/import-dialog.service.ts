import { EventEmitter, Injectable } from '@angular/core';
import { ImportDialogEvent } from './import-dialog-event';

@Injectable()
export class ImportDialogService {

    readonly eventEmitter: EventEmitter<ImportDialogEvent>;

    constructor() {
        this.eventEmitter = new EventEmitter<ImportDialogEvent>();
    }

    consume(multiple?: boolean): Promise<File[]> {
        return new Promise(resolve => {
            this.eventEmitter.emit({
                multiple: !!(multiple),
                command: (files: File[]) => {
                    resolve(files);
                }
            });
        });
    }

}
