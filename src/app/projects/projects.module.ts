import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectsServiceModule } from './service/projects-service.module';
import { ProjectsComponent } from './projects.component';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        // Angular
        RouterModule,
        BrowserModule,
        // PrimeNG
        ButtonModule,
        ListboxModule,
        // Custom
        ProjectsServiceModule
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