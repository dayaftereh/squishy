import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/services/task/task';
import { TaskExecution } from '../../../services/execution/task-execution';
import { Tab } from '../../../services/tabs/tab';
import { TabRouteResolverService } from '../../../services/tabs/tab-route-resolver.service';
import { TasksService } from '../../../services/task/tasks.service';

@Injectable()
export class TaskListService {

    subject: BehaviorSubject<Tab | undefined>;

    executionData: TaskExecution

    constructor(private readonly tasksService: TasksService,
                private readonly tabRouteResolverService: TabRouteResolverService) {
        this.subject = new BehaviorSubject<Tab | undefined>(undefined);
        this.tabRouteResolverService.tab().subscribe(this.subject);
    }

    tasks(): Observable<Task[]> {
        return this.tasksService.tasks(this.subject);
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

    private computeIfPresent(fn: (tab: Tab) => void): void {
        const tab: Tab | undefined = this.subject.getValue();
        if (!tab || !fn) {
            return;
        }

        fn(tab);
    }

}