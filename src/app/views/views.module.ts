import { NgModule } from '@angular/core';
import { ExecutionModule } from './execution/execution.module';
import { TasksModule } from './execution/tasks/tasks.module';
import { ExecutionsModule } from './executions/executions.module';
import { ExecutorModule } from './executor/executor.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
    imports: [
        // custom
        TasksModule,
        LayoutModule,
        ExecutionModule,
        ExecutionsModule,
        ExecutorModule
    ],
    exports: [
        LayoutModule,
        ExecutorModule
    ]
})
export class ViewsModule {

}