import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { ChartDatasetConfig } from '../chart-dataset.config';

@Component({
    templateUrl: './chart-dataset.component.html'
})
export class ChartDatasetComponent extends AbstractPropertiesDialogChildComponent {

    datasetConfig: ChartDatasetConfig | undefined

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
            fill: new FormControl(),
            color: new FormControl(),
            lines: new FormControl()
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.datasetConfig)) {
            return
        }

        this.datasetConfig.name = this.getFormValue('name', this.datasetConfig.name)
        this.datasetConfig.fill = this.getFormValue('fill', this.datasetConfig.fill)
        this.datasetConfig.color = this.getFormValue('color', this.datasetConfig.color)
        this.datasetConfig.lines = this.getFormValue('lines', this.datasetConfig.lines)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setDatasetConfig(datasetConfig: ChartDatasetConfig): void {
        this.datasetConfig = datasetConfig;

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(datasetConfig)
        }
    }

}