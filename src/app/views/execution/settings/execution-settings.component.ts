import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Execution } from '../../../../core/exectuion/execution';
import { ExecutionsRouteResolverService } from '../../../services/executions/executions-route-resolver.service';

@Component({
    templateUrl: './execution-settings.component.html'
})
export class ExecutionSettingsComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;

    private execution: Execution | undefined;
    private readonly subscriptions: Subscription[];

    constructor(private readonly executionsRouteResolverService: ExecutionsRouteResolverService) {
        this.initFormGroup();
        this.subscriptions = [];
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl()
        });
    }

    ngOnInit(): void {
        const formSubscription: Subscription = this.formGroup.valueChanges.subscribe(() => {
            this.updateExecution();
        });

        const executionSubscription: Subscription = this.executionsRouteResolverService.execution()
            .subscribe((execution: Execution | undefined) => {
                this.execution = execution;
                this.loadExecution();
            });

        this.subscriptions.push(formSubscription, executionSubscription);
    }

    private loadExecution(): void {
        if (!this.execution) {
            return;
        }

        this.formGroup.patchValue({
            name: this.execution.name
        }, {
            emitEvent: false
        });
    }

    private updateExecution(): void {
        if (!this.execution) {
            return;
        }

        this.execution.name = this.getValue('name', this.execution.name);
        this.executionsRouteResolverService.update(this.execution);
    }

    protected getValue<T>(key: string, defaultValue: T): T {
        const control: AbstractControl | null = this.formGroup.get(key);
        if (!control) {
            return defaultValue;
        }
        const value: T | null = control.value;
        if (value === null || value === undefined) {
            return defaultValue;
        }
        return value;
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        }
    }

}