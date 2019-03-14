import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule, SelectButtonModule } from 'primeng/primeng';
import { TasksServiceModule } from '../../../service/tasks-service.module';
import { CommonTaskModule } from '../common/common-task.module';
import { OutputTaskFieldsModule } from './fields/output-task-fields.module';
import { OutputTaskInputModule } from './input/output-task-input.module';
import { OutputTaskComponent } from './output-task.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        ReactiveFormsModule,
        // primeng
        InputTextModule,
        SelectButtonModule,
        // custom
        CommonTaskModule,
        TasksServiceModule,
        OutputTaskInputModule,
        OutputTaskFieldsModule
    ],
    declarations: [
        OutputTaskComponent
    ],
    exports: [
        OutputTaskComponent
    ]
})
export class OutputTaskModule {

}