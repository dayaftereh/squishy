import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from 'src/app/editor/editor.module';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../../../service/project-graph-service.module';
import { TextInputEditorComponent } from './text-input-editor.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        EditorModule,
        ProjectsServiceModule,
        ProjectGraphServiceModule,
    ],
    declarations: [
        TextInputEditorComponent
    ],
    exports: [
        TextInputEditorComponent
    ]
})
export class TextInputEditorModule {

}