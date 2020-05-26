import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { Utils } from '../utils/utils';
import { PropertiesDialogChild } from './service/properties-dialog-child';
import { PropertiesDialogServiceEvent } from './service/properties-dialog-service.event';
import { PropertiesDialogService } from './service/properties-dialog.service';
import { ElementUtils } from '../utils/element-utils';

@Component({
    templateUrl: './properties-dialog.component.html',
    selector: 'app-properties-dialog'
})
export class PropertiesDialogComponent implements OnInit, AfterViewInit, OnDestroy {

    display: boolean

    event: PropertiesDialogServiceEvent | undefined

    @ViewChild('dialog')
    dialog: Dialog | undefined

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef | undefined

    private resize: EventEmitter<void>

    private subscriptions: Subscription[]
    private componentRef: ComponentRef<PropertiesDialogChild> | undefined

    constructor(
        private readonly propertiesDialogService: PropertiesDialogService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
    ) {
        this.subscriptions = []
        this.resize = new EventEmitter<void>(true)
    }

    ngOnInit(): void {
        const eventSubscription: Subscription = this.propertiesDialogService.onOpen((event: PropertiesDialogServiceEvent) => {
            this.show(event)
        })

        const resizeSubscription: Subscription = this.resize.subscribe(() => {
            this.emitResize()
        })

        this.subscriptions.push(eventSubscription, resizeSubscription)

    }

    ngAfterViewInit(): void {
        if (this.dialog) {
            // workaround to get maximize event from pDialog
            this.overwriteDialogMaximize()
        }
    }

    private overwriteDialogMaximize(): void {
        const maximize: () => void = this.dialog.maximize
        // overwrite the maximize function from pDialog 
        this.dialog.maximize = () => {
            // execute the p-dialog function
            maximize.call(this.dialog)

            this.maximize()
        }
    }

    private show(event: PropertiesDialogServiceEvent): void {
        this.event = event;
        this.registerComponent(event)
        this.display = true
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

    private emitResize(): void {
        if (!this.dialog) {
            return
        }

        // get the content element for the dialog
        const contentElement: HTMLElement = this.dialog.contentViewChild.nativeElement
        // calculate the dimension of the content element
        const dimension: { width: number, height: number } = ElementUtils.getElementDimension(contentElement)

        // nofify cleint about changed size
        const child: PropertiesDialogChild | undefined = this.child()
        if (!Utils.isNullOrUndefined(child)) {
            child.resized(dimension.width, dimension.height)
        }
    }

    private maximize(): void {
        this.resize.emit()
    }

    ngOnDestroy(): void {
        // unregister the current component
        this.unregisterComponent()

        // unsubscribe subscriptions
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe()
            })
        }
    }

}