import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/primeng';
import { I18nModule } from '../../../../../i18n/i18n.module';
import { TasksServiceModule } from '../../../service/tasks-service.module';
import { CommonTaskModule } from '../common/common-task.module';
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
        CommonTaskModule,
        TasksServiceModule,
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