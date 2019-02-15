import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';
import { OutputTaskFieldsComponent } from './output-task-fields.component';

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
        OutputTaskFieldsComponent
    ],
    exports: [
        OutputTaskFieldsComponent
    ]
})
export class OutputTaskFieldsModule {

}