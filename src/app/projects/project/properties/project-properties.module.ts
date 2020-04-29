import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsServiceModule } from '../../service/projects-service.module';
import { ProjectPropertiesComponent } from './project-properties.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // primeng
        InputTextModule,
        // custom
        ProjectsServiceModule
    ],
    declarations: [
        ProjectPropertiesComponent
    ],
    exports: [
        ProjectPropertiesComponent
    ]
})
export class ProjectPropertiesModule {

}