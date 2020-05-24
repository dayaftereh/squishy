import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { FileOutputNodeComponent } from './file-output-node.component';
import { FileOutputPropertiesModule } from './properties/file-output-properties.module';

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
        FileOutputPropertiesModule,
        PropertiesDialogServiceModule
    ],
    declarations: [
        FileOutputNodeComponent
    ],
    exports: [
        FileOutputNodeComponent
    ]
})
export class FileOutputNodeModule {

}