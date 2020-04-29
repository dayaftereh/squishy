import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { PropertiesDialogServiceModule } from '../properties-dialog/service/properties-dialog-service.module';
import { NewProjectModule } from './new-project/new-project.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsServiceModule } from './service/projects-service.module';
import { ProjectsUploadModule } from './upload/projects-upload.module';

@NgModule({
    imports: [
        // Angular
        RouterModule,
        BrowserModule,
        // PrimeNG
        ButtonModule,
        ListboxModule,
        // Custom
        NewProjectModule,
        ProjectsUploadModule,
        ProjectsServiceModule,
        PropertiesDialogServiceModule,
    ],
    declarations: [
        ProjectsComponent
    ],
    exports: [
        ProjectsComponent
    ]
})
export class ProjectsModule {

}