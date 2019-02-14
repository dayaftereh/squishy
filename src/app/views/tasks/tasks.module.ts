import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TasksMenuModule } from './menu/tasks-menu.module';
import { TasksComponent } from './tasks.component';
import { TasksTreeModule } from './tree/tasks-tree.module';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        // custom
        TasksMenuModule,
        TasksTreeModule
    ],
    declarations: [
        TasksComponent
    ],
    exports: [
        TasksComponent
    ]
})
export class TasksModule {

}