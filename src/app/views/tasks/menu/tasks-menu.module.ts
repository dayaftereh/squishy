import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { TasksSubmenuModule } from './submenu/tasks-submenu.module';
import { TasksMenuComponent } from './tasks-menu.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        // primeng
        PanelModule,
        //custom
        TasksSubmenuModule
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