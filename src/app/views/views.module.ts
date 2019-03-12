import { NgModule } from '@angular/core';
import { ExecutionModule } from './execution/execution.module';
import { TasksModule } from './execution/tasks/tasks.module';
import { ExecutionsModule } from './executions/executions.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
    imports: [
        // custom
        TasksModule,
        LayoutModule,
        ExecutionModule,
        ExecutionsModule
    ],
    exports: [
        LayoutModule
    ]
})
export class ViewsModule {

}