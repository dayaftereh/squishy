import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { ProjectsServiceModule } from '../../../projects-service/projects-service.module';
import { ProjectMenuComponent } from './project-menu.component';

@NgModule({
    imports: [
        // angular
        RouterModule,
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // Custom
        ProjectsServiceModule,
        PropertiesDialogServiceModule
    ],
    declarations: [
        ProjectMenuComponent
    ],
    exports: [
        ProjectMenuComponent
    ]
})
export class ProjectMenuModule {

}