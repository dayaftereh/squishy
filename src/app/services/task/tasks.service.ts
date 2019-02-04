import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { Tab } from '../tabs/tab';
import { Task } from './task';
import { TaskType } from './task-type';

@Injectable()
export class TasksService {

    constructor() {
    }

    newTask(type: TaskType, name?: string): Task {
        if (!name) {
            // todo i18n
            name = 'Noname';
        }

        const id: string = uuid.v4();

        return {
            id,
            type,
            name
        } as Task;
    }

    tasks(tab: Observable<Tab | undefined>): Observable<Task[]> {
        return tab.pipe(map((tab: Tab | undefined) => {
            if (!tab || !tab.tasks) {
                return [];
            }
            const keys: string [] = Object.keys(tab.tasks);
            return keys.map((key: string) => {
                return tab.tasks[key];
            });
        }));
    }

}
