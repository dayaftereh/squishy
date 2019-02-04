import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/primeng';
import { I18nModule } from '../../../../i18n/i18n.module';
import { TaskListServiceModule } from '../../service/task-list-service.module';
import { ScriptTaskComponent } from './script-task.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        ReactiveFormsModule,
        //i18n
        I18nModule,
        //primeng
        PanelModule,
        TaskListServiceModule,
        InputTextareaModule
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