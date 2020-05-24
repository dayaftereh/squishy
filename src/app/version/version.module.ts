import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ButtonModule } from 'primeng/button';
import { VersionComponent } from './version.component';

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