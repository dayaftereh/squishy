import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/primeng';
import { TaskListServiceModule } from '../../../service/task-list-service.module';
import { OutputTaskInputComponent } from './output-task-input.component';

@NgModule({
    imports: [
        //angular
        FormsModule,
        BrowserModule,
        // primeng
        DropdownModule,
        // custom
        TaskListServiceModule
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