import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/mode/javascript/javascript';
import { TasksServiceModule } from '../../../service/tasks-service.module';
import { CommonTaskModule } from '../common/common-task.module';
import { ScriptTaskInputModule } from './input/script-task-input.module';
import { ScriptTaskComponent } from './script-task.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        ReactiveFormsModule,
        //ngx-codemirror
        CodemirrorModule,
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