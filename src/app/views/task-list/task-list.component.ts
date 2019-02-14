import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TaskType } from 'src/core/exectuion/task/task-type';
import { TaskExecution } from '../../services/execution/task-execution';
import { Tab } from '../../services/tabs/tab';
import { Task } from '../../../core/exectuion/task/task';
import { TasksService } from '../../services/task/tasks.service';
import { ExecutorService } from '../executor/service/executor.service';
import { TaskListService } from './service/task-list.service';

@Component({
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

    taskType: TaskType | undefined;

    taskTypes: SelectItem[];

    tab: Observable<Tab | undefined>;

    constructor(private readonly tasksService: TasksService,
                private readonly executorService: ExecutorService,
                private readonly taskListService: TaskListService) {
    }

    tasks(): Observable<Task[]> {
        return this.taskListService.tasks();
    }

    ngOnInit(): void {
        this.tab = this.taskListService.tab;
        this.taskTypes = [
            { label: 'Load', value: TaskType.LOAD },
            { label: 'Script', value: TaskType.SCRIPT }
        ];
        this.taskType = TaskType.LOAD;
    }

    async addTask(): Promise<void> {
        if (!this.taskType) {
            return;
        }
        const task: Task = this.tasksService.newTask(this.taskType);
        this.taskListService.addTask(task, true);
    }

    async execute(): Promise<void> {
        const taskExecution: TaskExecution = await this.taskListService.createExecution();
        this.executorService.eventEmitter.emit(taskExecution);
    }

}