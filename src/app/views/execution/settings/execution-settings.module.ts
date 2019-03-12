import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/primeng';
import { ExecutionSettingsComponent } from './execution-settings.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        ReactiveFormsModule,
        //primeng
        DialogModule,
        InputTextModule
    ],
    declarations: [
        ExecutionSettingsComponent
    ],
    exports: []
})
export class ExecutionSettingsModule {

}