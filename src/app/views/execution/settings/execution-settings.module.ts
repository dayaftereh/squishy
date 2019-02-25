import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { ExecutionSettingsDialogComponent } from './execution-settings-dialog.component';
import { ExecutionSettingsComponent } from './execution-settings.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        //primeng
        DialogModule
    ],
    declarations: [
        ExecutionSettingsComponent,
        ExecutionSettingsDialogComponent
    ]
})
export class ExecutionSettingsModule {

}