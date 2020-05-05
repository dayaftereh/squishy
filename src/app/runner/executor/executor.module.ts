import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ExecutorServiceModule } from '../../executor-service/executor-service.module';
import { ExecutorComponent } from './executor.component';
import { FileInputExecutorModule } from './file-input/file-input-executor.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // Custom
        ExecutorServiceModule,
        ProjectsServiceModule,
        FileInputExecutorModule,
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