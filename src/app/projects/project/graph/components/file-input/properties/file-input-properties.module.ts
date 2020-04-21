import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { FileInputPropertiesComponent } from './file-input-properties.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // PrimeNG
        InputTextModule
    ],
    declarations: [
        FileInputPropertiesComponent
    ],
    exports: [
        FileInputPropertiesComponent
    ]
})
export class FileInputPropertiesModule {

}