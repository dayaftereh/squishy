import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { LoadTaskModule } from './load/load-task.module';
import { OutputTaskModule } from './output/output-task.module';
import { ScriptTaskModule } from './script/script-task.module';
import { TaskPanelComponent } from './task-panel.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        // primeng
        PanelModule,
        ButtonModule,
        // custom
        LoadTaskModule,
        ScriptTaskModule,
        OutputTaskModule
    ],
    exports: [
        LoadTaskModule,
        ScriptTaskModule,
        TaskPanelComponent
    ],
    declarations: [
        TaskPanelComponent
    ]
})
export class TasksModule {

}