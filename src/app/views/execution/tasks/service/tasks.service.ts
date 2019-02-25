import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/core/exectuion/task/task';
import * as uuid from 'uuid';
import { TaskData } from '../../../../../core/exectuion/data/task/task-data';
import { Execution } from '../../../../../core/exectuion/execution';
import { TaskId } from '../../../../../core/exectuion/task/task-id';
import { TaskType } from '../../../../../core/exectuion/task/task-type';
import { Tasks } from '../../../../../core/exectuion/task/tasks';
import { ExecutionsExportService } from '../../../../services/executions/executions-export.service';
import { ExecutionsRouteResolverService } from '../../../../services/executions/executions-route-resolver.service';

@Injectable()
export class TasksService {

    private readonly _selection: BehaviorSubject<Task | undefined>;
    private readonly _execution: BehaviorSubject<Execution | undefined>;

    constructor(private readonly executionsRouteResolverService: ExecutionsRouteResolverService,
                private readonly executionsExportService: ExecutionsExportService) {
        this._selection = new BehaviorSubject<Task | undefined>(undefined);
        this._execution = new BehaviorSubject<Execution | undefined>(undefined);
        this.executionsRouteResolverService.execution().subscribe(this._execution);
    }

    tasks(): Observable<Task[]> {
        const tasks: Observable<Task[]> = this._execution.pipe(
            map((execution: Execution | undefined) => {
                if (!execution) {
                    return [];
                }

                const keys: string [] = Object.keys(execution.tasks);

                const list: Task[] = keys.map((key: string) => {
                    const task: Task = execution.tasks[key];
                    return task;
                });

                return list;
            })
        );
        return tasks;
    }

    select(task: Task): void {
        this._selection.next(task);
    }

    unselect(): void {
        this._selection.next(undefined);
    }

    selection(): Observable<Task | undefined> {
        return this._selection;
    }

    execution(): Observable<Execution | undefined> {
        return this._execution;
    }

    deleteTask(id: TaskId): void {
        const task: Task | undefined = this._selection.getValue();
        if (task && task.id === id) {
            this._selection.next(undefined);
        }

        const execution: Execution | undefined = this._execution.getValue();
        if (!execution) {
            return;
        }

        const tasks: Tasks = execution.tasks;
        if (!tasks.hasOwnProperty(id)) {
            return;
        }

        delete tasks[id];
        this._execution.next(execution);
    }

    update(): void {
        const task: Task | undefined = this._selection.getValue();
        this._selection.next(task);

        const execution: Execution | undefined = this._execution.getValue();
        this._execution.next(execution);
    }

    newTask(type: TaskType): void {
        const execution: Execution | undefined = this._execution.getValue();
        if (!execution) {
            return;
        }
        const id: string = uuid.v4();

        const task: Task = {
            id,
            type,
            name: 'NoName',
            disabled: false
        };

        execution.tasks[id] = task;
        this._execution.next(execution);
    }

    executionData(taskId: TaskId, taskData: TaskData | undefined): void {
        const execution: Execution | undefined = this._execution.getValue();
        if (!execution) {
            return;
        }
        if (taskData) {
            execution.data[taskId] = taskData;
        } else {
            delete execution.data[taskId];
        }
    }

}