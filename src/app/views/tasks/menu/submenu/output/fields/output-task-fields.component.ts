import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OutputTaskFields } from '../../../../../../../core/exectuion/task/output/output-task-fields';

interface KeyValuePair {
    key: string;
    value: number
}

@Component({
    selector: 'app-output-task-fields',
    templateUrl: './output-task-fields.component.html',
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OutputTaskFieldsComponent)
        }
    ]
})
export class OutputTaskFieldsComponent implements ControlValueAccessor {

    disabled: boolean;

    pairs: KeyValuePair[];

    private onModelChange: (fields: OutputTaskFields) => void;

    private onModelTouched: (fields: OutputTaskFields) => void;

    constructor() {
        this.pairs = [];
        this.disabled = false;
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

    writeValue(obj: any): void {
        this.loadOutputTaskFields(obj);
    }

    emitChanged(): void {
        const fields: OutputTaskFields = this.createOutputTaskFields();
        if (this.onModelChange) {
            this.onModelChange(fields);
        }
        if (this.onModelTouched) {
            this.onModelTouched(fields);
        }
    }

    addField(): void {
        this.pairs.push({} as KeyValuePair);
    }

    removeField(index: number): void {
        this.pairs.splice(index, 1);
    }

    private createOutputTaskFields(): OutputTaskFields {
        const fields: OutputTaskFields = {};
        this.pairs.forEach((pair: KeyValuePair) => {
            fields[pair.key] = pair.value;
        });
        return fields;
    }

    private loadOutputTaskFields(fields: OutputTaskFields | undefined): void {
        if (!fields) {
            this.pairs = [];
            return;
        }

        const keys: string [] = Object.keys(fields);
        this.pairs = keys.map((key: string) => {
            const value: number = fields[key];
            return {
                key,
                value
            } as KeyValuePair;
        });

        this.emitChanged();
    }


}