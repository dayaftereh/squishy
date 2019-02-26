import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ExecutionComponent } from './execution.component';
import { ExecutionSettingsModule } from './settings/execution-settings.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        //primeng
        ButtonModule,
        // custom
        TasksModule,
        ExecutionSettingsModule
    ],
    declarations: [
        ExecutionComponent
    ],
    exports: [
        ExecutionComponent
    ]
})
export class ExecutionModule {

}