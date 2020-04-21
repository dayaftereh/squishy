import * as uuid from 'uuid';
import { FormGroup, AbstractControl } from '@angular/forms';

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

    static getFormValue<T>(formGroup: FormGroup | undefined, name: string, defaultValue: T): T {
        if (Utils.isNullOrUndefined(formGroup)) {
            return defaultValue
        }
        const formControl: AbstractControl | null = formGroup.get(name)
        if (Utils.isNullOrUndefined(formControl)) {
            return defaultValue
        }

        const value: T | null = formControl.value
        if (Utils.isNullOrUndefined(value)) {
            return defaultValue
        }

        return value as T
    }

}