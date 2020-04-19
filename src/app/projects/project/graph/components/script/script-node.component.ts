import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NodeComponent, NodeService, SocketType } from 'rete-angular-render-plugin';
import { Input, IO } from 'rete';
import { ScriptData } from './script.data';
import { ScriptEditorService } from 'src/app/script-editor/service/script-editor.service';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { ScriptEditorComponent } from 'src/app/script-editor/script-editor.component';

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
        private readonly scriptExitorService: ScriptEditorService,
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
        this.propertiesDialogService.open({
            title: 'Editor',
            component: ScriptEditorComponent,
            onInit: <ScriptEditorComponent>(component: ScriptEditorComponent) => {
                console.log(component)
            }
        })
    }
}