import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutionsRouteResolver } from './services/executions/executions-route-resolver';
import { TasksComponent } from './views/tasks/tasks.component';

const routes: Routes = [
    {
        path: 'tasks/:id', component: TasksComponent, resolve: { ExecutionsRouteResolver }
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