import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ExecutionsRouteResolverService } from './executions-route-resolver.service';

@Injectable()
export class ExecutionsRouteResolver implements Resolve<void> {

    constructor(private readonly executionsRouteResolverService: ExecutionsRouteResolverService) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const id: string | null = route.paramMap.get('id');
        if (id) {
            this.executionsRouteResolverService.emit(id);
        } else {
            this.executionsRouteResolverService.emit(undefined);
        }
    }
}