import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabRouteResolver } from './services/tabs/tab-route-resolver';
import { TaskListComponent } from './views/task-list/task-list.component';

const routes: Routes = [
    {
        path: 'task-list/:id', component: TaskListComponent, resolve: { TabRouteResolver }
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