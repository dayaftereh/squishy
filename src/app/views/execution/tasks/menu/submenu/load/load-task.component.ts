import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadTaskData } from '../../../../../../../core/exectuion/data/task/load/load-task-data';
import { LoadTask } from '../../../../../../../core/exectuion/task/load/load-task';
import { TasksService } from '../../../service/tasks.service';
import { AbstractTaskComponent } from '../abstract-task-component';

@Component({
    selector: 'app-load-task',
    templateUrl: './load-task.component.html',
    styleUrls: [
        './load-task.component.scss'
    ]
})
export class LoadTaskComponent extends AbstractTaskComponent<LoadTask> {

    files: File[];

    constructor(tasksService: TasksService) {
        super(tasksService);
        this.files = [];
    }

    protected initFormGroup(): FormGroup {
        return new FormGroup({
            fields: new FormControl()
        });
    }

    protected loadTask(formGroup: FormGroup, task: LoadTask): void {
        formGroup.patchValue({
            fields: task.fields
        }, { emitEvent: false });
    }

    protected updateTask(task: LoadTask): LoadTask | undefined {

        task.fields = this.getDefaultValue('fields', {});

        return task;
    }


    onFilesSelected(event: any): void {
        if (!this.task || !event || !event.files) {
            return;
        }
        const id: string = this.task.id;

        const fileList: FileList = event.files;
        const files: File[] = [];
        for (let i: number = 0; i < fileList.length; i++) {
            const file: File | null = fileList.item(i);
            if (file) {
                files.push(file);
            }
        }

        const data: LoadTaskData = files;
        this.tasksService.executionData(id, data);
    }

    onFilesCleared(): void {
        if (!this.task) {
            return;
        }

        const id: string = this.task.id;
        this.tasksService.executionData(id, undefined);
    }


}