import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { Tab } from './tab';
import { Tabs } from './tabs';

@Injectable()
export class TabsService {

    subject: BehaviorSubject<Tabs>;

    constructor() {
        this.subject = new BehaviorSubject<Tabs>({});
    }

    taps(): Observable<Tab[]> {
        return this.subject.pipe(map((tabs: Tabs) => {
            const keys: string[] = Object.keys(tabs);
            return keys.map((key: string) => {
                return tabs[key];
            });
        }));
    }

    close(id: string): void {
        const tabs: Tabs = this.subject.getValue();
        if (!tabs.hasOwnProperty(id)) {
            return;
        }
        delete tabs[id];
        this.subject.next(tabs);
    }

    newTab(): void {
        const tabs: Tabs = this.subject.getValue();
        const id: string = uuid.v4();
        tabs[id] = { id, name: 'Noname' } as Tab;
        this.subject.next(tabs);
    }

}
