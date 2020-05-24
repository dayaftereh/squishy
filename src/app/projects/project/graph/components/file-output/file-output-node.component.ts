import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { FileOutputData } from './file-output.data';
import { FileOutputPropertiesComponent } from './properties/file-output-properties.component';

@Component({
    templateUrl: './file-output-node.component.html',
    styleUrls: [
        './file-output-node.component.scss'
    ],
    providers: [
        NodeService
    ]
})
export class FileOutputNodeComponent extends NodeComponent {

    nodeData: FileOutputData | undefined

    constructor(
        protected service: NodeService,
        protected cdr: ChangeDetectorRef,
        private readonly translateService: TranslateService,
        private readonly propertiesDialogService: PropertiesDialogService) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.nodeData = this.node.data as unknown as FileOutputData
    }

    async edit(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.file-output.properties.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: FileOutputPropertiesComponent,
            onInit: (component: FileOutputPropertiesComponent) => {
                component.setFileOutputData(this.nodeData)
            }
        })
    }

}