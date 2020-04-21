import { Component } from '@angular/core';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FormGroup, FormControl } from '@angular/forms';
import { FileInputData } from '../file-input.data';
import { Utils } from 'src/app/utils/utils';

@Component({
    templateUrl: './file-input-properties.component.html'
})
export class FileInputPropertiesComponent implements PropertiesDialogChild {

    formGroup: FormGroup | undefined
    
    fileInputData: FileInputData | undefined

    constructor() {
        this.initFormGroup()
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.fileInputData)) {
            return
        }

        this.fileInputData.name = Utils.getFormValue(this.formGroup, 'name', this.fileInputData.name)
    }

    async  cancel(): Promise<void> {
    }

    setFileInputData(fileInputData: FileInputData): void {
        this.fileInputData = fileInputData;

        this.formGroup.patchValue(fileInputData)
    }

}