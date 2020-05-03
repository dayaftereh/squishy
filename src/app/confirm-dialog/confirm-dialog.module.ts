import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogModule as NGConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimNG
        NGConfirmDialogModule
    ],
    providers: [
        ConfirmationService
    ],
    declarations: [
        ConfirmDialogComponent
    ],
    exports: [
        ConfirmDialogComponent
    ]
})
export class ConfirmDialogModule {

}