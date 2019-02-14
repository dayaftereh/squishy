import { ScriptTask } from '../../../../core/exectuion/task/script/script-task';
import { ScriptParameterPair } from './script-parameter-pair';

export class ScriptTaskContainer {

    private readonly task: ScriptTask;

    constructor(task: ScriptTask) {
        this.task = task;
    }

    execute<T>(parameters: ScriptParameterPair<any>[]): T {
        return this.execute0(parameters);
    }

    private execute0<T>(parameters: ScriptParameterPair<any>[]): T {
        const func: Function = this.createFunction(parameters);
        const result: T = this.executeFunction(parameters, func);
        return result;
    }

    private createFunction(parameters: ScriptParameterPair<any>[]): Function {
        const parameterNames: string[] = parameters.map((param: ScriptParameterPair<any>) => param.name);
        try {
            const func: Function = new Function(...parameterNames, this.task.script);
            return func;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    private executeFunction<T>(parameters: ScriptParameterPair<any>[], func: Function): T {
        const parameterValues: any[] = parameters.map((param: ScriptParameterPair<any>) => param.value);
        try {
            const result: T = func(...parameterValues);
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}