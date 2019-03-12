import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExecutorServiceModule } from '../../../services/executor/executor-service.module';
import { ExecutionRunComponent } from './execution-run.component';
import { ExecutionStatusTreeModule } from './status/execution-status-tree.module';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        //custom
        ExecutorServiceModule,
        ExecutionStatusTreeModule
    ],
    declarations: [
        ExecutionRunComponent
    ]
})
export class ExecutionRunModule {

}