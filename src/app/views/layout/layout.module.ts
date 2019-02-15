import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ExecutionsModule } from '../executions/executions.module';
import { ExecutorModule } from '../executor/executor.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        // angular
        RouterModule,
        BrowserModule,
        // custom
        ExecutorModule,
        ExecutionsModule
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {

}