import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './projects/project/project.component';

const routes: Routes = [
    { path: 'project', component: ProjectComponent },
    { path: '', redirectTo: '/project', pathMatch: 'full' }
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