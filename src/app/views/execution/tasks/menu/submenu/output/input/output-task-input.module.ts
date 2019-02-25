import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/primeng';
import { TasksServiceModule } from '../../../../service/tasks-service.module';
import { OutputTaskInputComponent } from './output-task-input.component';

@NgModule({
    imports: [
        //angular
        FormsModule,
        BrowserModule,
        // primeng
        DropdownModule,
        // custom
        TasksServiceModule
    ],
    declarations: [
        OutputTaskInputComponent
    ],
    exports: [
        OutputTaskInputComponent
    ]
})
export class OutputTaskInputModule {

}