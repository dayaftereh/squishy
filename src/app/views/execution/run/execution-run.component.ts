import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Execution } from '../../../../core/exectuion/execution';
import { ExecutionsRouteResolverService } from '../../../services/executions/executions-route-resolver.service';
import { ExecutionRunService } from './service/execution-run.service';

@Component({
    templateUrl: `./execution-run.component.html`
})
export class ExecutionRunComponent implements OnInit {

    running: Observable<boolean>;

    constructor(
        private readonly executionRunService: ExecutionRunService,
        private readonly executionsRouteResolverService: ExecutionsRouteResolverService) {
    }

    async ngOnInit(): Promise<void> {
        this.running = this.executionRunService.running;
        await this.restart();
    }

    private execute(execution: Execution): void {
        this.executionRunService.execute(execution);
    }

    cancel(): void {
        this.executionRunService.cancel();
    }

    async restart(): Promise<void> {
        const execution: Execution | undefined = await this.executionsRouteResolverService.execution().pipe(first()).toPromise();
        if (!execution) {
            return;
        }
        this.execute(execution);
    }

}
