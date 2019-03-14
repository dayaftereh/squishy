import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { ExecutionData } from '../../../core/exectuion/data/execution-data';
import { Execution } from '../../../core/exectuion/execution';
import { OutputTask } from '../../../core/exectuion/task/output/output-task';
import { OutputTaskFields } from '../../../core/exectuion/task/output/output-task-fields';
import { OutputTaskFormat } from '../../../core/exectuion/task/output/output-task-format';
import { TaskType } from '../../../core/exectuion/task/task-type';
import { Tasks } from '../../../core/exectuion/task/tasks';
import { ExecutionsExportService } from './executions-export.service';

@Injectable()
export class ExecutionsService {

    private _executions: BehaviorSubject<Map<string, Execution>>;

    constructor(private readonly executionsExportService: ExecutionsExportService) {
        this._executions = new BehaviorSubject<Map<string, Execution>>(new Map<string, Execution>());
    }

    executions(): Observable<Execution[]> {
        const executions: Observable<Execution[]> = this._executions.pipe(
            map((map: Map<string, Execution>) => {
                return Array.from(map.values());
            })
        );
        return executions;
    }

    execution(id: string): Observable<Execution | undefined> {
        const execution: Observable<Execution | undefined> = this._executions.pipe(
            map((map: Map<string, Execution>) => {
                return map.get(id);
            })
        );
        return execution;
    }

    update(): void {
        const executions: Map<string, Execution> = this._executions.getValue();
        this._executions.next(executions);
    }

    deleteExecution(id: string): void {
        const executions: Map<string, Execution> = this._executions.getValue();
        if (!executions.has(id)) {
            return;
        }
        executions.delete(id);
        this._executions.next(executions);
    }

    createExecution(): void {
        const id: string = uuid.v4();
        const output: OutputTask = this.defaultOutputTask();
        const execution: Execution = {
            id,
            output,
            name: 'Noname',
            tasks: {} as Tasks,
            data: {} as ExecutionData
        };

        const executions: Map<string, Execution> = this._executions.getValue();
        executions.set(id, execution);
        this._executions.next(executions);
    }

    private defaultOutputTask(): OutputTask {
        const id: string = uuid.v4();
        return {
            id,
            name: 'Output',
            disabled: false,
            type: TaskType.OUTPUT,
            filename: 'output.csv',
            format: OutputTaskFormat.CSV,
            fields: {} as OutputTaskFields
        } as OutputTask;
    }

    add(list: Execution[]): void {
        const executions: Map<string, Execution> = this._executions.getValue();
        list.forEach((execution: Execution) => {
            executions.set(execution.id, execution);
        });
        this._executions.next(executions);
    }

    export(ids: string[]): void {
        if (!ids || ids.length < 1) {
            return;
        }

        const executions: Map<string, Execution> = this._executions.getValue();
        const exportExecutions: Execution[] = ids.map((id: string) => {
            return executions.get(id);
        }).filter((execution: Execution | undefined) => {
            return !!(execution);
        }).map((execution: Execution | undefined) => {
            return execution!;
        });

        this.executionsExportService.exportExecutions(exportExecutions);
    }

}
