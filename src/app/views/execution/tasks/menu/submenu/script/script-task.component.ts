import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScriptTask } from '../../../../../../../core/exectuion/task/script/script-task';
import { TasksService } from '../../../service/tasks.service';
import { AbstractTaskComponent } from '../abstract-task-component';

@Component({
    selector: 'app-script-task',
    templateUrl: './script-task.component.html'
})
export class ScriptTaskComponent extends AbstractTaskComponent<ScriptTask> {

    options: any = {
        lineNumbers: true,
        mode: 'javascript',
        extraKeys: { 'Ctrl-Space': 'autocomplete' }
    };

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
        const script: string = task.script || '';
        formGroup.patchValue({
            script,
            input: task.input
        }, {
            emitEvent: false
        });
    }

    protected updateTask(task: ScriptTask): ScriptTask | undefined {

        task.input = this.getDefaultValue('input', {});
        task.script = this.getDefaultValue('script', '');

        return this.task;
    }


}
