import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { ChartZoomPanAxes, ChartZoomPanAxis } from '../chart-zoom-pan-axis';
import { ChartData } from '../chart.data';

@Component({
    templateUrl: './chart-properties.component.html'
})
export class ChartPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    chartData: ChartData | undefined

    zoomPanOptions: SelectItem[]

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
        this.zoomPanOptions = []
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            pan: new FormControl(),
            zoom: new FormControl(),
            name: new FormControl(),
            animation: new FormControl(),
            tooltipFractionDigits: new FormControl(),
        })
    }

    ngOnInit(): void {
        super.ngOnInit()

        // add the zoom pan options
        ChartZoomPanAxes.map((value: ChartZoomPanAxis) => {
            return {
                value,
                label: `${value}`
            } as SelectItem
        }).forEach((item: SelectItem) => {
            this.zoomPanOptions.push(item)
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.chartData)) {
            return
        }

        this.chartData.pan = this.getFormValue('pan', this.chartData.pan)
        this.chartData.zoom = this.getFormValue('zoom', this.chartData.zoom)
        this.chartData.name = this.getFormValue('name', this.chartData.name)
        this.chartData.animation = this.getFormValue('animation', this.chartData.animation)
        this.chartData.tooltipFractionDigits = this.getFormValue('tooltipFractionDigits', this.chartData.tooltipFractionDigits)

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