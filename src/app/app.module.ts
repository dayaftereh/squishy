import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ConfirmationService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { HomeModule } from './home/home.module';
import { ProjectModule } from './projects/project/project.module';
import { ProjectsModule } from './projects/projects.module';
import { PropertiesDialogModule } from './properties-dialog/properties-dialog.module';
import { RunnerModule } from './runner/runner.module';

@NgModule({
  imports: [
    // Angular    
    BrowserModule,
    BrowserAnimationsModule,
    // Routing
    AppRoutingModule,
    //MonacoEditor
    MonacoEditorModule.forRoot(),
    // custom
    HomeModule,
    RunnerModule,
    ProjectModule,
    ProjectsModule,
    ConfirmDialogModule,
    PropertiesDialogModule,
  ],
  providers: [
    ConfirmationService
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
