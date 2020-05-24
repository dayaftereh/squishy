import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsServiceModule } from '../../../projects-service/projects-service.module';
import { ProjectPropertiesComponent } from './project-properties.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // primeng
        InputTextModule,
        // ngx-translate,
        TranslateModule,
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