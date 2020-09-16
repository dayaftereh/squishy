import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { TextInputData } from '../text-input.data';
import { TextInputType, TextInputTypes } from '../text-input.type';

@Component({
    templateUrl: './text-input-properties.component.html'
})
export class TextInputPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    textInputData: TextInputData | undefined

    inputTypes: SelectItem[] | undefined

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            inputType: new FormControl()
        })
    }

    ngOnInit(): void {
        super.ngOnInit()

        this.inputTypes = TextInputTypes.map((inputType: TextInputType) => {
            return {
                value: inputType,
                label: `${inputType}`
            }
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.textInputData)) {
            return
        }

        this.textInputData.name = this.getFormValue('name', this.textInputData.name)
        this.textInputData.inputType = this.getFormValue('inputType', this.textInputData.inputType)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setTextInputData(textInputData: TextInputData): void {
        this.textInputData = textInputData

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(textInputData)
        }
    }

}