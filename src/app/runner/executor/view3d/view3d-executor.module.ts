import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ExecutorServiceModule } from 'src/app/executor-service/executor-service.module';
import { View3DExecutorComponent } from './view3d-executor.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        // PrimeNG
        CardModule,
        // Custom
        ExecutorServiceModule
    ],
    declarations: [
        View3DExecutorComponent
    ],
    exports: [
        View3DExecutorComponent
    ]
})
export class View3DExecutorModule {

}