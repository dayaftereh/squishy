import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../../../service/project-graph-service.module';
import { ChartPropertiesComponent } from './chart-properties.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        CheckboxModule,
        InputTextModule,
        SelectButtonModule,
        // Custom
        ProjectsServiceModule,
        ProjectGraphServiceModule,
    ],
    declarations: [
        ChartPropertiesComponent
    ],
    exports: [
        ChartPropertiesComponent
    ]
})
export class ChartPropertiesModule {

}