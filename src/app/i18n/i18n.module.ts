import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FakeMissingTranslationHandler, MissingTranslationHandler, TranslateCompiler, TranslateDefaultParser, TranslateFakeCompiler, TranslateLoader, TranslateModule, TranslateModuleConfig, TranslateParser, TranslateService, TranslateStore, USE_DEFAULT_LANG, USE_STORE } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// the default lang is english
const defaultLanguage: string = 'en';

@NgModule({
    exports: [
        TranslateModule
    ]
})
export class I18nModule {

    static forRoot(config: TranslateModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: I18nModule,
            providers: [
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.loader || { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                TranslateStore,
                TranslateService
            ]
        };
    }

    constructor(private readonly translateService: TranslateService) {
        this.translateService.setDefaultLang(defaultLanguage);
        this.updateLanguage();
        window.addEventListener('languagechange', () => this.updateLanguage());
    }

    updateLanguage() {
        this.translateService.use(this.translateService.getBrowserLang());
    }


}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}