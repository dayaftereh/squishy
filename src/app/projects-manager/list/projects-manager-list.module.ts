import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { NewProjectModule } from '../new-project/new-project.module';
import { ProjectsManagerListComponent } from './projects-manager-list.component';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        RouterModule,
        BrowserModule,
        // PrimeNG
        ButtonModule,
        ListboxModule,
        // ngx-translate,
        TranslateModule,
        // Custom
        NewProjectModule,
        ProjectsServiceModule,
        PropertiesDialogServiceModule,
    ],
    declarations: [
        ProjectsManagerListComponent
    ],
    exports: [
        ProjectsManagerListComponent
    ]
})
export class ProjectsManagerListModule {

}