import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { View3DPropertiesComponent } from './properties/view3d-properties.component';
import { View3DData } from './view3d.data';

@Component({
    templateUrl: './view3d-node.component.html',
    styleUrls: [
        './view3d-node.component.scss'
    ],
    providers: [
        NodeService
    ]
})
export class View3DNodeComponent extends NodeComponent implements OnInit {

    nodeData: View3DData | undefined

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
        this.nodeData = this.node.data as unknown as View3DData
    }

    async editProperties(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.view3d.properties.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: View3DPropertiesComponent,
            onInit: (component: View3DPropertiesComponent) => {
                component.setView3DData(this.nodeData)
            }
        })
    }

}