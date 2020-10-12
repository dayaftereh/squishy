import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ErrorManagerServiceModule } from 'src/app/error-manager/service/error-manager-service.module';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectsManagerUploadComponent } from './projects-manager-upload.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        HttpClientModule,
        // PrimeNG
        ButtonModule,
        FileUploadModule,
        // ngx-translate,
        TranslateModule,
        // Custom
        ProjectsServiceModule,
        ErrorManagerServiceModule,
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