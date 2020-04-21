import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { Utils } from 'src/app/utils/utils';
import { FileOutputData } from '../file-output.data';

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
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.fileOutputData)) {
            return
        }

        this.fileOutputData.name = Utils.getFormValue(this.formGroup, 'name', this.fileOutputData.name)
    }

    async  cancel(): Promise<void> {
    }

    setFileOutputData(fileOutputData: FileOutputData): void {
        this.fileOutputData = fileOutputData;

        this.formGroup.patchValue(fileOutputData)
    }

}