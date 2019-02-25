import { NgModule } from '@angular/core';
import { ExecutionsModule } from './executions/executions.module';
import { ExecutorModule } from './executor/executor.module';
import { LayoutModule } from './layout/layout.module';
import { TasksModule } from './execution/tasks/tasks.module';


@NgModule({
    imports: [
        // custom
        TasksModule,
        LayoutModule,
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