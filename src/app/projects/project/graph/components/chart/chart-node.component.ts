import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { Utils } from 'src/app/utils/utils';
import { ChartDatasetConfig } from './chart-dataset.config';
import { ChartData } from './chart.data';
import { ChartDatasetComponent } from './dataset/chart-dataset.component';
import { ChartPropertiesComponent } from './properties/chart-properties.component';

@Component({
    templateUrl: './chart-node.component.html',
    styleUrls: [
        './chart-node.component.scss'
    ],
    providers: [
        NodeService
    ]
})
export class ChartNodeComponent extends NodeComponent implements OnInit {

    nodeData: ChartData | undefined

    constructor(
        protected service: NodeService,
        protected cdr: ChangeDetectorRef,
        private readonly translateService: TranslateService,
        private readonly propertiesDialogService: PropertiesDialogService) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        // set the node data
        this.nodeData = this.node.data as unknown as ChartData
    }

    async editProperties(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.chart.properties.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: ChartPropertiesComponent,
            onInit: (component: ChartPropertiesComponent) => {
                component.setChartData(this.nodeData)
            }
        })
    }

    async editDataset(id: string): Promise<void> {
        if (!this.nodeData || !this.nodeData.datasets) {
            return
        }

        const datasetConfig: ChartDatasetConfig | undefined = this.nodeData.datasets[id]

        if (Utils.isNullOrUndefined(datasetConfig)) {
            return
        }

        const title: string = await this.translateService.get('projects.project.graph.components.chart.dataset.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: ChartDatasetComponent,
            onInit: (component: ChartDatasetComponent) => {
                component.setDatasetConfig(datasetConfig)
            }
        })
    }

}