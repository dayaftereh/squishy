import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ServicesModule } from '../../services/services.module';
import { ExecutionComponent } from './execution.component';
import { ExecutionRunModule } from './run/execution-run.module';
import { ExecutionSettingsModule } from './settings/execution-settings.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
    imports: [
        //angular
        RouterModule,
        BrowserModule,
        //primeng
        ButtonModule,
        // custom
        TasksModule,
        ServicesModule,
        ExecutionRunModule,
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