import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ExecutorComponent } from './runner/executor/executor.component';
import { RunnerComponent } from './runner/runner.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'runner', component: RunnerComponent },
    { path: 'executor/:id', component: ExecutorComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'project/:id', component: ProjectComponent },
    {
        path: 'documentation', children: [
            { path: '**', component: DocumentationComponent }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [
        // Angular
        RouterModule.forRoot(routes, {
            useHash: true,
        })
    ],
    exports: [
        // Angular
        RouterModule
    ]
})
export class AppRoutingModule {

}