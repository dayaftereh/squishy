import { ChangeDetectorRef, Component } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { FileInputData } from './file-input.data';

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

    constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.nodeData = this.node.data as unknown as FileInputData
    }

}