import { ChangeDetectorRef, Component } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';

@Component({
    templateUrl: './file-input-node.component.html',
    styleUrls: [
        "./file-input-node.component.scss"
    ]
})
export class FileInputNodeComponent extends NodeComponent {

    constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
        super(service, cdr);
    }

}