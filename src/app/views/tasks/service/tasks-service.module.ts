import { NgModule } from '@angular/core';
import { TasksService } from './tasks.service';

@NgModule({
    providers: [
        TasksService
    ]
})
export class TasksServiceModule {

}