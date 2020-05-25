import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { Utils } from 'src/app/utils/utils';
import { FileOutputData } from '../file-output.data';
import { FromUtils } from 'src/app/utils/form-utils';

@Component({
    templateUrl: './file-output-properties.component.html'
})
export class FileOutputPropertiesComponent implements PropertiesDialogChild {

    formGroup: FormGroup | undefined

    fileOutputData: FileOutputData | undefined

    constructor() {
        this.initFormGroup()
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl(),
            filename: new FormControl(),
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.fileOutputData)) {
            return
        }

        this.fileOutputData.name = FromUtils.getFormValue(this.formGroup, 'name', this.fileOutputData.name)
        this.fileOutputData.filename = FromUtils.getFormValue(this.formGroup, 'filename', this.fileOutputData.filename)
    }

    async  cancel(): Promise<void> {
    }

    setFileOutputData(fileOutputData: FileOutputData): void {
        this.fileOutputData = fileOutputData;

        this.formGroup.patchValue(fileOutputData)
    }

    resized(): void {

    }

}