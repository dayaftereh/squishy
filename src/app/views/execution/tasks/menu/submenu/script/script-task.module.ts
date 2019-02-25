import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextareaModule } from 'primeng/primeng';
import { TasksServiceModule } from '../../../service/tasks-service.module';
import { CommonTaskModule } from '../common/common-task.module';
import { ScriptTaskInputModule } from './input/script-task-input.module';
import { ScriptTaskComponent } from './script-task.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        ReactiveFormsModule,
        //primeng
        InputTextareaModule,
        //custom
        CommonTaskModule,
        TasksServiceModule,
        ScriptTaskInputModule
    ],
    declarations: [
        ScriptTaskComponent
    ],
    exports: [
        ScriptTaskComponent
    ]
})
export class ScriptTaskModule {

}