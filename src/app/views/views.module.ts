import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { TabsModule } from './tabs/tabs.module';
import { TaskListModule } from './task-list/task-list.module';

@NgModule({
    imports: [
        // custom
        TabsModule,
        LayoutModule,
        TaskListModule
    ],
    exports: [
        TabsModule,
        LayoutModule,
        TaskListModule
    ]
})
export class ViewsModule {

}