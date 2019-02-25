import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule, FileUploadModule } from 'primeng/primeng';
import { ImportDialogComponent } from './import-dialog.component';
import { ImportDialogServiceModule } from './service/import-dialog-service.module';

@NgModule({
    imports: [
        //angular
        BrowserModule,
        //primeng
        DialogModule,
        FileUploadModule,
        //custom
        ImportDialogServiceModule
    ],
    declarations: [
        ImportDialogComponent
    ],
    exports: [
        ImportDialogComponent
    ]
})
export class ImportDialogModule {

}