import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileInputPropertiesComponent } from './file-input-properties.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // PrimeNG
        DropdownModule,
        InputTextModule,
        SelectButtonModule,
        AutoCompleteModule
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