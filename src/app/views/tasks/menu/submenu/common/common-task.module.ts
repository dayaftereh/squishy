import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, CheckboxModule, InputTextModule } from 'primeng/primeng';
import { TasksServiceModule } from '../../../service/tasks-service.module';
import { ScriptTaskInputModule } from '../script/input/script-task-input.module';
import { CommonTaskComponent } from './common-task.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        ReactiveFormsModule,
        //primeng
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        //custom
        TasksServiceModule,
        ScriptTaskInputModule
    ],
    declarations: [
        CommonTaskComponent
    ],
    exports: [
        CommonTaskComponent
    ]
})
export class CommonTaskModule {

}