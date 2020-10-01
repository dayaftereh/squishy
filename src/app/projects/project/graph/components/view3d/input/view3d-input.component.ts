import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { View3DInputType, View3DInputTypes } from '../view3d-input.type';
import { View3DInput } from '../view3d.input';

@Component({
    templateUrl: './view3d-input.component.html'
})
export class View3DInputComponent extends AbstractPropertiesDialogChildComponent {

    view3DInput: View3DInput | undefined

    typeOptions: SelectItem[]

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
        this.typeOptions = []
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            type: new FormControl(),
            size: new FormControl(),
            color: new FormControl(),
        })
    }

    ngOnInit(): void {
        super.ngOnInit()

        this.typeOptions.push(...View3DInputTypes.map((type: View3DInputType) => {
            return {
                value: type,
                label: `${type}`
            } as SelectItem
        }))

        const subscription: Subscription = this.formGroup.valueChanges.subscribe(() => {
            this.onFormChanged()
        })

        this.subscriptions.push(subscription)
    }

    private onFormChanged(): void {
        const size: boolean = this.isSomeType([
            View3DInputType.AxesHelper
        ])

        this.setFromDisabled('size', !size)

        const color: boolean = this.isSomeType([
            View3DInputType.Lines,
            View3DInputType.Points
        ])

        this.setFromDisabled('color', !color)
    }

    private isSomeType(types: View3DInputType[]): boolean {
        if (!types) {
            return false
        }

        const type: View3DInputType = this.getFormValue('type', View3DInputType.None)
        return types.some((other: View3DInputType) => {
            return type === other
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.view3DInput)) {
            return
        }

        this.view3DInput.type = this.getFormValue('type', this.view3DInput.type)
        this.view3DInput.size = this.getFormValue('size', this.view3DInput.size)
        this.view3DInput.color = this.getFormValue('color', this.view3DInput.color)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setView3DInput(view3DInput: View3DInput): void {
        this.view3DInput = view3DInput

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(view3DInput)
        }
    }

}