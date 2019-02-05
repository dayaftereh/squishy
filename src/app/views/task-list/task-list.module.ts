import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/primeng';
import { ExecutorModule } from '../executor/executor.module';
import { ExecutorServiceModule } from '../executor/service/executor-service.module';
import { TaskListServiceModule } from './service/task-list-service.module';
import { TaskListComponent } from './task-list.component';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
    imports: [
        // angular,
        FormsModule,
        BrowserModule,
        //primeng
        ButtonModule,
        DropdownModule,
        // custom
        TasksModule,
        ExecutorServiceModule,
        TaskListServiceModule
    ],
    declarations: [
        TaskListComponent
    ],
    exports: [
        TaskListComponent
    ]
})
export class TaskListModule {

}