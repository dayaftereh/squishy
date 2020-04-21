import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from 'src/app/editor/editor.module';
import { ScriptEditorComponent } from './script-editor.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        EditorModule
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