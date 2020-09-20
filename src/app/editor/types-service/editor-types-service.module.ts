import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorTypesService } from './editor-types.service';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        EditorTypesService
    ]
})
export class EditorTypesServiceModule {

}