import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScriptEditorComponent } from './script-editor.component';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // PrimeNG
        DialogModule,
        ButtonModule,
        MonacoEditorModule,
    ],
    declarations: [
        ScriptEditorComponent,
    ],
    exports: [
        ScriptEditorComponent,
    ]
})
export class ScriptEditorModule {

}