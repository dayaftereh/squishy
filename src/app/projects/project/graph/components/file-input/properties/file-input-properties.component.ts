import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Encoding, Encodings } from 'src/app/utils/encodings';
import { FormUtils } from 'src/app/utils/form-utils';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { FileInputData } from '../file-input.data';
import { FileInputMode, FileInputModes } from '../file-input.mode';

@Component({
    templateUrl: './file-input-properties.component.html'
})
export class FileInputPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    encodings: SelectItem[] | undefined

    modes: SelectItem[] | undefined

    fileInputData: FileInputData | undefined

    acceptSuggestions: string[] | undefined

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
    }

    protected createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            mode: new FormControl(),
            encoding: new FormControl(),
            accept: new FormControl(),
            multiple: new FormControl(),
            extendedOutput: new FormControl(),
        })
    }

    ngOnInit(): void {
        super.ngOnInit()

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

        const formGroupSubscription: Subscription = this.formGroup.valueChanges.subscribe(() => {
            this.onFormChanged()
        })

        this.subscriptions.push(formGroupSubscription)

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
        const mode: FileInputMode = this.getFormValue('mode', FileInputMode.Text)
        FormUtils.setFromDisabled(this.formGroup, 'encoding', mode !== FileInputMode.Text, false)
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.fileInputData)) {
            return
        }

        this.fileInputData.name = this.getFormValue('name', this.fileInputData.name)
        this.fileInputData.mode = this.getFormValue('mode', this.fileInputData.mode)
        this.fileInputData.accept = this.getFormValue('accept', this.fileInputData.accept)
        this.fileInputData.encoding = this.getFormValue('encoding', this.fileInputData.encoding)
        this.fileInputData.multiple = this.getFormValue('multiple', this.fileInputData.multiple)
        this.fileInputData.extendedOutput = this.getFormValue('extendedOutput', this.fileInputData.extendedOutput)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setFileInputData(fileInputData: FileInputData): void {
        this.fileInputData = fileInputData;

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(fileInputData)
        }
    }

}