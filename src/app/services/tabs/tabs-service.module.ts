import { NgModule } from '@angular/core';
import { TabRouteResolver } from './tab-route-resolver';
import { TabRouteResolverService } from './tab-route-resolver.service';
import { TabsService } from './tabs.service';

@NgModule({
    providers: [
        TabsService,
        TabRouteResolver,
        TabRouteResolverService
    ]
})
export class TabsServiceModule {

}