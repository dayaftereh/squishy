import { ElementRef } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

export class TouchHoldEventHandler {

    private timeout: number = 500

    private subject: Subject<TouchEvent>

    private subscriptions: Subscription[]

    private disable: boolean
    private preventEnd: boolean
    private timer: number | undefined

    constructor(private readonly element: ElementRef) {
        this.disable = false
        this.preventEnd = false
        this.subscriptions = []
        this.subject = new Subject<TouchEvent>();
    }

    register(): void {
        const element: HTMLElement = this.element.nativeElement

        const startSubscription: Subscription = fromEvent(element, 'touchstart').subscribe((event: TouchEvent) => {
            this.onTouchStart(event)
        })

        const endSubscription: Subscription = fromEvent(element, 'touchend').subscribe((event: TouchEvent) => {
            this.onTouchEnd(event)
        })

        this.subscriptions.push(startSubscription, endSubscription)
    }

    private onTouchStart(event: TouchEvent): void {
        this.disable = false
        this.preventEnd = false
        this.timer = window.setTimeout(() => {
            this.emitEvent(event)
        }, this.timeout)
    }

    private onTouchEnd(event: TouchEvent): void {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = undefined
        this.disable = false

        if (this.preventEnd) {
            event.preventDefault()
        }
        this.preventEnd = false
    }

    private emitEvent(event: TouchEvent): void {
        this.timer = undefined
        if (this.disable) {
            return
        }
        this.preventEnd = true
        this.subject.next(event)
    }

    prevent(): void {
        this.disable = true
    }

    unregister(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe()
        })
    }

    subscribe(fn: (event: TouchEvent) => void): Subscription {
        return this.subject.pipe(
            delay(20)
        ).subscribe(fn)
    }

}