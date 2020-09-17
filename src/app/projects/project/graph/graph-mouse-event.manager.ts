import { ElementRef } from '@angular/core';
import { Node, NodeEditor } from 'rete';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

interface ContextMenuEvent {
    e: MouseEvent
    node: Node | undefined
}

export class GraphMouseEventManager {

    private timeout: number = 500.0 // ms

    private node: Node | undefined

    private timer: number | undefined

    private trigger: boolean | undefined
    private disabled: boolean | undefined

    private subscriptions: Subscription[]

    private subject: Subject<ContextMenuEvent>

    constructor(
        private readonly editor: NodeEditor,
        private readonly element: ElementRef
    ) {
        this.trigger = false
        this.disabled = false
        this.subscriptions = []
        this.subject = new Subject<ContextMenuEvent>();
    }

    register(): void {
        const element: HTMLElement = this.element.nativeElement

        this.editor.on('nodeselected', (node: Node) => {
            this.onNodeSelected(node)
        })

        this.editor.on('translated', () => {
            this.onTranslated()
        })

        this.editor.on('nodetranslated', () => {
            this.onTranslated()
        })

        const downSubscription: Subscription = fromEvent(element, 'mousedown').subscribe((event: MouseEvent) => {
            this.onMouseDown(event)
        })

        const upSubscription: Subscription = fromEvent(element, 'mouseup').subscribe((event: MouseEvent) => {
            this.onMouseUp(event)
        })

        const fireSubscription: Subscription = this.subject.pipe(
            delay(50)
        ).subscribe((event: ContextMenuEvent) => {
            this.fire(event)
        })

        this.subscriptions.push(downSubscription, upSubscription, fireSubscription)
    }

    unregister(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe()
        })
    }

    private onNodeSelected(node: Node): void {
        this.node = node
    }

    private onTranslated(): void {
        this.disabled = true
    }

    private onMouseDown(event: MouseEvent): void {
        this.timer = window.setTimeout(() => {
            this.trigger = true
        }, this.timeout)
    }

    private emitContextMenu(event: MouseEvent): void {
        if (this.timer) {
            clearTimeout(this.timer)
        }

        if (!this.disabled && this.trigger) {
            this.subject.next({
                e: event,
                node: this.node
            })
        }

        this.node = undefined
        this.trigger = false
        this.disabled = false
    }

    private onMouseUp(event: MouseEvent): void {
        this.emitContextMenu(event)
    }

    private fire(event: ContextMenuEvent): void {
        this.editor.trigger('contextmenu', event)
    }

}