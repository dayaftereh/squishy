import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RunnerComponent } from './runner.component';
import { ProjectsManagerModule } from '../projects-manager/projects-manager.module';
import { RouterModule } from '@angular/router';
import { ExecutorModule } from './executor/executor.module';

@NgModule({
    imports: [
        // angular
        RouterModule,
        BrowserModule,
        // Custom
        ExecutorModule,
        ProjectsManagerModule
    ],
    declarations: [
        RunnerComponent
    ],
    exports: [
        RunnerComponent
    ]
})
export class RunnerModule {

}