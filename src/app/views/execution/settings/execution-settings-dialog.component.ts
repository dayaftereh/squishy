import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExecutionSettingsService } from './service/execution-settings.service';

@Component({
    selector: 'app-execution-settings-dialog',
    templateUrl: './execution-settings-dialog.component.html'
})
export class ExecutionSettingsDialogComponent implements OnInit, OnDestroy {

    visible: boolean;

    private subscription: Subscription | undefined;

    constructor(private readonly executionSettingsService: ExecutionSettingsService) {
    }

    ngOnInit(): void {
        this.subscription = this.executionSettingsService.eventEmitter.subscribe(() => {
            this.visible = true;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}