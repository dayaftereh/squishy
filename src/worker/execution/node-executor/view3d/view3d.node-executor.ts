import { NodeData } from 'rete/types/core/data';
import { Utils } from 'src/app/utils/utils';
import { Execution } from '../../execution';
import { AbstractNodeExecutor } from '../abstract-node-executor';
import { NodeExecutor } from '../node-executor';
import { View3DObject } from '../script/squishy/view3d/view3d-object';
import { View3DType, View3DTypes } from '../script/squishy/view3d/view3d-type';
import { View3DExecutionData } from './view3d.execution-data';

export class View3DNodeExecutor extends AbstractNodeExecutor {

    private available3DViewTypes: Set<View3DType> | undefined

    constructor(execution: Execution, nodeData: NodeData, executionData: View3DExecutionData) {
        super(execution, nodeData, executionData)
    }

    private loadAvailable3DViewTypes(): Set<View3DType> {
        const set: Set<View3DType> = new Set<View3DType>();

        View3DTypes.forEach((type: View3DType) => {
            set.add(type)
        })

        return set
    }

    protected async internalExecute(): Promise<void> {
        // load the available 3d object types
        this.available3DViewTypes = this.loadAvailable3DViewTypes()

        // set result as empty
        this.result = []

        // get all dependent node executors
        const dependencies: NodeExecutor[] = await this.getDependentNodeExecutors()
        // check if same dependencies exists
        if (!dependencies || dependencies.length < 1) {
            return
        }

        // get the first node executor
        const nodeExecutor: NodeExecutor = dependencies[0]

        // check if the node executor is executed
        if (!nodeExecutor.isExecuted()) {
            throw new Error(`dependent node executor [ ${nodeExecutor.id()} ] for node [ ${this.id()} ] are not executed`)
        }

        // get the result from connected node executor
        const result: View3DObject[] = nodeExecutor.getResult()

        // check if a result given
        if (Utils.isNullOrUndefined(result) || !result) {
            return
        }

        // check if an array was given
        if (!Array.isArray(result)) {
            throw new Error(`view3d only accepts an array of 3d objects`)
        }

        // only pass 3d objects
        this.result = result.filter((object: View3DObject) => {
            return this.isView3DType(object)
        })
    }

    private isView3DType(object: View3DObject): boolean {
        // check if the object valid
        if (Utils.isNullOrUndefined(object) || Utils.isNullOrUndefined(object.type)) {
            return false
        }
        // check if the object type valid
        return this.available3DViewTypes.has(object.type)
    }

    hasOutput(): boolean {
        return true
    }

}