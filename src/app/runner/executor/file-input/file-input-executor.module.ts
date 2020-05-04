import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { FileInputExecutorComponent } from './file-input-executor.component';
import { ExecutorServiceModule } from '../executor-service/executor-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
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