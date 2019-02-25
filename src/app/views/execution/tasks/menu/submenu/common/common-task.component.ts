import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/core/exectuion/task/task';
import { TaskType } from '../../../../../../../core/exectuion/task/task-type';
import { TasksService } from '../../../service/tasks.service';
import { AbstractTaskComponent } from '../abstract-task-component';

@Component({
    selector: 'app-common-task',
    templateUrl: './common-task.component.html'
})
export class CommonTaskComponent extends AbstractTaskComponent<Task> {

    TaskType = TaskType;

    constructor(tasksService: TasksService) {
        super(tasksService);
    }

    protected initFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            disabled: new FormControl()
        });
    }

    protected loadTask(formGroup: FormGroup, task: Task): void {
        formGroup.patchValue({
            name: task.name,
            disabled: task.disabled
        }, {
            emitEvent: false
        });
    }

    protected updateTask(task: Task): Task | undefined {

        task.name = this.getDefaultValue('name', 'Noname');
        task.disabled = this.getDefaultValue('disabled', false);

        return task;
    }

    deleteTask(): void {
        if (this.task) {
            this.tasksService.deleteTask(this.task.id);
        }
    }

}