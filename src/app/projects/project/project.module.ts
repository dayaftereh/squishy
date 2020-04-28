import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectComponent } from './project.component';
import { GraphModule } from './graph/graph.module';
import { ProjectsServiceModule } from '../service/projects-service.module';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        // Angular
        RouterModule,
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // Custom
        GraphModule,
        ProjectsServiceModule
    ],
    declarations: [
        ProjectComponent
    ],
    exports: [
        ProjectComponent
    ]
})
export class ProjectModule { }