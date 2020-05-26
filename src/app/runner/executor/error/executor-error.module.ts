import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesModule } from 'primeng/messages';
import { ExecutorErrorComponent } from './executor-error.component';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        // Primeng
        MessagesModule
    ],
    declarations: [
        ExecutorErrorComponent
    ],
    exports: [
        ExecutorErrorComponent
    ],
    providers: [MessageService]
})
export class ExecutorErrorModule {

}