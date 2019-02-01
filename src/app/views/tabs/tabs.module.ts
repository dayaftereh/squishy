import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule, TabMenuModule } from 'primeng/primeng';
import { TabsServiceModule } from '../../services/tabs/tabs-service.module';
import { TabsComponent } from './tabs.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,
        // primeng
        ButtonModule,
        TabMenuModule,
        // custom
        TabsServiceModule
    ],
    declarations: [
        TabsComponent
    ],
    exports: [
        TabsComponent
    ]
})
export class TabsModule {

}