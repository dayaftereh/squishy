import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { FileInputNodeComponent } from './file-input-node.component';
import { ButtonModule } from 'primeng/button';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { FileInputPropertiesModule } from './properties/file-input-properties.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        PanelModule,
        ButtonModule,
        // rete
        ReteModule,
        // Custom
        FileInputPropertiesModule,
        PropertiesDialogServiceModule
    ],
    declarations: [
        FileInputNodeComponent
    ],
    exports: [
        FileInputNodeComponent
    ]
})
export class FileInputNodeModule {

}