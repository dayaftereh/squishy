import { NgModule } from '@angular/core';
import { ExecutionsRouteResolver } from './executions-route-resolver';
import { ExecutionsRouteResolverService } from './executions-route-resolver.service';
import { ExecutionsService } from './executions.service';

@NgModule({
    providers: [
        ExecutionsService,
        ExecutionsRouteResolver,
        ExecutionsRouteResolverService
    ]
})
export class ExecutionsServiceModule {

}