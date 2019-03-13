import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageModule, OrganizationChartModule, ProgressSpinnerModule } from 'primeng/primeng';
import { ExecutionStatusTreeComponent } from './execution-status-tree.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        //primeng
        MessageModule,
        ProgressSpinnerModule,
        OrganizationChartModule
    ],
    declarations: [
        ExecutionStatusTreeComponent
    ],
    exports: [
        ExecutionStatusTreeComponent
    ]
})
export class ExecutionStatusTreeModule {

}