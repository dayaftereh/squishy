import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScriptTaskInput } from '../../../../../../../../core/exectuion/task/script/script-task-input';
import { Task } from '../../../../../../../../core/exectuion/task/task';
import { TaskId } from '../../../../../../../../core/exectuion/task/task-id';
import { TaskType } from '../../../../../../../../core/exectuion/task/task-type';
import { TasksService } from '../../../../service/tasks.service';

interface Name2TaskPair {
    name: string;
    task: TaskId;
}

@Component({
    selector: 'app-script-task-input',
    templateUrl: './script-task-input.component.html',
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ScriptTaskInputComponent)
        }
    ]
})
export class ScriptTaskInputComponent implements OnInit, ControlValueAccessor {

    disabled: boolean;

    pairs: Name2TaskPair[];

    tasks: Observable<SelectItem[]>;

    private onModelChange: (input: ScriptTaskInput) => void;

    private onModelTouched: (input: ScriptTaskInput) => void;

    constructor(private readonly tasksService: TasksService) {
    }

    ngOnInit(): void {
        this.tasks = this.tasksService.tasks().pipe(
            map((tasks: Task[]) => {
                return tasks.filter((task: Task) => {
                    return task.type !== TaskType.OUTPUT;
                });
            }),
            map((tasks: Task[]) => {
                return tasks.map((task: Task) => {
                    return {
                        label: task.name,
                        value: task.id
                    };
                });
            })
        );
    }

    emitValueChanged(): void {
        const input: ScriptTaskInput = this.createInput();
        if (this.onModelChange) {
            this.onModelChange(input);
        }
        if (this.onModelTouched) {
            this.onModelTouched(input);
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

    writeValue(obj: any): void {
        this.pairs = this.createPairs(obj);
    }

    add(): void {
        this.pairs.push({} as Name2TaskPair);
        this.emitValueChanged();
    }

    remove(index: number): void {
        this.pairs.splice(index, 1);
        this.emitValueChanged();
    }

    private createPairs(input: ScriptTaskInput | undefined): Name2TaskPair[] {
        if (!input) {
            return [];
        }

        const keys: string[] = Object.keys(input);
        return keys.map((key: string) => {
            const taskId: TaskId = input[key];
            return {
                name: key,
                task: taskId
            } as Name2TaskPair;
        });
    }

    private createInput(): ScriptTaskInput {
        const input: ScriptTaskInput = {};
        if (!this.pairs || this.pairs.length < 1) {
            return input;
        }

        this.pairs.forEach((pair: Name2TaskPair) => {
            let name: string = pair.name;
            if (!name) {
                name = this.nextDefaultName(input);
                pair.name = name;
            }
            input[name] = pair.task;
        });

        return input;
    }

    private nextDefaultName(input: ScriptTaskInput): string {
        let index: number = 1;
        while (true) {
            const name: string = `input${index}`;
            if (!input.hasOwnProperty(name)) {
                return name;
            }
            index = index + 1;
        }
    }

}