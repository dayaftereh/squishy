import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LoadTaskFields } from '../../../../../../core/exectuion/task/load/load-task-fields';

interface KeyValuePair {
    key: number;
    value: string
}

@Component({
    selector: 'app-load-task-fields',
    templateUrl: './load-task-fields.component.html',
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LoadTaskFieldsComponent)
        }
    ]
})
export class LoadTaskFieldsComponent implements ControlValueAccessor {

    disabled: boolean;

    pairs: KeyValuePair[];

    private onModelChange: (fields: LoadTaskFields) => void;

    private onModelTouched: (fields: LoadTaskFields) => void;

    constructor() {
        this.pairs = [];
        this.disabled = false;
    }

    emitChanged(): void {
        const fields: LoadTaskFields = this.createTaskFields();
        if (this.onModelChange) {
            this.onModelChange(fields);
        }
        if (this.onModelTouched) {
            this.onModelTouched(fields);
        }
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: LoadTaskFields): void {
        this.loadTaskFields(obj);
    }

    addField(): void {
        this.pairs.push({} as KeyValuePair);
    }

    removeField(index: number): void {
        this.pairs.splice(index, 1);
    }

    private createTaskFields(): LoadTaskFields {
        const fields: LoadTaskFields = {};
        this.pairs.forEach((pair: KeyValuePair) => {
            fields[pair.key] = pair.value;
        });
        return fields;
    }

    private loadTaskFields(fields: LoadTaskFields | undefined): void {
        if (!fields) {
            this.pairs = [];
            return;
        }

        const keys: string [] = Object.keys(fields);
        this.pairs = keys.map((key: string) => {
            const index: number = Number(key);
            return {
                key: index,
                value: fields[index]
            } as KeyValuePair;
        });

        this.emitChanged();
    }

}
