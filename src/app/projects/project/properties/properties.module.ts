import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PropertiesComponent } from './properties.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule
    ],
    declarations: [
        PropertiesComponent
    ],
    exports: [
        PropertiesComponent
    ]
})
export class PropertiesModule {

}