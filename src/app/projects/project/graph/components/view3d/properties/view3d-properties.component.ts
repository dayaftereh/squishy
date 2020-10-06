import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { View3DControl, View3DControls } from '../view3d.control';
import { View3DData } from '../view3d.data';

@Component({
    templateUrl: './view3d-properties.component.html'
})
export class View3DPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    view3dData: View3DData | undefined

    controlOptions: SelectItem[]

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
        this.controlOptions = []
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            viewOrigin: new FormControl(),
            originSize: new FormControl(),
            control: new FormControl(),
            grid: new FormControl(),
            gridSize: new FormControl(),
            gridDivisions: new FormControl(),
            fov: new FormControl(),
            near: new FormControl(),
            far: new FormControl(),
            antiAlias: new FormControl(),
        })
    }

    ngOnInit(): void {
        super.ngOnInit()

        this.controlOptions.push(...View3DControls.map((option: View3DControl) => {
            return {
                value: option,
                label: `${option}`
            } as SelectItem
        }))

        const subscription: Subscription = this.formGroup.valueChanges.subscribe(() => {
            this.onFormChanged()
        })

        this.subscriptions.push(subscription)
    }

    private onFormChanged(): void {
        // disable or enable grid options
        const grid: boolean = this.getFormValue('grid', false)
        this.setFromDisabled('gridSize', !grid)
        this.setFromDisabled('gridDivisions', !grid)

        const viewOrigin: boolean = this.getFormValue('viewOrigin', false)
        this.setFromDisabled('originSize', !viewOrigin)
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.view3dData)) {
            return
        }

        this.view3dData.name = this.getFormValue('name', this.view3dData.name)

        this.view3dData.fov = this.getFormValue('fov', this.view3dData.fov)
        this.view3dData.near = this.getFormValue('near', this.view3dData.near)
        this.view3dData.far = this.getFormValue('far', this.view3dData.far)
        this.view3dData.antiAlias = this.getFormValue('antiAlias', this.view3dData.antiAlias)

        this.view3dData.grid = this.getFormValue('grid', this.view3dData.grid)
        this.view3dData.gridSize = this.getFormValue('gridSize', this.view3dData.gridSize)
        this.view3dData.gridDivisions = this.getFormValue('gridDivisions', this.view3dData.gridDivisions)

        this.view3dData.control = this.getFormValue('control', this.view3dData.control)

        this.view3dData.viewOrigin = this.getFormValue('viewOrigin', this.view3dData.viewOrigin)
        this.view3dData.originSize = this.getFormValue('originSize', this.view3dData.originSize)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setView3DData(view3dData: View3DData): void {
        this.view3dData = view3dData

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(view3dData)
        }
    }

}