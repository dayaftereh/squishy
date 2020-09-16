import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { TextInputPropertiesComponent } from './properties/text-input-properties.component';
import { TextInputData } from './text-input.data';
import { TextInputEditorComponent } from './text-input-editor/text-input-editor.component';

@Component({
    templateUrl: './text-input-node.component.html',
    styleUrls: [
        './text-input-node.component.scss'
    ],
    providers: [
        NodeService
    ]
})
export class TextInputNodeComponent extends NodeComponent implements OnInit {

    textInputData: TextInputData | undefined

    constructor(
        protected service: NodeService,
        protected cdr: ChangeDetectorRef,
        private readonly translateService: TranslateService,
        private readonly propertiesDialogService: PropertiesDialogService
    ) {
        super(service, cdr)

    }

    ngOnInit(): void {
        super.ngOnInit()

        this.textInputData = this.node.data as unknown as TextInputData
    }

    async editContent(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.text-input.editor.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: TextInputEditorComponent,
            onInit: (component: TextInputEditorComponent) => {
                component.setTextInputData(this.textInputData)
            }
        })
    }

    async editProperties(): Promise<void> {
        const title: string = await this.translateService.get('projects.project.graph.components.text-input.properties.header').toPromise()

        this.propertiesDialogService.open({
            title,
            component: TextInputPropertiesComponent,
            onInit: (component: TextInputPropertiesComponent) => {
                component.setTextInputData(this.textInputData)
            }
        })

    }

}