import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectComponent } from './project.component';
import { GraphModule } from './graph/graph.module';
import { PropertiesModule } from './properties/properties.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Custom
        GraphModule,
        PropertiesModule
    ],
    declarations: [
        ProjectComponent
    ],
    exports: [
        ProjectComponent
    ]
})
export class ProjectModule { }