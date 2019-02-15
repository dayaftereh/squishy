import { NgModule } from '@angular/core';
import { ExecutionsServiceModule } from './executions/executions-service.module';

@NgModule({
    providers: [
        ExecutionsServiceModule
    ],
    exports: [
        ExecutionsServiceModule
    ]
})
export class ServicesModule {

}