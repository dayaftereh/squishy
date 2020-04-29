import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NewProjectComponent } from './new-project.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsServiceModule } from '../service/projects-service.module';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        ReactiveFormsModule,
        // primeng
        InputTextModule,
        // custom
        ProjectsServiceModule
    ],
    declarations: [
        NewProjectComponent
    ],
    exports: [
        NewProjectComponent
    ]
})
export class NewProjectModule {

}