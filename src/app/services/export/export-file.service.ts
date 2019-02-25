import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable()
export class ExportFileService {

    constructor() {
    }

    export(blob: Blob, filename: string): void {
        saveAs(blob, decodeURI(filename));
    }

    exportJsonString(data: string, name: string): void {
        const blob: Blob = new Blob([data], { type: 'application/json' });
        const filename: string = this.appendJsonEnding(name);
        this.export(blob, filename);
    }

    exportPlainText(data: string, name: string): void {
        const blob: Blob = new Blob([data], { type: 'plain/text' });
        const filename: string = this.appendTXTEnding(name);
        this.export(blob, filename);
    }

    private appendTXTEnding(name: string): string {
        return `${name}.txt`;
    }

    private appendJsonEnding(name: string): string {
        return `${name}.json`;
    }

}
