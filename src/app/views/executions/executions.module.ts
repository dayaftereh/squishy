import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, TabMenuModule } from 'primeng/primeng';
import { ExecutionsServiceModule } from '../../services/executions/executions-service.module';
import { ExecutionsComponent } from './executions.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        // primeng
        ButtonModule,
        TabMenuModule,
        // custom
        ExecutionsServiceModule
    ],
    declarations: [
        ExecutionsComponent
    ],
    exports: [
        ExecutionsComponent
    ]
})
export class ExecutionsModule {

}