import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, DropdownModule } from 'primeng/primeng';
import { ScriptTaskInputComponent } from './script-task-input.component';

@NgModule({
    imports: [
        //angular
        FormsModule,
        BrowserModule,
        //primeng
        ButtonModule,
        DropdownModule
    ],
    declarations: [
        ScriptTaskInputComponent
    ],
    exports: [
        ScriptTaskInputComponent
    ]
})
export class ScriptTaskInputModule {

}