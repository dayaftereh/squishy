import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExecutorComponent } from './executor.component';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        ProjectsServiceModule,
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