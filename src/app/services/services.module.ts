import { NgModule } from '@angular/core';
import { TabsServiceModule } from './tabs/tabs-service.module';
import { TasksServiceModule } from './task/tasks-service.module';

@NgModule({
    providers: [
        TabsServiceModule,
        TasksServiceModule
    ],
    exports:[
        TabsServiceModule,
        TasksServiceModule
    ]
})
export class ServicesModule {

}