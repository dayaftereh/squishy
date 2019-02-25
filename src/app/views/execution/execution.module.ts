import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ExecutionComponent } from './execution.component';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        //primeng
        ButtonModule,
        // custom
        TasksModule
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