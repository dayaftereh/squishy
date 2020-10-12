import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LocalStorageServiceModule } from '../local-storage/local-storage-service.module';
import { ProjectsExamplesService } from './projects-examples.service';
import { ProjectsService } from './projects.service';

@NgModule({
    imports: [
        // Angular
        HttpClientModule,
        // custom
        LocalStorageServiceModule
    ],
    providers: [
        ProjectsService,
        ProjectsExamplesService
    ]
})
export class ProjectsServiceModule {

}