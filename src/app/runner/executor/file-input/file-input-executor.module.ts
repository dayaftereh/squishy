import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ExecutorServiceModule } from '../../../executor-service/executor-service.module';
import { FileInputExecutorComponent } from './file-input-executor.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        CardModule,
        FileUploadModule,
        ExecutorServiceModule,
    ],
    declarations: [
        FileInputExecutorComponent
    ],
    exports: [
        FileInputExecutorComponent
    ]
})
export class FileInputExecutorModule {

}