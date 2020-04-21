import { ChangeDetectorRef, Component } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { FileInputData } from './file-input.data';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { FileInputPropertiesComponent } from './properties/file-input-properties.component';

@Component({
    templateUrl: './file-input-node.component.html',
    styleUrls: [
        "./file-input-node.component.scss"
    ],
    providers: [
        NodeService
    ]
})
export class FileInputNodeComponent extends NodeComponent {

    nodeData: FileInputData | undefined

    constructor(
        protected service: NodeService,
        protected cdr: ChangeDetectorRef,
        private readonly propertiesDialogService: PropertiesDialogService) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.nodeData = this.node.data as unknown as FileInputData
    }

    async edit(): Promise<void> {
        this.propertiesDialogService.open({
            title: 'Properties',
            component: FileInputPropertiesComponent,
            onInit: (component: FileInputPropertiesComponent) => {
                component.setFileInputData(this.nodeData)
            }
        })
    }

}