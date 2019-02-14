import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/primeng';
import { TaskListServiceModule } from '../../service/task-list-service.module';
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
        // custom
        TaskListServiceModule,
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