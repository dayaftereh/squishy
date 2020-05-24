import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileInputPropertiesComponent } from './file-input-properties.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        ReactiveFormsModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        SelectButtonModule,
        AutoCompleteModule,
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