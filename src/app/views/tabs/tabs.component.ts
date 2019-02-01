import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tab } from '../../services/tabs/tab';
import { TabsService } from '../../services/tabs/tabs.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html'
})
export class TabsComponent {

    items: Observable<MenuItem[]>;

    constructor(private readonly tabsService: TabsService) {
        this.items = tabsService.taps().pipe(map((tabs: Tab[]) => {
            const menuItems: MenuItem[] = tabs.map((tab: Tab) => {
                return {
                    id: tab.id,
                    label: tab.name,
                    routerLink: ['task-list', tab.id]
                } as MenuItem;
            });

            return menuItems;
        }));
    }

    closeTab(menuItem: MenuItem): void {
        if (!menuItem.id) {
            return;
        }
        this.tabsService.close(menuItem.id);
    }

    newTab(): void {
        console.log('new Tab');
        this.tabsService.newTab();
    }

}