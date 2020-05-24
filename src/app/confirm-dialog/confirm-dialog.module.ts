import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule as NGConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // ngx-translate
        TranslateModule,
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