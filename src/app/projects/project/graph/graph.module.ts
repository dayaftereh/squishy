import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { NodeComponentsModule } from './components/node-components.module';
import { GraphComponent } from './graph.component';
import { GraphContextMenuModule } from './context-menu/graph-context-menu.module';
import { ProjectsServiceModule } from '../../service/projects-service.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // PrimeNG
        ButtonModule,
        // Custom
        NodeComponentsModule,
        ProjectsServiceModule,
        GraphContextMenuModule,
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