import { Chance } from 'chance';
import * as moment from 'moment';
import { ScriptExecuteContext } from './script-execute-context';

export namespace ScriptExecuteContextFactory {

    export function create(): ScriptExecuteContext {
        const chance = new Chance();

        const context: ScriptExecuteContext = {
            params: {},
            addons: {
                moment,
                chance
            }
        };

        return context;
    }

}