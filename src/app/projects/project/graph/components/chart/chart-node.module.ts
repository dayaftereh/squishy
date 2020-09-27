import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogServiceModule } from 'src/app/properties-dialog/service/properties-dialog-service.module';
import { ChartNodeComponent } from './chart-node.component';
import { ChartDatasetModule } from './dataset/chart-dataset.module';
import { ChartPropertiesModule } from './properties/chart-properties.module';

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
        ChartDatasetModule,
        ChartPropertiesModule,
        PropertiesDialogServiceModule
    ],
    declarations: [
        ChartNodeComponent
    ],
    exports: [
        ChartNodeComponent
    ]
})
export class ChartNodeModule {

}