import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutionsRouteResolver } from './services/executions/executions-route-resolver';
import { ExecutionComponent } from './views/execution/execution.component';

const routes: Routes = [
    {
        path: 'execution/:id', component: ExecutionComponent, resolve: { ExecutionsRouteResolver }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {

}