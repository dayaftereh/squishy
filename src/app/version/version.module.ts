import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { VersionComponent } from './version.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // Primeng
        ButtonModule,
        // fortawesome
        FontAwesomeModule,
    ],
    declarations: [
        VersionComponent
    ],
    exports: [
        VersionComponent
    ]
})
export class VersionModule {

    constructor(library: FaIconLibrary) {
        library.addIcons(faGithub)
    }

}