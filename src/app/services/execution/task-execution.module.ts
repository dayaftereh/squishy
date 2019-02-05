import { NgModule } from '@angular/core';
import { TaskExecutorService } from './task-executor.service';

@NgModule({
    providers: [
        TaskExecutorService
    ]
})
export class TaskExecutionModule {

}