import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ErrorManagerServiceModule } from 'src/app/error-manager/service/error-manager-service.module';
import { ProjectsServiceModule } from '../../../projects-service/projects-service.module';
import { NodeComponentsModule } from './components/node-components.module';
import { GraphContextMenuModule } from './context-menu/graph-context-menu.module';
import { GraphComponent } from './graph.component';
import { ProjectGraphServiceModule } from './service/project-graph-service.module';

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
        ProjectGraphServiceModule,
        ErrorManagerServiceModule,
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