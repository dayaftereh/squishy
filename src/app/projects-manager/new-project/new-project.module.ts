import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { NewProjectComponent } from './new-project.component';

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