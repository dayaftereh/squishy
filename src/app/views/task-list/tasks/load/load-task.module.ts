import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/primeng';
import { I18nModule } from '../../../../i18n/i18n.module';
import { TaskListServiceModule } from '../../service/task-list-service.module';
import { LoadTaskFieldsModule } from './fields/load-task-fields.module';
import { LoadTaskComponent } from './load-task.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        ReactiveFormsModule,
        //i18n
        I18nModule,
        //primeng
        PanelModule,
        FileUploadModule,
        //custom
        TaskListServiceModule,
        LoadTaskFieldsModule
    ],
    declarations: [
        LoadTaskComponent
    ],
    exports: [
        LoadTaskComponent
    ]
})
export class LoadTaskModule {

}