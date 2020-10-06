import { Utils } from 'src/app/utils/utils';
import { View3DAxes } from 'src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-axes';
import { View3DGeometry } from 'src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-geometry';
import { View3DGrid } from 'src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-grid';
import { View3DLines } from 'src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-lines';
import { View3DPoints } from 'src/worker/execution/node-executor/script/squishy/view3d/objects/view3d-points';
import { View3DObject } from 'src/worker/execution/node-executor/script/squishy/view3d/view3d-object';
import { View3DType } from 'src/worker/execution/node-executor/script/squishy/view3d/view3d-type';
import { View3DVec3 } from 'src/worker/execution/node-executor/script/squishy/view3d/view3d-vec3';
import { AxesHelper, BufferAttribute, BufferGeometry, GridHelper, Line, LineBasicMaterial, Mesh, MeshPhongMaterial, Object3D, Points, PointsMaterial, Vector3 } from 'three';

export class View3DObject3DFactory {

    private objectFactory: Map<View3DType, (object: View3DObject) => Object3D>

    constructor() {

    }

    init(): void {
        this.objectFactory = new Map<View3DType, (object: View3DObject) => Object3D>()

        // register all factory functions
        this.objectFactory.set(View3DType.Grid, this.createGrid)
        this.objectFactory.set(View3DType.Axes, this.createAxes)
        this.objectFactory.set(View3DType.Lines, this.createLines)
        this.objectFactory.set(View3DType.Points, this.createPoints)
        this.objectFactory.set(View3DType.Geometry, this.createGeometry)
    }

    create(object: View3DObject): Object3D {
        // get the type of the object
        const type: View3DType = object.type

        if (!this.objectFactory.has(type)) {
            throw new Error(`unable to create object 3d for type [ ${type} ], because no factory found`)
        }
        // get the factory
        const factory: (object: View3DObject) => Object3D = this.objectFactory.get(type)
        // create the 3d object
        const object3d: Object3D = factory.bind(this)(object)

        return object3d
    }

    private createGrid(object: View3DObject): GridHelper {
        const grid: View3DGrid = object as View3DGrid
        const gridHelper: GridHelper = new GridHelper(grid.size, grid.divisions, grid.color, grid.color)
        this.updatePositionAndRotation(gridHelper, object)
        return gridHelper
    }

    private createLines(object: View3DObject): Line {
        const lines: View3DLines = object as View3DLines

        // create the line material
        const material: LineBasicMaterial = new LineBasicMaterial({
            color: lines.color
        })

        // create the buffered geometry
        const geometry: BufferGeometry = new BufferGeometry()

        // create the points
        const points: Vector3[] = this.pointsToVector3(lines.points)

        // set the points to  geometry
        geometry.setFromPoints(points)

        // create the line
        const line: Line = new Line(geometry, material)

        // update the position and rotation
        this.updatePositionAndRotation(line, object)

        return line
    }

    private createPoints(object: View3DObject): Points {
        const points: View3DPoints = object as View3DPoints

        // create the line material
        const material: PointsMaterial = new PointsMaterial({
            color: points.color
        })

        // create the buffered geometry
        const geometry: BufferGeometry = new BufferGeometry()

        // create the points
        const geometryPoints: Vector3[] = this.pointsToVector3(points.points)

        // set the points to  geometry
        geometry.setFromPoints(geometryPoints)

        const pointsObject: Points = new Points(geometry, material)
        // update the position and rotation
        this.updatePositionAndRotation(pointsObject, object)

        return pointsObject
    }

    private createAxes(object: View3DObject): AxesHelper {
        const axes: View3DAxes = object as View3DAxes
        // create the axes helper
        const axesHelper: AxesHelper = new AxesHelper(axes.size)
        // update the position and rotation
        this.updatePositionAndRotation(axesHelper, object)
        return axesHelper
    }

    private createGeometry(object: View3DObject): Mesh {
        // get the Geometry
        const view3dGeometry: View3DGeometry = object as View3DGeometry

        // create the color
        const material: MeshPhongMaterial = new MeshPhongMaterial({
            color: '#ddddd'
        })

        // create the geometry
        const geometry: BufferGeometry = new BufferGeometry()

        // check if colors given
        if (!Utils.isNullOrUndefined(view3dGeometry.colors) && view3dGeometry.colors.length > 0) {
            // set color from vertex
            material.color = undefined
            material.vertexColors = true

            const colors: Float32Array = Float32Array.from(view3dGeometry.colors)
            geometry.setAttribute('color', new BufferAttribute(colors, 3))
        }

        // check if vertices given
        if (!Utils.isNullOrUndefined(view3dGeometry.vertices) && view3dGeometry.vertices.length > 0) {
            const vertices: Float32Array = Float32Array.from(view3dGeometry.vertices)
            geometry.setAttribute('position', new BufferAttribute(vertices, 3))
        }

        // check if normals given
        if (!Utils.isNullOrUndefined(view3dGeometry.normals) && view3dGeometry.normals.length > 0) {
            const normals: Float32Array = Float32Array.from(view3dGeometry.normals)
            geometry.setAttribute('normal', new BufferAttribute(normals, 3))
        }

        // create the mesh
        const mesh: Mesh = new Mesh(geometry, material)

        // update position and rotation
        this.updatePositionAndRotation(mesh, object)

        return mesh
    }

    private updatePositionAndRotation(object3D: Object3D, view3dObject: View3DObject): void {
        object3D.position.set(
            view3dObject.position.x,
            view3dObject.position.y,
            view3dObject.position.z
        )

        object3D.rotation.set(
            view3dObject.rotation.x,
            view3dObject.rotation.y,
            view3dObject.rotation.z
        )
    }

    private pointsToVector3(points: View3DVec3[]): Vector3[] {
        if (Utils.isNullOrUndefined(points)) {
            return []
        }

        return points.map((v: View3DVec3) => {
            const v3: Vector3 = new Vector3(
                v.x, v.y, v.z
            )
            return v3
        })
    }

}