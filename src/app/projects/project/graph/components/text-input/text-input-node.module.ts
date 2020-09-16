import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { TextInputPropertiesModule } from './properties/text-input-properties.module';
import { TextInputEditorModule } from './text-input-editor/text-input-editor.module';
import { TextInputNodeComponent } from './text-input-node.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        PanelModule,
        ButtonModule,
        // rete
        ReteModule,
        // ngx-translate,
        TranslateModule,
        // Custom
        TextInputEditorModule,
        TextInputPropertiesModule,
        PropertiesDialogServiceModule
    ],
    declarations: [
        TextInputNodeComponent
    ],
    exports: [
        TextInputNodeComponent
    ]
})
export class TextInputNodeModule {

}