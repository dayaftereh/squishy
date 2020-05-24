import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ExecutorServiceModule } from 'src/app/executor-service/executor-service.module';
import { ExecuteDialogComponent } from './execute-dialog.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        DialogModule,
        ButtonModule,
        ProgressBarModule,
        // ngx-translate,
        TranslateModule,
        // Custom
        ExecutorServiceModule,
    ],
    declarations: [
        ExecuteDialogComponent
    ],
    exports: [
        ExecuteDialogComponent
    ]
})
export class ExecuteDialogModule {

}