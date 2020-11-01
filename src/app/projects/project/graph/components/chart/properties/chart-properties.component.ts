import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { ChartAxisScaling, ChartAxisScalings } from '../chart-axis-scaling';
import { ChartScalingType, ChartScalingTypes } from '../chart-scaling-type';
import { ChartZoomPanAxes, ChartZoomPanAxis } from '../chart-zoom-pan-axis';
import { ChartData } from '../chart.data';

@Component({
    templateUrl: './chart-properties.component.html'
})
export class ChartPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    chartData: ChartData | undefined

    zoomPanOptions: SelectItem[]

    axisScalingOptions: SelectItem[]

    scalingTypeOptions: SelectItem[]

    private subscription: Subscription | undefined

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
        this.zoomPanOptions = []
        this.axisScalingOptions = []
        this.scalingTypeOptions = []
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            pan: new FormControl(),
            zoom: new FormControl(),
            name: new FormControl(),
            animation: new FormControl(),
            lineTension: new FormControl(),
            tooltipFractionDigits: new FormControl(),
            axisScaling: new FormControl(),
            axisScalingXAxisMin: new FormControl(),
            axisScalingXAxisMax: new FormControl(),
            axisScalingYAxisMin: new FormControl(),
            axisScalingYAxisMax: new FormControl(),
            xScalingType: new FormControl(),
            yScalingType: new FormControl(),
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

        // add axis scaling options
        ChartAxisScalings.map((value: ChartAxisScaling) => {
            return {
                value,
                label: `${value}`
            } as SelectItem
        }).forEach((item: SelectItem) => {
            this.axisScalingOptions.push(item)
        })

        // add scaling types options
        ChartScalingTypes.map((value: ChartScalingType) => {
            return {
                value,
                label: `${value}`
            } as SelectItem
        }).forEach((item: SelectItem) => {
            this.scalingTypeOptions.push(item)
        })

        this.subscription = this.formGroup.valueChanges.subscribe(() => {
            this.onFormChanged()
        })
    }

    private onFormChanged(): void {
        const axisScaling: ChartAxisScaling = this.getFormValue('axisScaling', ChartAxisScaling.Auto)
        const disabled: boolean = axisScaling === ChartAxisScaling.Auto || axisScaling === ChartAxisScaling.AspectRatio

        this.setFromDisabled('axisScalingXAxisMin', disabled)
        this.setFromDisabled('axisScalingXAxisMax', disabled)
        this.setFromDisabled('axisScalingYAxisMin', disabled)
        this.setFromDisabled('axisScalingYAxisMax', disabled)
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.chartData)) {
            return
        }

        this.chartData.pan = this.getFormValue('pan', this.chartData.pan)
        this.chartData.zoom = this.getFormValue('zoom', this.chartData.zoom)
        this.chartData.name = this.getFormValue('name', this.chartData.name)
        this.chartData.animation = this.getFormValue('animation', this.chartData.animation)
        this.chartData.lineTension = this.getFormValue('lineTension', this.chartData.lineTension)
        this.chartData.tooltipFractionDigits = this.getFormValue('tooltipFractionDigits', this.chartData.tooltipFractionDigits)

        this.chartData.axisScaling = this.getFormValue('axisScaling', this.chartData.axisScaling)
        this.chartData.axisScalingXAxisMin = this.getFormValue('axisScalingXAxisMin', this.chartData.axisScalingXAxisMin)
        this.chartData.axisScalingXAxisMax = this.getFormValue('axisScalingXAxisMax', this.chartData.axisScalingXAxisMax)
        this.chartData.axisScalingYAxisMin = this.getFormValue('axisScalingYAxisMin', this.chartData.axisScalingYAxisMin)
        this.chartData.axisScalingYAxisMax = this.getFormValue('axisScalingYAxisMax', this.chartData.axisScalingYAxisMax)

        this.chartData.xScalingType = this.getFormValue('xScalingType', this.chartData.xScalingType)
        this.chartData.yScalingType = this.getFormValue('yScalingType', this.chartData.yScalingType)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setChartData(chartData: ChartData): void {
        this.chartData = chartData;

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(chartData)
        }

        this.onFormChanged()
    }

    ngOnDestroy(): void {
        super.ngOnDestroy()

        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}