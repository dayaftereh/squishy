import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PropertiesDialogComponent } from './properties-dialog.component';
import { PropertiesDialogServiceModule } from './service/properties-dialog-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimeNG
        DialogModule,
        ButtonModule,
        ScrollPanelModule,
        // ngx-translate,
        TranslateModule,
        // custom
        PropertiesDialogServiceModule
    ],
    declarations: [
        PropertiesDialogComponent
    ],
    exports: [
        PropertiesDialogComponent
    ]
})
export class PropertiesDialogModule {

}