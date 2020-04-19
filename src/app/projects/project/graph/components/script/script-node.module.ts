import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { ScriptNodeComponent } from './script-node.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ScriptEditorServiceModule } from 'src/app/script-editor/service/script-editor-service.module';
import { PropertiesDialogModule } from 'src/app/properties-dialog/properties-dialog.module';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // Primeng
        PanelModule,
        ButtonModule,
        InputTextModule,
        // rete
        ReteModule,
        // Custom
        ScriptEditorServiceModule,
        PropertiesDialogModule
    ],
    declarations: [
        ScriptNodeComponent
    ],
    exports: [
        ScriptNodeComponent
    ]
})
export class ScriptNodeModule {

}