import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProjectsServiceModule } from 'src/app/projects-service/projects-service.module';
import { ExecutorMenuComponent } from './executor-menu.component';

@NgModule({
    imports: [
        // Angular
        RouterModule,
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // Custom
        ProjectsServiceModule,
    ],
    declarations: [
        ExecutorMenuComponent
    ],
    exports: [
        ExecutorMenuComponent
    ]
})
export class ExecutorMenuModule {

}