import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { ScriptPropertiesComponent } from './script-properties.component';
@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // PrimeNG
        InputTextModule
    ],
    declarations: [
        ScriptPropertiesComponent
    ],
    exports: [
        ScriptPropertiesComponent
    ]
})
export class ScriptPropertiesModule {

}