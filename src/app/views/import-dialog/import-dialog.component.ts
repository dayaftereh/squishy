import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { ImportDialogEvent } from './service/import-dialog-event';
import { ImportDialogService } from './service/import-dialog.service';

@Component({
    selector: 'app-import-dialog',
    templateUrl: './import-dialog.component.html',
    styleUrls: [
        './import-dialog.component.scss'
    ]
})
export class ImportDialogComponent implements OnInit, OnDestroy {

    visible: boolean;
    multiple: boolean;

    @ViewChild('fileUpload')
    fileUpload: FileUpload;

    private subscription: Subscription;

    private command: ((files: File[]) => void) | undefined;

    constructor(private readonly importDialogService: ImportDialogService) {
        this.visible = false;
        this.command = undefined;
    }

    ngOnInit(): void {
        this.subscription = this.importDialogService.eventEmitter.subscribe((event: ImportDialogEvent) => {
            this.open(event);
        });
    }

    onClose(): void {
        this.visible = false;
        if (this.command) {
            this.command([]);
        }
        this.command = undefined;
    }

    uploadHandler(event: any): void {
        // check if files selected
        if (!event || !event.files) {
            this.onClose();
            return;
        }
        // get the files
        const files: File[] = event.files;
        // get the files
        if (files.length < 1) {
            this.onClose();
            return;
        }

        // call the command
        if (this.command) {
            this.command(files);
        }
        // close the import dialog
        this.visible = false;
        this.command = undefined;
    }

    private open(event: ImportDialogEvent): void {
        this.fileUpload.clear();

        this.visible = true;
        this.command = event.command;
        this.multiple = event.multiple;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}