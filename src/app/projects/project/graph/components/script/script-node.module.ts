import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogModule } from 'src/app/properties-dialog/properties-dialog.module';
import { ScriptNodeComponent } from './script-node.component';
import { ScriptEditorModule } from './script-editor/script-editor.module';
import { ScriptPropertiesModule } from './properties/script-properties.module';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';

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
        ScriptEditorModule,
        ScriptPropertiesModule,
        PropertiesDialogServiceModule
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