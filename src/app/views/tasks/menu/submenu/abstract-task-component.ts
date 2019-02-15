import { Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/core/exectuion/task/task';
import { TasksService } from '../../service/tasks.service';

export abstract class AbstractTaskComponent<T extends Task> implements OnInit, OnDestroy {

    formGroup: FormGroup;

    @Input()
    task: T | undefined;

    private subscription: Subscription | undefined;

    protected constructor(protected readonly tasksService: TasksService) {
        this.formGroup = this.initFormGroup();
    }


    ngOnInit(): void {
        this.subscription = this.formGroup.valueChanges.subscribe(() => {
            this.emitUpdateTask();
        });
        if (this.task) {
            this.loadTask(this.formGroup, this.task);
        }
    }

    protected getDefaultValue<T>(key: string, defaultValue: T): T {
        const value: T | undefined = this.getValue(key);
        if (value === undefined || value === null) {
            return defaultValue;
        }
        return value;
    }

    protected getValue<T>(key: string): T | undefined {
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

    protected abstract initFormGroup(): FormGroup;

    private emitUpdateTask(): void {
        if (!this.task) {
            return;
        }
        this.task = this.updateTask(this.task);
        this.tasksService.update();
    }

    protected abstract updateTask(task: T): T | undefined;

    protected abstract loadTask(formGroup: FormGroup, task: T): void ;

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


}