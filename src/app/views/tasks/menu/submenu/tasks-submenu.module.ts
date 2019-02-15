import { NgModule } from '@angular/core';
import { LoadTaskModule } from './load/load-task.module';
import { OutputTaskModule } from './output/output-task.module';
import { ScriptTaskModule } from './script/script-task.module';

@NgModule({
    imports: [
        // custom
        LoadTaskModule,
        OutputTaskModule,
        ScriptTaskModule
    ],
    exports: [
        LoadTaskModule,
        OutputTaskModule,
        ScriptTaskModule
    ]
})
export class TasksSubmenuModule {

}