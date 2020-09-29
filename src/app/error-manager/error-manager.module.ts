import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ErrorManagerComponent } from './error-manager.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ErrorManagerServiceModule } from './service/error-manager-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        PanelModule,
        ToastModule,
        // ngx-translate,
        TranslateModule,
        // Custom
        ErrorManagerServiceModule
    ],
    providers: [
        MessageService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    declarations: [
        ErrorManagerComponent
    ],
    exports: [
        ErrorManagerComponent
    ]
})
export class ErrorManagerModule { }