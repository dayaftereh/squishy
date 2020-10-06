import { NgZone } from '@angular/core';
import { View3DData } from 'src/app/projects/project/graph/components/view3d/view3d.data';
import { DomHandler } from 'src/app/utils/dom-handler';
import { Utils } from 'src/app/utils/utils';
import { AxesHelper, Clock, GridHelper, Object3D } from 'three';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { View3DControls } from './view3d.controls';


export class View3DEngine {

    private view3DData: View3DData | undefined

    private scene: Scene | undefined

    private clock: Clock | undefined

    private controls: View3DControls | undefined

    private camera: PerspectiveCamera | undefined

    private container: HTMLElement | undefined

    private renderer: WebGLRenderer | undefined

    private rootObject: Object3D | undefined

    private requestAnimationFrameId: number | undefined

    constructor(private readonly ngZone: NgZone) { }

    init(element: HTMLElement, view3DData: View3DData): void {
        this.container = element
        this.view3DData = view3DData
        this.rootObject = undefined

        // create the web gl renderer
        this.renderer = new WebGLRenderer({
            alpha: true,
            antialias: this.antiAlias,
        })
        this.renderer.setSize(this.width, this.height)
        // add the renderer to container
        this.container.appendChild(this.renderer.domElement)

        this.scene = new Scene()

        // create the perspective camera
        this.camera = new PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        )

        this.clock = new Clock(true)

        // initialize the scene
        this.initScene()

        this.initControl()

        // start the animation
        this.animate()
    }

    private initScene(): void {
        if (Utils.isNullOrUndefined(this.view3DData)) {
            return
        }

        if (this.view3DData.grid) {
            const gridHelper: GridHelper = new GridHelper(this.view3DData.gridSize, this.view3DData.gridDivisions)
            this.scene.add(gridHelper)
        }

        if (this.view3DData.viewOrigin) {
            const axesHelper: AxesHelper = new AxesHelper(this.view3DData.originSize)
            this.scene.add(axesHelper)
        }
    }

    private initControl(): void {
        if (Utils.isNullOrUndefined(this.view3DData)) {
            return
        }

        this.controls = new View3DControls(this.view3DData, this.camera, this.container)
        this.controls.init()
    }

    private animate(): void {
        this.ngZone.runOutsideAngular(() => {
            this.outside()
        })
    }

    private outside(): void {
        this.update()

        // register resize events on window
        window.addEventListener('resize', (event: UIEvent) => {
            this.onResize()
        })
    }

    private update(): void {
        this.requestAnimationFrameId = requestAnimationFrame(() => {
            this.update()
        })

        if (!this.renderer || !this.camera || !this.scene || !this.clock) {
            return
        }

        const delta: number = this.clock.getDelta()

        // update the controls
        if (this.controls) {
            this.controls.update(delta)
        }

        // render the update
        this.renderer.render(this.scene, this.camera)
    }

    private get near(): number {
        if (Utils.isNullOrUndefined(this.view3DData) || Utils.isNullOrUndefined(this.view3DData.near) || isNaN(this.view3DData.near)) {
            return 0.1
        }
        return this.view3DData.near
    }

    private get far(): number {
        if (Utils.isNullOrUndefined(this.view3DData) || Utils.isNullOrUndefined(this.view3DData.far) || isNaN(this.view3DData.far)) {
            return 2000.0
        }
        return this.view3DData.far
    }

    private get fov(): number {
        if (Utils.isNullOrUndefined(this.view3DData) || Utils.isNullOrUndefined(this.view3DData.fov) || isNaN(this.view3DData.fov)) {
            return 50.0
        }
        return this.view3DData.fov
    }

    private get aspect(): number {
        return this.width / this.height
    }

    private get width(): number {
        return DomHandler.getWidth(this.container)
    }

    private get height(): number {
        return DomHandler.getHeight(this.container)
    }

    private get antiAlias(): boolean {
        if (Utils.isNullOrUndefined(this.view3DData) || Utils.isNullOrUndefined(this.view3DData.antiAlias)) {
            return false
        }
        return this.view3DData.antiAlias
    }

    private onResize(): void {
        if (this.renderer && this.renderer.domElement) {
            // hide the renderer for shrinking
            this.renderer.domElement.hidden = true
        }

        // update camera
        if (this.camera) {
            this.camera.aspect = this.aspect
            this.camera.updateProjectionMatrix()
        }

        // update renderer
        if (this.renderer) {
            this.renderer.setSize(this.width, this.height, true)
            this.renderer.domElement.hidden = false
        }
    }

    root(object: Object3D): void {
        if (!Utils.isNullOrUndefined(this.rootObject)) {
            // remove the root object
            this.scene.remove(this.rootObject)
        }

        this.rootObject = object
        this.scene.add(this.rootObject)
    }

    destroy(): void {
        if (!Utils.isNullOrUndefined(this.requestAnimationFrameId)) {
            cancelAnimationFrame(this.requestAnimationFrameId)
        }

        if (this.renderer) {
            this.renderer.dispose()
        }

        if (this.controls) {
            this.controls.destroy()
        }
    }

}