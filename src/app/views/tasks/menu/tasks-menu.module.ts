import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TasksMenuComponent } from './tasks-menu.component';

@NgModule({
    imports: [
        //angular
        BrowserModule
    ],
    declarations: [
        TasksMenuComponent
    ],
    exports: [
        TasksMenuComponent
    ]
})
export class TasksMenuModule {

}