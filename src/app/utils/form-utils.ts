import { AbstractControl, FormGroup } from '@angular/forms'
import { Utils } from './utils'

export class FormUtils {

    constructor() {

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

        if (Utils.isNullOrUndefined(emitEvent)) {
            emitEvent = false
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

}