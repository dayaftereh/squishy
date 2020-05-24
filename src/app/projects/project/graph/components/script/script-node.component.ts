import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { ScriptPropertiesComponent } from './properties/script-properties.component';
import { ScriptEditorComponent } from './script-editor/script-editor.component';
import { ScriptData } from './script.data';

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
        private readonly translateService: TranslateService,
        private readonly propertiesDialogService: PropertiesDialogService) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        // set the node data
        this.nodeData = this.node.data as unknown as ScriptData
    }

    async editScript(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.script.editor.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: ScriptEditorComponent,
            onInit: (component: ScriptEditorComponent) => {
                component.setScriptData(this.nodeData)
            }
        })
    }

    async editProperties(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.script.properties.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: ScriptPropertiesComponent,
            onInit: (component: ScriptPropertiesComponent) => {
                component.setScriptData(this.nodeData)
            }
        })
    }
}