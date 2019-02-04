import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TaskType } from 'src/app/services/task/task-type';
import { Task } from '../../services/task/task';
import { TasksService } from '../../services/task/tasks.service';
import { TaskListService } from './service/task-list.service';

@Component({
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

    taskType: TaskType | undefined;

    taskTypes: SelectItem[];


    constructor(private readonly tasksService: TasksService,
                private readonly taskListService: TaskListService) {
    }

    tasks(): Observable<Task[]> {
        return this.taskListService.tasks();
    }

    ngOnInit(): void {
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

    execute(): void {

    }

}