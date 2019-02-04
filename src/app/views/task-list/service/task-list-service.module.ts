import { NgModule } from '@angular/core';
import { ServicesModule } from '../../../services/services.module';
import { TaskListService } from './task-list.service';

@NgModule({
    imports: [
        //custom
        ServicesModule
    ],
    providers: [
        TaskListService
    ]
})
export class TaskListServiceModule {

}