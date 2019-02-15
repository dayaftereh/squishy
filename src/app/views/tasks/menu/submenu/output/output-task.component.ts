import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OutputTask } from '../../../../../../core/exectuion/task/output/output-task';
import { TasksService } from '../../../service/tasks.service';
import { AbstractTaskComponent } from '../abstract-task-component';

@Component({
    selector: 'app-output-task',
    templateUrl: './output-task.component.html'
})
export class OutputTaskComponent extends AbstractTaskComponent<OutputTask> {

    constructor(tasksService: TasksService) {
        super(tasksService);
    }

    protected initFormGroup(): FormGroup {
        return new FormGroup({
            input: new FormControl(),
            fields: new FormControl(),
            filename: new FormControl()
        });
    }

    protected loadTask(formGroup: FormGroup, task: OutputTask): void {
        formGroup.patchValue({
            input: task.input,
            fields: task.fields,
            filename: task.filename
        }, {
            emitEvent: false
        });
    }

    protected updateTask(task: OutputTask): OutputTask | undefined {
        task.input = this.getDefaultValue('input', '');
        task.fields = this.getDefaultValue('fields', {});
        task.filename = this.getDefaultValue('filename', 'output.csv');
        return task;
    }


}