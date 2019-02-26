import { Component } from '@angular/core';
import { ExecutionsRouteResolverService } from '../../services/executions/executions-route-resolver.service';
import { ExecutionSettingsService } from './settings/service/execution-settings.service';

@Component({
    templateUrl: './execution.component.html'
})
export class ExecutionComponent {

    constructor(
        private readonly executionSettingsService: ExecutionSettingsService,
        private readonly executionsRouteResolverService: ExecutionsRouteResolverService
    ) {

    }

    execute(): void {
    }

    removeExecution(): void {
        this.executionsRouteResolverService.remove();
    }

    exportExecution(): void {
        this.executionsRouteResolverService.export();
    }

    settings(): void {
        this.executionSettingsService.eventEmitter.emit();
    }

}