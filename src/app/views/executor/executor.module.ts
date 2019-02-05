import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { TaskExecutionModule } from '../../services/execution/task-execution.module';
import { ExecutorComponent } from './executor.component';
import { ExecutorServiceModule } from './service/executor-service.module';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        // primeng
        BlockUIModule,
        ProgressSpinnerModule,
        // custom
        TaskExecutionModule,
        ExecutorServiceModule
    ],
    declarations: [
        ExecutorComponent
    ],
    exports: [
        ExecutorComponent
    ]
})
export class ExecutorModule {

}