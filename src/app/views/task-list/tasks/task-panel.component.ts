import { Component, Input } from '@angular/core';
import { Task } from '../../../services/task/task';
import { TaskType } from '../../../services/task/task-type';
import { TaskListService } from '../service/task-list.service';

@Component({
    selector: 'app-task-panel',
    templateUrl: './task-panel.component.html'
})
export class TaskPanelComponent {

    TaskType: any = TaskType;

    @Input()
    task: Task | undefined;


    constructor(private readonly taskListService: TaskListService) {
    }


    removeTask(): void {
        if (!this.task) {
            return;
        }
        this.taskListService.removeTask(this.task.id, true);
    }
}