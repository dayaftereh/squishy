import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-documentation-menu',
    templateUrl: './documentation-menu.component.html'
})
export class DocumentationMenuComponent implements OnInit {

    items: MenuItem[]

    constructor() {
        this.items = []
    }

    async ngOnInit(): Promise<void> {
        this.items.push(
            {
                label: 'Home',
                routerLink: ["/home"],
                icon: 'pi pi-th-large'
            },
            {
                label: 'Script',
                routerLink: ["/documentation/script"],
                items: [
                    {
                        label: 'Context',
                        routerLink: ["/documentation/script/context"],
                    }
                ]
            },
            {
                label: 'File-Input',
                routerLink: ["/documentation/file-input"],
            },
            {
                label: 'File-Output',
                routerLink: ["/documentation/file-output"],
            },
            {
                label: 'Changelog',
                routerLink: ["/documentation/CHANGELOG"],
            }
        )
    }

}