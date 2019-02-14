import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { OutputTask } from '../../../core/exectuion/task/output/output-task';
import { TaskType } from '../../../core/exectuion/task/task-type';
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

    tap(id: string): Observable<Tab | undefined> {
        return this.subject.pipe(map((tabs: Tabs) => {
            if (tabs.hasOwnProperty(id)) {
                return tabs[id];
            }
            return undefined;
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
        const tab: Tab = this.createTab();
        this.update(tab, true);
    }

    private createTab(name?: string): Tab {
        if (!name) {
            // todo i18n
            name = 'Noname';
        }
        const id: string = uuid.v4();

        const tab: Tab = {
            id,
            name,
            tasks: {},
            output: {
                type: TaskType.OUTPUT,
                id: uuid.v4(),
                filename: 'output.csv',
                name: 'Default-Output'
            } as OutputTask
        } as Tab;

        return tab;
    }

    update(tab: Tab, emitEvent?: boolean): void {
        const tabs: Tabs = this.subject.getValue();
        tabs[tab.id] = tab;
        if (emitEvent) {
            this.subject.next(tabs);
        }
    }

}
