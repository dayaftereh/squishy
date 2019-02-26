import { OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/core/exectuion/task/task';
import { TasksService } from '../../service/tasks.service';

export abstract class AbstractTaskComponent<T extends Task> implements OnInit, OnDestroy {

    formGroup: FormGroup;

    task: T | undefined;

    private readonly subscriptions: Subscription[];

    protected constructor(protected readonly tasksService: TasksService) {
        this.subscriptions = [];
        this.formGroup = this.initFormGroup();
    }


    ngOnInit(): void {
        const formSubscription: Subscription = this.formGroup.valueChanges.subscribe(() => {
            this.emitUpdateTask();
        });

        const selectionSubscription: Subscription = this.tasksService.selection().subscribe((task: Task | undefined) => {
            if (task) {
                this.task = task as T;
                this.loadTask(this.formGroup, this.task);
            }
        });

        this.subscriptions.push(formSubscription, selectionSubscription);
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
        if (value === null || value === undefined) {
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
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        }
    }

}