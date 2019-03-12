import { NgModule } from '@angular/core';
import { ExecutionsServiceModule } from './executions/executions-service.module';
import { ExecutorServiceModule } from './executor/executor-service.module';

@NgModule({
    providers: [
        ExecutorServiceModule,
        ExecutionsServiceModule
    ],
    exports: [
        ExecutorServiceModule,
        ExecutionsServiceModule
    ]
})
export class ServicesModule {

}