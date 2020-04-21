import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { ScriptData } from './script.data';
import { ScriptEditorComponent } from './script-editor/script-editor.component';
import { ScriptPropertiesComponent } from './properties/script-properties.component';

@Component({
    templateUrl: './script-node.component.html',
    styleUrls: [
        './script-node.component.scss'
    ],
    providers: [
        NodeService
    ]
})
export class ScriptNodeComponent extends NodeComponent implements OnInit {

    nodeData: ScriptData | undefined

    constructor(
        protected service: NodeService,
        protected cdr: ChangeDetectorRef,
        private readonly propertiesDialogService: PropertiesDialogService) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        // set the node data
        this.nodeData = this.node.data as unknown as ScriptData
    }

    async editScript(): Promise<void> {
        this.propertiesDialogService.open({
            title: 'Editor',
            component: ScriptEditorComponent,
            onInit: (component: ScriptEditorComponent) => {
                component.setScriptData(this.nodeData)
            }
        })
    }

    async editProperties(): Promise<void> {
        this.propertiesDialogService.open({
            title: 'Properties',
            component: ScriptPropertiesComponent,
            onInit: (component: ScriptPropertiesComponent) => {
                component.setScriptData(this.nodeData)
            }
        })
    }
}