import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { NodeComponentsModule } from './components/node-components.module';
import { GraphComponent } from './graph.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // Custom
        NodeComponentsModule
    ],
    declarations: [
        GraphComponent
    ],
    exports: [
        GraphComponent
    ]
})
export class GraphModule {

}