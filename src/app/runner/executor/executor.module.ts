import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExecutorComponent } from './executor.component';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { FileInputExecutorModule } from './file-input/file-input-executor.module';
import { ButtonModule } from 'primeng/button';
import { ExecutorServiceModule } from './executor-service/executor-service.module';

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