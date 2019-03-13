import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Execution } from '../../../../../core/exectuion/execution';
import { ExecutionResult } from '../../../../../core/exectuion/execution-result';
import { ExecutorService } from '../../../../services/executor/executor.service';
import { ExportFileService } from '../../../../services/export/export-file.service';

@Injectable()
export class ExecutionRunService {

    running: BehaviorSubject<boolean>;

    constructor(private readonly executorService: ExecutorService,
                private readonly exportFileService: ExportFileService) {
        this.running = new BehaviorSubject<boolean>(false);
    }

    execute(execution: Execution): void {
        this.execute0(execution).catch((error: Error) => {
            //TODO handle error
            console.error(error);
        });
    }

    cancel(): void {

    }

    private async execute0(execution: Execution): Promise<void> {
        if (this.isRunning()) {
            return;
        }

        this.running.next(true);
        try {
            const result: ExecutionResult = await this.executorService.execute(execution);
            this.handleExecutionResult(execution, result);
        } finally {
            this.running.next(false);
        }
    }

    private handleExecutionResult(execution: Execution, result: ExecutionResult): void {
        if (!result || !result.blob) {
            return;
        }
        const filename: string = execution.output.filename;
        this.exportFileService.export(result.blob, filename);
    }

    private isRunning(): boolean {
        const running: boolean = this.running.getValue();
        return running;
    }

}
