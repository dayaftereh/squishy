import { Component, OnInit } from '@angular/core';
import { PackageJSON } from '../package-json';

@Component({
    selector: 'app-version',
    templateUrl: './version.component.html',
    styleUrls: [
        './version.component.scss'
    ]
})
export class VersionComponent implements OnInit {

    name: string | undefined
    version: string | undefined
    homepage: string | undefined

    constructor() {
    }

    ngOnInit(): void {
        const packageJson: PackageJSON = new PackageJSON()
        this.name = packageJson.name;
        this.version = packageJson.version
        this.homepage = packageJson.homepage
    }

}