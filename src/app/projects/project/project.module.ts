import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphModule } from './graph/graph.module';
import { ProjectMenuModule } from './menu/project-menu.module';
import { ProjectComponent } from './project.component';
import { ProjectPropertiesModule } from './properties/project-properties.module';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        GraphModule,
        ProjectMenuModule,
        ProjectsServiceModule,
        ProjectPropertiesModule
    ],
    declarations: [
        ProjectComponent
    ],
    exports: [
        ProjectComponent
    ]
})
export class ProjectModule { }