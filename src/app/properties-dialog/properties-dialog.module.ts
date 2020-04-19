import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PropertiesDialogComponent } from './properties-dialog.component';
import { PropertiesDialogServiceModule } from './service/properties-dialog-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimeNG
        DialogModule,
        ButtonModule,
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