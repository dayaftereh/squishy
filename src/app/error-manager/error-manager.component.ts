import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ErrorManagerEvent } from './service/error-manager.event';
import { ErrorManagerService } from './service/error-manager.service';

@Component({
    templateUrl: './error-manager.component.html',
    selector: 'app-error-manager',
    styleUrls: [
        './error-manager.component.scss'
    ]
})
export class ErrorManagerComponent implements OnInit, OnDestroy {

    private subscription: Subscription | undefined

    constructor(
        private readonly messageService: MessageService,
        private readonly errorManagerService: ErrorManagerService,
    ) {

    }

    ngOnInit(): void {
        this.subscription = this.errorManagerService.onErrorEvent((event: ErrorManagerEvent) => {
            this.messageService.add(event)
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}