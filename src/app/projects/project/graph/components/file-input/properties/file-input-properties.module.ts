import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../../../service/project-graph-service.module';
import { FileInputPropertiesComponent } from './file-input-properties.component';

@NgModule({
    imports: [
        // Angular
        RouterModule,
        BrowserModule,
        ReactiveFormsModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        SelectButtonModule,
        AutoCompleteModule,
        // custom
        ProjectsServiceModule,
        ProjectGraphServiceModule,
    ],
    declarations: [
        FileInputPropertiesComponent
    ],
    exports: [
        FileInputPropertiesComponent
    ]
})
export class FileInputPropertiesModule {

}