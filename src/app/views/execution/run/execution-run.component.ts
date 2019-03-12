import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Execution } from '../../../../core/exectuion/execution';
import { ExecutionResult } from '../../../../core/exectuion/execution-result';
import { ExecutionsRouteResolverService } from '../../../services/executions/executions-route-resolver.service';
import { ExecutorService } from '../../../services/executor/executor.service';

@Component({
    templateUrl: `./execution-run.component.html`
})
export class ExecutionRunComponent implements OnInit {

    constructor(
        private readonly executorService: ExecutorService,
        private readonly executionsRouteResolverService: ExecutionsRouteResolverService) {

    }

    async ngOnInit(): Promise<void> {
        const execution: Execution | undefined = await this.executionsRouteResolverService.execution().pipe(first()).toPromise();
        if (!execution) {
            return;
        }

        await this.execute(execution);
    }

    private async execute(execution: Execution): Promise<void> {
        const result: ExecutionResult = await this.executorService.execute(execution);
        console.log(result);
    }

}
