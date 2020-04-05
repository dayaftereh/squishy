import { ChangeDetectorRef, Component } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';

@Component({
    templateUrl: './input-graph-node.component.html',
    styleUrls: [
        "./input-graph-node.component.scss"
    ]
})
export class InputGraphNodeComponent extends NodeComponent {

    constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {
        super(service, cdr);
    }

}