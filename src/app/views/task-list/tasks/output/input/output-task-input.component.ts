import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dropdown, SelectItem } from 'primeng/primeng';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../../../../../core/exectuion/task/task';
import { TaskListService } from '../../../service/task-list.service';

@Component({
    selector: 'app-output-task-input',
    templateUrl: './output-task-input.component.html',
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OutputTaskInputComponent)
        }
    ]
})
export class OutputTaskInputComponent implements ControlValueAccessor, OnInit {

    value: string | undefined;

    items: Observable<SelectItem[]> | undefined;

    @ViewChild('dropdown')
    dropdown: Dropdown;

    private onModelChange: (id: string | undefined) => void;

    private onModelTouched: (id: string | undefined) => void;

    constructor(private readonly taskListService: TaskListService) {

    }

    ngOnInit(): void {
        this.items = of([]);
        this.items = this.taskListService.tasks().pipe(
            map((tasks: Task[]) => {
                if (!this.value) {
                    return tasks;
                }
                return tasks.filter((task: Task) => {
                    return task.id !== this.value;
                });
            }),
            map((tasks: Task[]) => {
                return tasks.map((task: Task) => {
                    return {
                        label: task.name,
                        value: task.id
                    } as SelectItem;
                });
            })
        );
    }

    onInputChanged(): void {
        if (this.value) {
            this.emit(this.value);
        } else {
            this.emit(undefined);
        }
    }

    private emit(id: string | undefined): void {
        if (this.onModelChange) {
            this.onModelChange(id);
        }
        if (this.onModelTouched) {
            this.onModelTouched(id);
        }
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (this.dropdown) {
            this.dropdown.setDisabledState(isDisabled);
        }
    }

    writeValue(value: string | undefined): void {
        this.value = value;
    }

}
