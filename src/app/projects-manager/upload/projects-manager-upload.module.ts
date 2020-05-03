import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectsManagerUploadComponent } from './projects-manager-upload.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        HttpClientModule,
        // PrimeNG
        FileUploadModule,
        // Custom
        ProjectsServiceModule
    ],
    declarations: [
        ProjectsManagerUploadComponent
    ],
    exports: [
        ProjectsManagerUploadComponent
    ],

})
export class ProjectsManagerUploadModule {

}