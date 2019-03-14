import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { OutputTask } from '../../../../../../../core/exectuion/task/output/output-task';
import { OutputTaskFormat } from '../../../../../../../core/exectuion/task/output/output-task-format';
import { TasksService } from '../../../service/tasks.service';
import { AbstractTaskComponent } from '../abstract-task-component';

@Component({
    selector: 'app-output-task',
    templateUrl: './output-task.component.html'
})
export class OutputTaskComponent extends AbstractTaskComponent<OutputTask> {

    formats: SelectItem[];

    OutputTaskFormat = OutputTaskFormat;

    constructor(tasksService: TasksService) {
        super(tasksService);
        this.formats = [];
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.formats.push(
            {
                label: 'csv',
                value: OutputTaskFormat.CSV
            },
            {
                label: 'plain',
                value: OutputTaskFormat.PLAIN
            },
            {
                label: 'json',
                value: OutputTaskFormat.JSON
            }
        );
    }

    protected initFormGroup(): FormGroup {
        return new FormGroup({
            input: new FormControl(),
            fields: new FormControl(),
            format: new FormControl(),
            filename: new FormControl(),
            outputKey: new FormControl()
        });
    }

    protected loadTask(formGroup: FormGroup, task: OutputTask): void {
        formGroup.patchValue({
            input: task.input,
            format: task.format,
            fields: task.fields,
            filename: task.filename,
            outputKey: task.outputKey
        }, {
            emitEvent: false
        });
    }

    protected updateTask(task: OutputTask): OutputTask | undefined {
        task.input = this.getDefaultValue('input', '');
        task.fields = this.getDefaultValue('fields', {});
        task.format = this.getDefaultValue('format', OutputTaskFormat.CSV);
        task.outputKey = this.getDefaultValue('outputKey', 'output');
        task.filename = this.getDefaultValue('filename', 'output.csv');
        return task;
    }


}