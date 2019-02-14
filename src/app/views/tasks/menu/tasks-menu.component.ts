import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../../../core/exectuion/task/task';
import { TasksService } from '../service/tasks.service';

@Component({
    selector: 'app-tasks-menu',
    templateUrl: './tasks-menu.component.html'
})
export class TasksMenuComponent implements OnInit {

    selection: Observable<Task | undefined>;

    constructor(private readonly tasksService: TasksService) {

    }

    ngOnInit(): void {
        this.selection = this.tasksService.selection();
    }

}
