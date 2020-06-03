import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, `./assets/i18n/`);
}

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        HttpClientModule,
        // ngx-translate,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ]
})
export class I18NModule {

    constructor(private readonly translateService: TranslateService) {
        this.initLanguage()
    }

    private initLanguage(): void {
        // get the configured languages
        const languages: string[] = ['en']
        // get the default language
        const defaultLanguage: string = languages[0]
        // add all languages
        this.translateService.addLangs(languages)
        // set the default language
        this.translateService.setDefaultLang('en');

        // find the browser language
        const browserLanguage: string = this.findProwserLanguage(languages)
        // check if the beowser language supported
        if (browserLanguage) {
            // set the browser language
            this.translateService.use(browserLanguage)
        } else {
            // if not, use the default language
            this.translateService.use(defaultLanguage)
        }
    }

    private findProwserLanguage(languages: string[]): string | undefined {
        // get the current browser language
        const browserLanguage: string = this.translateService.getBrowserLang();
        // try to find the language
        const found: string | undefined = languages.find((language: string) => {
            return browserLanguage === language
        })

        return found
    }

}