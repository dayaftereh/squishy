import { NgModule } from '@angular/core';
import { ExecutorModule } from './executor/executor.module';
import { LayoutModule } from './layout/layout.module';
import { TabsModule } from './tabs/tabs.module';
import { TaskListModule } from './task-list/task-list.module';

@NgModule({
    imports: [
        // custom
        TabsModule,
        LayoutModule,
        TaskListModule,
        ExecutorModule
    ],
    exports: [
        TabsModule,
        LayoutModule,
        TaskListModule,
        ExecutorModule
    ]
})
export class ViewsModule {

}