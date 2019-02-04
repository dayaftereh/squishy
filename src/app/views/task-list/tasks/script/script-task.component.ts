import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ScriptTask } from '../../../../services/task/script/script-task';
import { TaskListService } from '../../service/task-list.service';

@Component({
    selector: 'app-script-task',
    templateUrl: './script-task.component.html'
})
export class ScriptTaskComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;

    @Input()
    task: ScriptTask | undefined;

    private subscription: Subscription | undefined;

    constructor(private readonly taskListService: TaskListService) {
        this.initFromGroup();
    }

    private initFromGroup(): void {
        this.formGroup = new FormGroup({
            script: new FormControl()
        });
    }

    ngOnInit(): void {
        this.subscription = this.formGroup.valueChanges.subscribe(() => {
            this.update();
        });

        if (this.task) {
            this.formGroup.patchValue({
                script: this.task.script
            }, { emitEvent: false });
        }
    }

    private update(): void {
        if (!this.task) {
            return;
        }
        console.log("update")
        this.task.script = this.getValue('script') || '';
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
