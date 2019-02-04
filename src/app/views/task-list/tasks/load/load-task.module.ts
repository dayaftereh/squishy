import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/primeng';
import { I18nModule } from '../../../../i18n/i18n.module';
import { LoadTaskComponent } from './load-task.component';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        //i18n
        I18nModule,
        //primeng
        PanelModule,
        FileUploadModule
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