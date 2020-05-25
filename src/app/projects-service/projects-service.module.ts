import { NgModule } from '@angular/core';
import { ProjectsService } from './projects.service';
import { LocalStorageServiceModule } from '../local-storage/local-storage-service.module';

@NgModule({
    imports: [
        // custom
        LocalStorageServiceModule
    ],
    providers: [
        ProjectsService
    ]
})
export class ProjectsServiceModule {

}