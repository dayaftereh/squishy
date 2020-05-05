import { Component, Input } from '@angular/core';
import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { Utils } from 'src/app/utils/utils';
import { ExecutorService } from '../../../executor-service/executor.service';

@Component({
    templateUrl: './file-input-executor.component.html',
    selector: 'app-file-input-executor',
    styleUrls: [
        './file-input-executor.component.scss'
    ]
})
export class FileInputExecutorComponent {

    @Input()
    fileInputData: FileInputData | undefined

    private files: File[] = []

    constructor(private readonly executorService: ExecutorService) {

    }

    private getFileInputId(): string | undefined {
        if (!this.fileInputData) {
            return undefined
        }
        return this.fileInputData.id
    }

    onSelect(event: any): void {
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.currentFiles)) {
            return
        }
        // get the files from event
        const files: File[] = event.currentFiles as File[]
        // get the file input id
        const id: string | undefined = this.getFileInputId()
        // check if a id was found
        if (!Utils.isNullOrUndefined(id)) {
            // update the data on the executor service
            this.executorService.setData(id, files)
        }
        // update this files
        this.files = files
    }

    onRemove(event: any): void {
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.file)) {
            return
        }
        // get the removed file from event
        const file: File = event.file as File
        // find the index of the removed file
        const index: number = this.files.indexOf(file)
        // file not found in files
        if (index < 0) {
            return
        }
        // remove the files
        this.files.splice(index, 1)

        // get the file input id
        const id: string | undefined = this.getFileInputId()
        // check if a id was found
        if (!Utils.isNullOrUndefined(id)) {
            // update the data on the executor service
            this.executorService.setData(id, this.files)
        }
    }
}