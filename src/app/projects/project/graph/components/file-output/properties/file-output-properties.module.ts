import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { FileOutputPropertiesComponent } from './file-output-properties.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // PrimeNG
        InputTextModule
    ],
    declarations: [
        FileOutputPropertiesComponent
    ],
    exports: [
        FileOutputPropertiesComponent
    ]
})
export class FileOutputPropertiesModule {

}