import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { View3DInputModule } from './input/view3d-input.module';
import { View3DPropertiesModule } from './properties/view3d-properties.module';
import { View3DNodeComponent } from './view3d-node.component';

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
        View3DInputModule,
        View3DPropertiesModule,
        PropertiesDialogServiceModule
    ],
    declarations: [
        View3DNodeComponent
    ],
    exports: [
        View3DNodeComponent
    ]
})
export class View3DNodeModule {

}