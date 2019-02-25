import { Injectable } from '@angular/core';
import { Execution } from '../../../core/exectuion/execution';
import { ExecutionsService } from './executions.service';

@Injectable()
export class ExecutionsImportService {

    constructor(private readonly executionsService: ExecutionsService) {
    }

    async importExecutions(files: File[]): Promise<void> {
        const executionsArray: Execution[][] = await Promise.all(files.map((file: File) => {
            return this.readExecutions(file);
        }));

        const executions: Execution[] = executionsArray.reduce((a1: Execution[], a2: Execution[]) => {
            a1.push(...a2);
            return a1;
        }, []);

        this.executionsService.add(executions);
    }

    private async readExecutions(file: File): Promise<Execution[]> {
        const data: string = await this.readFile(file);
        const executions: Execution[] = JSON.parse(data);
        return executions.map((execution: Execution) => {
            if (!execution.data) {
                execution.data = {};
            }
            return execution;
        });
    }

    private readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileReader: FileReader = new FileReader();
            fileReader.onerror = (error: ProgressEvent) => {
                reject(error);
            };
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.readAsText(file);
        });

    }

}