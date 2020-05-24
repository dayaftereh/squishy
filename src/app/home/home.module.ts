import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        // angular
        RouterModule,
        BrowserModule,
        // PrimeNG
        CardModule,
        ButtonModule,
        // ngx-translate,
        TranslateModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {

}