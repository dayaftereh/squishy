import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoadTask } from '../../../../services/task/load/load-task';
import { LoadTaskData } from '../../../../services/task/load/load-task-data';
import { TaskListService } from '../../service/task-list.service';

@Component({
    selector: 'app-load-task',
    templateUrl: './load-task.component.html',
    styleUrls: [
        './load-task.component.scss'
    ]
})
export class LoadTaskComponent implements OnInit, OnDestroy {

    files: File[];

    @Input()
    task: LoadTask | undefined;

    formGroup: FormGroup;

    subscription: Subscription;

    constructor(private readonly taskListService: TaskListService) {
        this.files = [];
        this.initFormGroup();
    }

    initFormGroup(): void {
        this.formGroup = new FormGroup({
            fields: new FormControl()
        });
    }

    ngOnInit(): void {
        this.subscription = this.formGroup.valueChanges.subscribe(() => {
            this.update();
        });

        if (this.task) {
            this.formGroup.patchValue({
                fields: this.task.fields
            }, { emitEvent: false });
        }
    }

    onFilesSelected(event: any): void {
        if (!this.task || !event || !event.files) {
            return;
        }
        const id: string = this.task.id;
        const files: File[] = event.files;
        this.taskListService.updateTaskData(id, {
            files
        } as LoadTaskData);

    }

    onFilesCleared(): void {
        if (!this.task) {
            return;
        }

        const id: string = this.task.id;
        this.taskListService.updateTaskData(id, {
            files: []
        } as LoadTaskData);
    }

    private update(): void {
        if (!this.task) {
            return;
        }

        this.task.fields = this.getValue('fields') || {};
        this.taskListService.update(true);
    }

    private getValue<T>(key: string): T | undefined {
        const control: AbstractControl | null = this.formGroup.get(key);
        if (!control) {
            return undefined;
        }
        const value: T | null = control.value;
        if (!value) {
            return undefined;
        }
        return value;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


}