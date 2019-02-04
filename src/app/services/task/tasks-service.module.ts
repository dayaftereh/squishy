import { NgModule } from '@angular/core';
import { TabsServiceModule } from '../tabs/tabs-service.module';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [
        //custom
        TabsServiceModule
    ],
    providers: [
        TasksService
    ]
})
export class TasksServiceModule {

}