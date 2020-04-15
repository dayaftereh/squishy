import { Component, ChangeDetectorRef } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';

@Component({
    templateUrl: './file-output-node.component.html',
    styleUrls: [
        './file-output-node.component.scss'
    ]
})
export class FileOutputNodeComponent extends NodeComponent {

    constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
        super(service, cdr);
    }
}