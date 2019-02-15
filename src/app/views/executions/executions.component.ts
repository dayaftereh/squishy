import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Execution } from '../../../core/exectuion/execution';
import { ExecutionsService } from '../../services/executions/executions.service';

@Component({
    selector: 'app-executions',
    templateUrl: './executions.component.html'
})
export class ExecutionsComponent implements OnInit {

    items: Observable<MenuItem[]>;

    constructor(private readonly executionsService: ExecutionsService) {

    }

    ngOnInit(): void {
        this.items = this.executionsService.executions().pipe(
            map((executions: Execution[]) => {
                return executions.map((execution: Execution) => {
                    return {
                        label: execution.name,
                        routerLink: ['tasks', execution.id]
                    } as MenuItem;
                });
            })
        );
    }

    closeExecution(menuItem: MenuItem): void {
        if (!menuItem.id) {
            return;
        }
    }

    createExecution(): void {
        this.executionsService.createExecution();
    }

}