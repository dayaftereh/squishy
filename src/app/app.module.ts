import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { I18nModule } from './i18n/i18n.module';
import { ViewsModule } from './views/views.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // angular
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // markdown
        MarkdownModule.forRoot({ loader: HttpClient }),
        // i18n
        I18nModule.forRoot(),
        // routes
        AppRouterModule,
        // Custom
        ViewsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
