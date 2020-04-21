import { Component } from '@angular/core';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ScriptData } from '../script.data';
import { Utils } from 'src/app/utils/utils';

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
        
        this.scriptData.name = Utils.getFormValue(this.formGroup, 'name', this.scriptData.name)
    }

    async  cancel(): Promise<void> {
    }

    setScriptData(scriptData: ScriptData): void {
        this.scriptData = scriptData;

        this.formGroup.patchValue(scriptData)
    }

}