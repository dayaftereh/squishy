import { Injectable } from '@angular/core';
import { Execution } from '../../../core/exectuion/execution';
import { ExportFileService } from '../export/export-file.service';

@Injectable()
export class ExecutionsExportService {

    constructor(private readonly exportFileService: ExportFileService) {
    }

    exportExecution(execution: Execution): void {
        this.exportExecutions([execution]);
    }

    exportExecutions(executions: Execution[]): void {
        const exportableExecutions: Execution[] = executions.map((execution: Execution) => {
            return this.cleanExecution(execution);
        });

        const names: string[] = executions.map((execution: Execution) => {
            return execution.name;
        });

        const filename: string = names.join('+');

        const data: string = JSON.stringify(exportableExecutions, null, 2);
        this.exportFileService.exportJsonString(data, filename);
    }

    private cleanExecution(execution: Execution): Execution {
        const clean: Execution = Object.assign({}, execution);
        return Object.assign(clean, {
            data: undefined
        });
    }

}