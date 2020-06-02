import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from 'src/app/editor/editor.module';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ProjectGraphServiceModule } from '../../../service/project-graph-service.module';
import { ScriptEditorComponent } from './script-editor.component';

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
        ScriptEditorComponent
    ],
    exports: [
        ScriptEditorComponent
    ]
})
export class ScriptEditorModule {

}