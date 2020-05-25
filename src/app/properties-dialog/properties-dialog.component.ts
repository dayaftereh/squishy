import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { Utils } from '../utils/utils';
import { PropertiesDialogChild } from './service/properties-dialog-child';
import { PropertiesDialogServiceEvent } from './service/properties-dialog-service.event';
import { PropertiesDialogService } from './service/properties-dialog.service';

@Component({
    templateUrl: './properties-dialog.component.html',
    selector: 'app-properties-dialog'
})
export class PropertiesDialogComponent implements OnInit, OnDestroy {

    display: boolean

    maximized: boolean

    event: PropertiesDialogServiceEvent | undefined

    @ViewChild('dialog')
    dialog: Dialog | undefined

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef | undefined

    private subscription: Subscription | undefined
    private componentRef: ComponentRef<PropertiesDialogChild> | undefined

    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly propertiesDialogService: PropertiesDialogService) {
    }

    ngOnInit(): void {
        this.subscription = this.propertiesDialogService.onOpen((event: PropertiesDialogServiceEvent) => {
            this.show(event)
        })
    }

    private show(event: PropertiesDialogServiceEvent): void {
        this.event = event;
        this.registerComponent(event)
        this.display = true

        if (this.dialog) {
            this.maximized = this.dialog.maximized
        } else {
            this.maximized = false
        }
    }

    private registerComponent(event: PropertiesDialogServiceEvent) {
        this.unregisterComponent()
        const factory: ComponentFactory<PropertiesDialogChild> = this.componentFactoryResolver.resolveComponentFactory(event.component)
        this.componentRef = this.container.createComponent(factory)

        if (!Utils.isNullOrUndefined(this.event.onInit)) {
            const child: PropertiesDialogChild = this.componentRef.instance
            this.event.onInit(child)
        }
    }

    private child(): PropertiesDialogChild | undefined {
        if (Utils.isNullOrUndefined(this.componentRef)) {
            return undefined
        }
        return this.componentRef.instance
    }

    private hide(): void {
        this.display = false
        this.unregisterComponent()
        // check if dialog is maximized
        if (this.dialog && this.dialog.maximized) {
            this.maximize()
        }
    }

    private unregisterComponent() {
        if (!Utils.isNullOrUndefined(this.componentRef)) {
            this.componentRef.destroy()
        }

        if (!Utils.isNullOrUndefined(this.container)) {
            this.container.detach()
        }

        this.componentRef = undefined
    }

    async submit(): Promise<void> {
        const child: PropertiesDialogChild | undefined = this.child()
        if (!Utils.isNullOrUndefined(child)) {
            await child.submit()
        }
        this.hide()
    }

    async cancel(): Promise<void> {
        const child: PropertiesDialogChild | undefined = this.child()
        if (!Utils.isNullOrUndefined(child)) {
            await child.cancel()
        }
        this.hide()
    }

    maximize(): void {
        if (this.dialog) {
            this.dialog.maximize()
        }
        this.maximized = this.dialog.maximized

        console.log(this.dialog.container.clientWidth, this.dialog.container.clientHeight)

        const child: PropertiesDialogChild | undefined = this.child()
        if (!Utils.isNullOrUndefined(child)) {
            child.resized()
        }
    }

    ngOnDestroy(): void {
        this.unregisterComponent()
        if (!Utils.isNullOrUndefined(this.subscription)) {
            this.subscription.unsubscribe()
        }
    }

}