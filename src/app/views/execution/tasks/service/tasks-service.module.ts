import { NgModule } from '@angular/core';
import { ExecutionsServiceModule } from '../../../../services/executions/executions-service.module';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [
        ExecutionsServiceModule
    ],
    providers: [
        TasksService
    ],
    exports: [
        ExecutionsServiceModule
    ]
})
export class TasksServiceModule {

}