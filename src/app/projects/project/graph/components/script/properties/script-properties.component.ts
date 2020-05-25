import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FromUtils } from 'src/app/utils/form-utils';
import { Utils } from 'src/app/utils/utils';
import { ScriptData } from '../script.data';

@Component({
    templateUrl: './script-properties.component.html'
})
export class ScriptPropertiesComponent implements PropertiesDialogChild {

    formGroup: FormGroup | undefined
    scriptData: ScriptData | undefined

    constructor() {
        this.initFormGroup()
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.scriptData)) {
            return
        }

        this.scriptData.name = FromUtils.getFormValue(this.formGroup, 'name', this.scriptData.name)
    }

    async  cancel(): Promise<void> {
    }

    setScriptData(scriptData: ScriptData): void {
        this.scriptData = scriptData;

        this.formGroup.patchValue(scriptData)
    }

    resized(): void {

    }

}