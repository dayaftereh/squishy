import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScriptEditorComponent } from './script-editor.component';
import { ScriptEditorServiceModule } from './service/script-editor-service.module';
import { ScriptEditorDialogComponent } from './script-editor-dialog.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // PrimeNG
        DialogModule,
        ButtonModule,      
        MonacoEditorModule,
        // custom
        ScriptEditorServiceModule
    ],
    declarations: [
        ScriptEditorComponent,
        ScriptEditorDialogComponent
    ],
    exports: [
        ScriptEditorComponent,
        ScriptEditorDialogComponent
    ]
})
export class ScriptEditorModule {

}