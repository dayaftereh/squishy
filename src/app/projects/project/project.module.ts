import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { GraphModule } from './graph/graph.module';
import { ProjectMenuModule } from './menu/project-menu.module';
import { ProjectComponent } from './project.component';
import { ProjectPropertiesModule } from './properties/project-properties.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // ngx-translate,
        TranslateModule,
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