import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Card } from 'primeng/card';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExecutionResultEvent } from 'src/app/executor-service/execution-result.event';
import { ExecutorService } from 'src/app/executor-service/executor.service';
import { View3DData } from 'src/app/projects/project/graph/components/view3d/view3d.data';
import { Utils } from 'src/app/utils/utils';
import { View3DObject } from 'src/worker/execution/node-executor/script/squishy/view3d/view3d-object';
import { Group, Object3D } from 'three';
import { View3DObject3DFactory } from './view3d-object3d.factory';
import { View3DEngine } from './view3d.engine';

@Component({
    selector: 'app-view3d-executor',
    templateUrl: './view3d-executor.component.html',
    styleUrls: [
        './view3d-executor.component.scss',
    ]
})
export class View3DExecutorComponent implements OnInit, AfterViewInit, OnDestroy {

    fullscreen: boolean | undefined

    @Input()
    view3DData: View3DData | undefined

    @ViewChild("container")
    container: ElementRef<HTMLElement> | undefined

    @ViewChild("card")
    card: Card | undefined

    private engine: View3DEngine

    private subscription: Subscription | undefined

    private view3dObjectFactory: View3DObject3DFactory | undefined

    constructor(
        private readonly ngZone: NgZone,
        private readonly executorService: ExecutorService,
        @Inject(DOCUMENT) private readonly document: Document
    ) {
        this.fullscreen = false
        this.engine = new View3DEngine(ngZone)
    }

    ngOnInit(): void {
        this.view3dObjectFactory = new View3DObject3DFactory()
        this.view3dObjectFactory.init()

        if (Utils.isNullOrUndefined(this.view3DData) || Utils.isNullOrUndefined(this.view3DData.id)) {
            return
        }

        this.subscription = this.executorService.executionResult(this.view3DData.id).pipe(
            map((event: ExecutionResultEvent) => {
                return event.result as View3DObject[]
            }),
            map((objects: View3DObject[]) => {
                return objects.map((object: View3DObject) => {
                    return this.view3dObjectFactory.create(object)
                })
            }),
            map((objects: Object3D[]) => {
                // create a group
                const group: Group = new Group()
                // add all object 3d to one group
                group.add(...objects)

                return group
            })
        ).subscribe((group: Group) => {
            // update the group ass the root of the engine
            this.engine.root(group)
        })

        fromEvent(this.document, 'fullscreenchange').subscribe(() => {
            this.onFullscreenChanged()
        })
    }

    ngAfterViewInit(): void {
        const element: HTMLElement = this.container.nativeElement
        if (Utils.isNullOrUndefined(element)) {
            return
        }
        // init the engine with the canvas element
        this.engine.init(element, this.view3DData)
    }

    private onFullscreenChanged(): void {
        this.fullscreen = !Utils.isNullOrUndefined(this.document.fullscreenElement)
        setTimeout(() => {
            // fire a resized event
            window.dispatchEvent(new Event('resize'))
        })
    }

    toggleFullscreen(): void {
        if (!this.card || !(this.card as any).el) {
            return
        }
        const elementRef: ElementRef<HTMLElement> = (this.card as any).el
        const element: HTMLElement = elementRef.nativeElement
        if (!element) {
            return
        }

        if (this.fullscreen) {
            this.document.exitFullscreen()
        } else {
            element.requestFullscreen()
        }
    }

    private emitRequestFullscreen(element: HTMLElement): void {

    }

    ngOnDestroy(): void {
        if (this.engine) {
            this.engine.destroy()
        }
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }


}