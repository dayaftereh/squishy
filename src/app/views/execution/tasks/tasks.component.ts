import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TaskType } from '../../../../core/exectuion/task/task-type';
import { TasksService } from './service/tasks.service';

@Component({
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

    type: TaskType | undefined;
    types: SelectItem[];

    constructor(private readonly tasksService: TasksService) {
        this.types = [];
    }

    ngOnInit(): void {
        this.types.push({
                label: 'script',
                value: TaskType.SCRIPT
            },
            {
                label: 'load',
                value: TaskType.LOAD
            }
        );
    }


    addTask(): void {
        if (!this.type) {
            return;
        }
        this.tasksService.newTask(this.type);
    }

}
