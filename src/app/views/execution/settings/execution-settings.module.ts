import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/primeng';
import { ExecutionSettingsDialogComponent } from './execution-settings-dialog.component';
import { ExecutionSettingsComponent } from './execution-settings.component';
import { ExecutionSettingsServiceModule } from './service/execution-settings-service.module';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        ReactiveFormsModule,
        //primeng
        DialogModule,
        InputTextModule,
        //custom
        ExecutionSettingsServiceModule
    ],
    declarations: [
        ExecutionSettingsComponent,
        ExecutionSettingsDialogComponent
    ],
    exports: [
        ExecutionSettingsServiceModule,
        ExecutionSettingsDialogComponent
    ]
})
export class ExecutionSettingsModule {

}