import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/core/exectuion/task/task';
import { Execution } from '../../../../core/exectuion/execution';

@Injectable()
export class TasksService {

    private readonly _selection: BehaviorSubject<Task | undefined>;
    private readonly _execution: BehaviorSubject<Execution | undefined>;

    constructor() {
        this._selection = new BehaviorSubject<Task | undefined>(undefined);
        this._execution = new BehaviorSubject<Execution | undefined>(undefined);
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

}