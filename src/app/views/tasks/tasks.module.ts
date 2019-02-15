import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/primeng';
import { TasksMenuModule } from './menu/tasks-menu.module';
import { TasksServiceModule } from './service/tasks-service.module';
import { TasksComponent } from './tasks.component';
import { TasksTreeModule } from './tree/tasks-tree.module';

@NgModule({
    imports: [
        //angular
        FormsModule,
        BrowserModule,
        //primeng
        ButtonModule,
        DropdownModule,
        // custom
        TasksMenuModule,
        TasksTreeModule,
        TasksServiceModule
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