import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import 'chartjs-plugin-zoom';
import { Subscription } from 'rxjs';
import { ExecutionResultEvent } from 'src/app/executor-service/execution-result.event';
import { ExecutorService } from 'src/app/executor-service/executor.service';
import { ChartData } from 'src/app/projects/project/graph/components/chart/chart.data';
import { Utils } from 'src/app/utils/utils';
import { ChartExecutionResult } from 'src/worker/execution/node-executor/chart/chart-execution.result';
import { clamp } from 'src/worker/execution/node-executor/script/math/math.module';

@Component({
    templateUrl: './chart-executor.component.html',
    selector: 'app-chart-executor',
    styleUrls: [
        './chart-executor.component.scss'
    ]
})
export class ChartExecutorComponent implements OnInit, OnDestroy {

    data: any | undefined

    options: any | undefined

    @Input()
    chartData: ChartData | undefined

    private subscription: Subscription | undefined

    constructor(private readonly executorService: ExecutorService) {

    }

    ngOnInit(): void {
        this.data = {}
        this.options = {}
        this.register()
    }

    private register(): void {
        // check if chart data given
        if (Utils.isNullOrUndefined(this.chartData)) {
            return
        }
        // get the id
        const id: string = this.chartData.id
        // wait for execution result event for chart data
        this.subscription = this.executorService.executionResult(id).subscribe((event: ExecutionResultEvent) => {
            this.onExecutionResultEvent(event)
        })
    }

    private onExecutionResultEvent(event: ExecutionResultEvent): void {
        if (!event || Utils.isNullOrUndefined(event.result)) {
            return
        }
        // get the result
        const result: ChartExecutionResult = event.result as ChartExecutionResult

        // set data
        this.data = result.data
        // get default options
        const defaultOptions: any = this.defaultOptions()
        // set options
        this.options = Object.assign({}, result.options, defaultOptions)
    }

    private defaultOptions(): any {
        let maximumFractionDigits: number = 3
        if (!Utils.isNullOrUndefined(this.chartData)) {
            maximumFractionDigits = this.chartData.tooltipFractionDigits
        }

        maximumFractionDigits = clamp(0.0, maximumFractionDigits, 20.0)

        const nf: Intl.NumberFormat = new Intl.NumberFormat(undefined, {
            maximumFractionDigits
        })

        return {
            responsive: true,
            tooltips: {
                callbacks: {
                    label: (item: any, data: any) => {
                        let x: number | undefined = item.xLabel
                        let y: number | undefined = item.yLabel
                        let xLabel: string = nf.format(x)
                        let yLabel: string = nf.format(y)
                        return `x: ${xLabel}, y: ${yLabel}`
                    }
                }
            }
        }
    }

    ngOnDestroy(): void {
        if (!this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}