import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ConfirmationService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { DocumentationModule } from './documentation/documentation.module';
import { ErrorManagerModule } from './error-manager/error-manager.module';
import { HomeModule } from './home/home.module';
import { I18NModule } from './i18n/i18n.module';
import { ProjectModule } from './projects/project/project.module';
import { ProjectsModule } from './projects/projects.module';
import { PropertiesDialogModule } from './properties-dialog/properties-dialog.module';
import { ExecuteDialogModule } from './runner/executor/execute-dialog/execute-dialog.module';
import { RunnerModule } from './runner/runner.module';
import { VersionModule } from './version/version.module';

@NgModule({
  imports: [
    // Angular    
    BrowserModule,
    BrowserAnimationsModule,
    // Routing
    AppRoutingModule,
    //MonacoEditor
    MonacoEditorModule.forRoot(),
    // I18n
    I18NModule,
    // custom
    HomeModule,
    RunnerModule,
    VersionModule,
    ProjectModule,
    ProjectsModule,
    ErrorManagerModule,
    DocumentationModule,
    ExecuteDialogModule,
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
