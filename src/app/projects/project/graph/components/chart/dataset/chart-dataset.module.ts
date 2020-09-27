import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../../../service/project-graph-service.module';
import { ChartDatasetComponent } from './chart-dataset.component';

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
        ColorPickerModule,
        // Custom
        ProjectsServiceModule,
        ProjectGraphServiceModule,
    ],
    declarations: [
        ChartDatasetComponent
    ],
    exports: [
        ChartDatasetComponent
    ]
})
export class ChartDatasetModule {

}