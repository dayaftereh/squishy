import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageModule, OrganizationChartModule } from 'primeng/primeng';
import { ExecutionStatusTreeComponent } from './execution-status-tree.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        //primeng
        MessageModule,
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