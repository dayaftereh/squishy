import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { NewProjectComponent } from './new-project.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        // angular
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
        NewProjectComponent
    ],
    exports: [
        NewProjectComponent
    ]
})
export class NewProjectModule {

}