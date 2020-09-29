import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ExecutorServiceModule } from 'src/app/executor-service/executor-service.module';
import { ChartExecutorComponent } from './chart-executor.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        CardModule,
        ChartModule,
        // Custom
        ExecutorServiceModule
    ],
    declarations: [
        ChartExecutorComponent
    ],
    exports: [
        ChartExecutorComponent
    ]
})
export class ChartExecutorModule {

}