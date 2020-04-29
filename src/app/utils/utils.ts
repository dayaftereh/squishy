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

    static setFromDisabled(formGroup: FormGroup | undefined, name: string, disabled: boolean, emitEvent?: boolean): void {
        if (Utils.isNullOrUndefined(formGroup)) {
            return
        }
        const formControl: AbstractControl | null = formGroup.get(name)
        if (Utils.isNullOrUndefined(formControl)) {
            return
        }

        if (disabled) {
            formControl.disable(
                {
                    emitEvent
                }
            )
        } else {
            formControl.enable(
                {
                    emitEvent
                }
            )
        }
    }

    static forEachProperty<T>(o: T, fn: (value: unknown, key: string) => void): void {
        const keys: string[] = Object.keys(o)
        keys.forEach((key: string) => {
            const value: unknown = o[key]
            fn(value, key)
        })
    }

    static mapProperties<T, R>(o: T, fn: (value: unknown, key: string) => R): R[] {
        const keys: string[] = Object.keys(o)
        return keys.map((key: string) => {
            const value: unknown = o[key]
            return fn(value, key)
        })
    }

    static async readFileAsText(file: File, encoding?: string): Promise<string> {
        var completed: boolean = false
        const fileReader: FileReader = new FileReader()
        return new Promise((resolve, reject) => {
            // if reader fails
            fileReader.onerror = (e) => {
                if (!completed) {
                    reject(e)
                }
                completed = true
            }

            // callback for done
            const done = () => {
                if (!completed) {
                    const content: string = fileReader.result as string
                    resolve(content)
                }
                completed = true
            }

            fileReader.onload = done
            fileReader.onloadend = done

            // read the file as text
            fileReader.readAsText(file, encoding)
        })
    }

}