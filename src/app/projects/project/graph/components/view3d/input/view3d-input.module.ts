import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../../../service/project-graph-service.module';
import { View3DInputComponent } from './view3d-input.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        ColorPickerModule,
        SelectButtonModule,
        // Custom
        ProjectsServiceModule,
        ProjectGraphServiceModule,
    ],
    declarations: [
        View3DInputComponent
    ],
    exports: [
        View3DInputComponent
    ]
})
export class View3DInputModule {

}