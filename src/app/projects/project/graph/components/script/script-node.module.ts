import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { ScriptPropertiesModule } from './properties/script-properties.module';
import { ScriptEditorModule } from './script-editor/script-editor.module';
import { ScriptNodeComponent } from './script-node.component';

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
        // ngx-translate,
        TranslateModule,
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