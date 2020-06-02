import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsServiceModule } from '../../../projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../graph/service/project-graph-service.module';
import { ProjectPropertiesComponent } from './project-properties.component';

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
        ProjectsServiceModule,
        ProjectGraphServiceModule

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