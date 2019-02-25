import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';
import { LoadTaskFieldsComponent } from './load-task-fields.component';

@NgModule({
    imports: [
        //angular
        FormsModule,
        BrowserModule,
        //primeng
        ButtonModule,
        InputTextModule
    ],
    declarations: [
        LoadTaskFieldsComponent
    ],
    exports: [
        LoadTaskFieldsComponent
    ]
})
export class LoadTaskFieldsModule {

}