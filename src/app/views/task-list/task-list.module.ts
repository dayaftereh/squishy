import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskListComponent } from './task-list.component';

@NgModule({
    imports: [
        // angular,
        BrowserModule
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