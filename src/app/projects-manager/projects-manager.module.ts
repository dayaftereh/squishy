import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectsManagerComponent } from './projects-manager.component';
import { ProjectsManagerListModule } from './list/projects-manager-list.module';
import { ProjectsManagerUploadModule } from './upload/projects-manager-upload.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        ProjectsManagerListModule,
        ProjectsManagerUploadModule
    ],
    declarations: [
        ProjectsManagerComponent
    ],
    exports: [
        ProjectsManagerComponent
    ]
})
export class ProjectsManagerModule {

}