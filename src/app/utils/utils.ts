import * as uuid from 'uuid';

export class Utils {

    private constructor() {

    }

    static uuid(): string {
        return uuid.v4()
    }

    static isNullOrUndefined<T>(x: T): boolean {
        return x === null || x === undefined;
    }

    static isEmpty<T>(array: T[] | undefined): boolean {
        if (Utils.isNullOrUndefined(array)) {
            return true
        }
        return !array || array.length < 1
    }
    
}