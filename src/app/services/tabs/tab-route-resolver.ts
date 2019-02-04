import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TabRouteResolverService } from './tab-route-resolver.service';

@Injectable()
export class TabRouteResolver implements Resolve<void> {

    constructor(private readonly tabRouteResolverService: TabRouteResolverService) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const id: string | null = route.paramMap.get('id');
        if (id) {
            this.tabRouteResolverService.emit(id);
        } else {
            this.tabRouteResolverService.emit(undefined);
        }
    }
}