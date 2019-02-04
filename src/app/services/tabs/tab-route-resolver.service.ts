import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Tab } from './tab';
import { TabsService } from './tabs.service';

@Injectable()
export class TabRouteResolverService {

    private subject: BehaviorSubject<string | undefined>;

    constructor(private readonly tabsService: TabsService) {
        this.subject = new BehaviorSubject<string | undefined>(undefined);
    }

    tab(): Observable<Tab | undefined> {
        return this.subject.pipe(flatMap((id: string | undefined) => {
            if (!id) {
                return of(undefined);
            }
            return this.tabsService.tap(id);
        }));
    }

    emit(id: string | undefined): void {
        console.log(id)
        this.subject.next(id);
    }

    update(tab: Tab, emitEvent?: boolean): void {
        this.tabsService.update(tab, emitEvent);
    }

}
