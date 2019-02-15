import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from 'src/core/exectuion/task/task-type';
import { Task } from '../../../../core/exectuion/task/task';
import { TasksService } from '../service/tasks.service';

@Component({
    selector: 'app-tasks-menu',
    templateUrl: './tasks-menu.component.html'
})
export class TasksMenuComponent implements OnInit {

    TaskType = TaskType;

    selection: Observable<Task | undefined>;

    constructor(private readonly tasksService: TasksService) {

    }

    ngOnInit(): void {
        this.selection = this.tasksService.selection();
    }

}
