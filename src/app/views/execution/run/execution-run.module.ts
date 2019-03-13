import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ExecutionRunComponent } from './execution-run.component';
import { ExecutionRunServiceModule } from './service/execution-run-service.module';
import { ExecutionStatusTreeModule } from './status/execution-status-tree.module';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        // primeng
        ButtonModule,
        //custom
        ExecutionRunServiceModule,
        ExecutionStatusTreeModule
    ],
    declarations: [
        ExecutionRunComponent
    ]
})
export class ExecutionRunModule {

}