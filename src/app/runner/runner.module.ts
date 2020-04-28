import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RunnerComponent } from './runner.component';

@NgModule({
    imports: [
        // angular
        BrowserModule
    ],
    declarations: [
        RunnerComponent
    ],
    exports: [
        RunnerComponent
    ]
})
export class RunnerModule {

}