import { Component } from '@angular/core';
import { ExecutionsRouteResolverService } from '../../services/executions/executions-route-resolver.service';

@Component({
    templateUrl: './execution.component.html'
})
export class ExecutionComponent {

    constructor(private readonly executionsRouteResolverService: ExecutionsRouteResolverService) {

    }

    removeExecution(): void {
        this.executionsRouteResolverService.remove();
    }

    exportExecution(): void {
        this.executionsRouteResolverService.export();
    }

}