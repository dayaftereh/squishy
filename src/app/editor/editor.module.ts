import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EditorComponent } from './editor.component';
import { EditorTypesServiceModule } from './types-service/editor-types-service.module';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // PrimeNG
        DialogModule,
        ButtonModule,
        MonacoEditorModule,
        // Custom
        EditorTypesServiceModule
    ],
    declarations: [
        EditorComponent,
    ],
    exports: [
        EditorComponent,
    ]
})
export class EditorModule {

}