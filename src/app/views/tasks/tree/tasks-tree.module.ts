import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrganizationChartModule } from 'primeng/primeng';
import { TasksServiceModule } from '../service/tasks-service.module';
import { TasksTreeComponent } from './tasks-tree.component';
import { TasksTreesComponent } from './tasks-trees.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        //primeng
        OrganizationChartModule,
        //custom
        TasksServiceModule
    ],
    declarations: [
        TasksTreeComponent,
        TasksTreesComponent
    ],
    exports: [
        TasksTreeComponent,
        TasksTreesComponent
    ]
})
export class TasksTreeModule {

}