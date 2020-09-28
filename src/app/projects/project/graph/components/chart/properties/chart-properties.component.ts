import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { ChartData } from '../chart.data';

@Component({
    templateUrl: './chart-properties.component.html'
})
export class ChartPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    chartData: ChartData | undefined

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
            animation: new FormControl(),
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.chartData)) {
            return
        }

        this.chartData.name = this.getFormValue('name', this.chartData.name)
        this.chartData.animation = this.getFormValue('animation', this.chartData.animation)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setChartData(chartData: ChartData): void {
        this.chartData = chartData;

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(chartData)
        }
    }

}