import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutionsRouteResolver } from './services/executions/executions-route-resolver';
import { ExecutionComponent } from './views/execution/execution.component';
import { ExecutionRunComponent } from './views/execution/run/execution-run.component';
import { ExecutionSettingsComponent } from './views/execution/settings/execution-settings.component';
import { TasksComponent } from './views/execution/tasks/tasks.component';

const routes: Routes = [
    {
        path: 'execution/:id', component: ExecutionComponent, resolve: { ExecutionsRouteResolver }, children: [
            { path: 'run', component: ExecutionRunComponent, outlet: `execution` },
            { path: 'tasks', component: TasksComponent, outlet: `execution` },
            { path: 'settings', component: ExecutionSettingsComponent, outlet: `execution` }
        ]
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