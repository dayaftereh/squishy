import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FormGroup, FormControl } from '@angular/forms';
import { FileInputData } from '../file-input.data';
import { Utils } from 'src/app/utils/utils';
import { SelectItem } from 'primeng/api/selectitem';
import { Encodings, Encoding } from 'src/app/utils/encodings';
import { FileInputMode, FileInputModes } from '../file-input.mode';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './file-input-properties.component.html'
})
export class FileInputPropertiesComponent implements PropertiesDialogChild, OnInit, OnDestroy {

    formGroup: FormGroup | undefined

    encodings: SelectItem[] | undefined

    modes: SelectItem[] | undefined

    fileInputData: FileInputData | undefined

    acceptSuggestions: string[] | undefined

    private subscription: Subscription | undefined

    constructor() {
        this.initFormGroup()
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl(),
            mode: new FormControl(),
            encoding: new FormControl(),
            accept: new FormControl(),
        })
    }

    ngOnInit(): void {
        this.encodings = Encodings.map((encoding: Encoding) => {
            return {
                label: `${encoding}`,
                value: encoding
            }
        })

        this.modes = FileInputModes.map((mode: FileInputMode) => {
            return {
                label: `${mode}`,
                value: mode
            }
        })

        this.subscription = this.formGroup.valueChanges.subscribe(() => {
            this.onFormChanged()
        })

        this.acceptSuggestions = [
            "*",
            "image/*",
            "image/png",
            "image/jpeg",
            "text/plain",
            "text/javascript",
            "application/json",
        ]
    }

    filterSuggestions(): void {
        this.acceptSuggestions = [
            ...this.acceptSuggestions
        ]
    }

    private onFormChanged(): void {
        const mode: FileInputMode = Utils.getFormValue(this.formGroup, 'mode', FileInputMode.Text)
        console.log(mode)
        Utils.setFromDisabled(this.formGroup, 'encoding', mode !== FileInputMode.Text, false)
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.fileInputData)) {
            return
        }

        this.fileInputData.name = Utils.getFormValue(this.formGroup, 'name', this.fileInputData.name)
        this.fileInputData.mode = Utils.getFormValue(this.formGroup, 'mode', this.fileInputData.mode)
        this.fileInputData.accept = Utils.getFormValue(this.formGroup, 'accept', this.fileInputData.accept)
        this.fileInputData.encoding = Utils.getFormValue(this.formGroup, 'encoding', this.fileInputData.encoding)
    }

    async cancel(): Promise<void> {
    }

    setFileInputData(fileInputData: FileInputData): void {
        this.fileInputData = fileInputData;

        this.formGroup.patchValue(fileInputData)
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}