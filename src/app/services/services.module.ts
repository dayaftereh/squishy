import { NgModule } from '@angular/core';
import { TaskExecutionModule } from './execution/task-execution.module';
import { TabsServiceModule } from './tabs/tabs-service.module';
import { TasksServiceModule } from './task/tasks-service.module';

@NgModule({
    providers: [
        TabsServiceModule,
        TasksServiceModule,
        TaskExecutionModule
    ],
    exports: [
        TabsServiceModule,
        TasksServiceModule,
        TaskExecutionModule
    ]
})
export class ServicesModule {

}