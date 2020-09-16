import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ErrorManagerServiceModule } from 'src/app/error-manager/service/error-manager-service.module';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ExecutorServiceModule } from '../../executor-service/executor-service.module';
import { ExecutorComponent } from './executor.component';
import { FileInputExecutorModule } from './file-input/file-input-executor.module';
import { ExecutorMenuModule } from './menu/executor-menu.module';
import { TextInputExecutorModule } from './text-input-executor/text-input-executor.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // ngx-translate,
        TranslateModule,
        // Custom
        ExecutorMenuModule,
        ExecutorServiceModule,
        ProjectsServiceModule,
        TextInputExecutorModule,
        FileInputExecutorModule,
        ErrorManagerServiceModule,
    ],
    declarations: [
        ExecutorComponent
    ],
    exports: [
        ExecutorComponent
    ]
})
export class ExecutorModule {

}