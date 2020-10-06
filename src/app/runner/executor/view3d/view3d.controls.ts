import { View3DControl } from 'src/app/projects/project/graph/components/view3d/view3d.control';
import { View3DData } from 'src/app/projects/project/graph/components/view3d/view3d.data';
import { Utils } from 'src/app/utils/utils';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';

export class View3DControls {

    private flyControl: FlyControls | undefined
    private orbitControls: OrbitControls | undefined
    private trackballControls: TrackballControls | undefined

    constructor(
        private readonly view3DData: View3DData,
        private readonly camera: PerspectiveCamera,
        private readonly container: HTMLElement
    ) {

    }

    init(): void {
        if (Utils.isNullOrUndefined(this.view3DData.control)) {
            return
        }

        if (this.view3DData.control === View3DControl.Fly) {
            this.initFlyControls()
        } else if (this.view3DData.control === View3DControl.Orbit) {
            this.initOrbitControls()
        } else if (this.view3DData.control === View3DControl.Trackball) {
            this.initTrackballControls()
        }
    }

    private initFlyControls(): void {
        this.flyControl = new FlyControls(this.camera, this.container)
        this.flyControl.rollSpeed = Math.PI / 24.0
    }

    private initOrbitControls(): void {
        this.orbitControls = new OrbitControls(this.camera, this.container)
        this.camera.position.set(100.0, 0.0, 10.0)
    }

    private initTrackballControls(): void {
        this.trackballControls = new TrackballControls(this.camera, this.container)
        this.trackballControls.rotateSpeed = 2.0
        this.camera.position.set(100.0, 0.0, 10.0)
    }

    update(delta: number): void {

        if (!Utils.isNullOrUndefined(this.flyControl)) {
            this.flyControl.update(delta)
        }

        if (!Utils.isNullOrUndefined(this.orbitControls)) {
            this.orbitControls.update()
        }

        if (!Utils.isNullOrUndefined(this.trackballControls)) {
            this.trackballControls.update()
        }
    }

    destroy(): void {
        if (this.flyControl) {
            this.flyControl.dispose()
        }

        if (this.orbitControls) {
            this.orbitControls.dispose()
        }

        if (this.trackballControls) {
            this.trackballControls.dispose()
        }
    }

}