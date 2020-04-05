import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectModule } from './projects/project/project.module';

@NgModule({
  imports: [
    // Angular    
    BrowserModule,
    BrowserAnimationsModule,
    // Routing
    AppRoutingModule,
    // custom
    ProjectModule
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
