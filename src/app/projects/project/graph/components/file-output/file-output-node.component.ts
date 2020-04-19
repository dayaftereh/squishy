import { Component, ChangeDetectorRef } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { FileOutputData } from './file-output.data';

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

    constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
        super(service, cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.nodeData = this.node.data as unknown as FileOutputData
    }
}