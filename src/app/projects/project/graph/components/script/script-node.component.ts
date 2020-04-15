import { Component, ChangeDetectorRef } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';

@Component({
    templateUrl: './script-node.component.html',
    styleUrls: [
        './script-node.component.scss'
    ]
})
export class ScriptNodeComponent extends NodeComponent {

    constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
        super(service, cdr);
    }
}