import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScriptTask } from '../../../../../../core/exectuion/task/script/script-task';
import { TasksService } from '../../../service/tasks.service';
import { AbstractTaskComponent } from '../abstract-task-component';

@Component({
    selector: 'app-script-task',
    templateUrl: './script-task.component.html'
})
export class ScriptTaskComponent extends AbstractTaskComponent<ScriptTask> {

    constructor(tasksService: TasksService) {
        super(tasksService);
    }

    protected initFormGroup(): FormGroup {
        return new FormGroup({
            input: new FormControl(),
            script: new FormControl()
        });
    }

    protected loadTask(formGroup: FormGroup, task: ScriptTask): void {
        formGroup.patchValue({
            input: task.input,
            script: task.script
        });
    }

    protected updateTask(task: ScriptTask): ScriptTask | undefined {

        task.input = this.getDefaultValue('input', {});
        task.script = this.getDefaultValue('script', '');

        return this.task;
    }


}
