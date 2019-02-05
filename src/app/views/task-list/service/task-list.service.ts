import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Task } from 'src/app/services/task/task';
import { TaskExecution } from '../../../services/execution/task-execution';
import { Tab } from '../../../services/tabs/tab';
import { TabRouteResolverService } from '../../../services/tabs/tab-route-resolver.service';
import { LoadTaskData } from '../../../services/task/load/load-task-data';
import { TasksData } from '../../../services/task/tasks-data';
import { TasksService } from '../../../services/task/tasks.service';

@Injectable()
export class TaskListService {

    tab: BehaviorSubject<Tab | undefined>;

    data: BehaviorSubject<TasksData | undefined>;

    constructor(private readonly tasksService: TasksService,
                private readonly tabRouteResolverService: TabRouteResolverService) {
        this.tab = new BehaviorSubject<Tab | undefined>(undefined);
        this.data = new BehaviorSubject<TasksData | undefined>(undefined);

        this.tabRouteResolverService.tab().subscribe(this.tab);
    }

    tasks(): Observable<Task[]> {
        return this.tasksService.tasks(this.tab);
    }

    update(emitEvent?: boolean): void {
        this.computeIfPresent((tab: Tab) => {
            this.tabRouteResolverService.update(tab, emitEvent);
        });
    }

    addTask(task: Task, emitEvent?: boolean): void {
        this.computeIfPresent((tab: Tab) => {
            // check if tasks already created
            if (!tab.tasks) {
                tab.tasks = {};
            }

            tab.tasks[task.id] = task;
            this.update(emitEvent);
        });
    }

    removeTask(id: string, emitEvent?: boolean): void {
        this.computeIfPresent((tab: Tab) => {
            // check if tasks already created
            if (!tab.tasks) {
                return;
            }
            if (!tab.tasks.hasOwnProperty(id)) {
                return;
            }
            delete tab.tasks[id];
            this.update(emitEvent);
        });
    }

    updateTaskData(id: string, taskData: LoadTaskData): void {
        this.computeIfPresent(() => {
            let data: TasksData | undefined = this.data.getValue();
            if (!data) {
                data = {};
            }
            data[id] = taskData;
            this.data.next(data);
        });
    }

    private computeIfPresent(fn: (tab: Tab) => void): void {
        const tab: Tab | undefined = this.tab.getValue();
        if (!tab || !fn) {
            return;
        }

        fn(tab);
    }

    async createExecution(): Promise<TaskExecution> {
        let data: TasksData | undefined = this.data.getValue();
        if (!data) {
            data = {};
        }

        const tasks: Task[] = await this.tasksService.tasks(this.tab).pipe(first()).toPromise();

        return {
            data,
            tasks
        } as TaskExecution;
    }

}