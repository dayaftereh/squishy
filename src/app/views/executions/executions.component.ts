import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Execution } from '../../../core/exectuion/execution';
import { ExecutionsImportService } from '../../services/executions/executions-import.service';
import { ExecutionsService } from '../../services/executions/executions.service';
import { ImportDialogService } from '../import-dialog/service/import-dialog.service';

@Component({
    selector: 'app-executions',
    templateUrl: './executions.component.html'
})
export class ExecutionsComponent implements OnInit {

    items: Observable<MenuItem[]>;

    constructor(private readonly executionsService: ExecutionsService,
                private readonly importDialogService: ImportDialogService,
                private readonly executionsImportService: ExecutionsImportService) {

    }

    ngOnInit(): void {
        this.items = this.executionsService.executions().pipe(
            map((executions: Execution[]) => {
                return executions.map((execution: Execution) => {
                    return {
                        label: execution.name,
                        routerLink: ['execution', execution.id]
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

    async importExecution(): Promise<void> {
        const files: File[] = await this.importDialogService.consume(true);
        await this.executionsImportService.importExecutions(files);
    }

}