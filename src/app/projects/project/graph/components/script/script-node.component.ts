import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
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
        private readonly propertiesDialogService: PropertiesDialogService) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        // set the node data
        this.nodeData = this.node.data as unknown as ScriptData
    }

    edit(): void {
        // this.scriptExitorService.open("//Foo")
        /*this.propertiesDialogService.open({
            title: 'Editor',
            component: ScriptEditorComponent,
            onInit: <ScriptEditorComponent>(component: ScriptEditorComponent) => {
                console.log(component)
            }
        })*/
    }
}