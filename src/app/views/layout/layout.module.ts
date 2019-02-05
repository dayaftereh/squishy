import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ExecutorModule } from '../executor/executor.module';
import { TabsModule } from '../tabs/tabs.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        // angular
        RouterModule,
        BrowserModule,
        // custom
        TabsModule,
        ExecutorModule
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