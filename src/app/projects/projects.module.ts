import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectsManagerModule } from '../projects-manager/projects-manager.module';

@NgModule({
    imports: [
        // Angular
        RouterModule,
        BrowserModule,
        // Custom
        ProjectsManagerModule       
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