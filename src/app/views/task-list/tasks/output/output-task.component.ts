import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OutputTask } from '../../../../../core/exectuion/task/output/output-task';
import { TaskListService } from '../../service/task-list.service';

@Component({
    selector: 'app-output-task',
    templateUrl: './output-task.component.html'
})
export class OutputTaskComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;

    @Input()
    task: OutputTask | undefined;

    private subscription: Subscription;

    constructor(private readonly taskListService: TaskListService) {
        this.initFormGroup();
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            input: new FormControl(),
            fields: new FormControl(),
            filename: new FormControl()
        });
    }

    ngOnInit(): void {
        this.subscription = this.formGroup.valueChanges.subscribe(() => {
            this.update();
        });

        if (this.task) {
            this.formGroup.patchValue({
                input: this.task.input,
                fields: this.task.fields,
                filename: this.task.filename
            }, {
                emitEvent: false
            });
        }
    }

    private update(): void {
        if (!this.task) {
            return;
        }

        this.task.fields = this.getValue('fields') || {};
        this.task.filename = this.getValue('filename') || 'output.csv';

        const input: string | undefined = this.getValue('input');
        if (input) {
            this.task.input = input;
        }

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