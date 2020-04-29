import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';
import { ProjectsUploadComponent } from './projects-upload.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        HttpClientModule,
        // PrimeNG
        FileUploadModule
    ],
    declarations: [
        ProjectsUploadComponent
    ],
    exports: [
        ProjectsUploadComponent
    ],

})
export class ProjectsUploadModule {

}