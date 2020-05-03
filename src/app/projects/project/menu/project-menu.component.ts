import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../../projects-service/projects.service';
import { SquishyProject } from '../../../projects-service/squishy-project';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { ProjectPropertiesComponent } from '../properties/project-properties.component';
import { Downloader } from 'src/app/utils/downloader';
import { Utils } from 'src/app/utils/utils';

@Component({
    templateUrl: './project-menu.component.html',
    selector: 'app-project-menu'
})
export class ProjectMenuComponent {

    project: SquishyProject | undefined

    private subscription: Subscription | undefined

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly projectsService: ProjectsService,
        private readonly propertiesDialogService: PropertiesDialogService
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            if (project) {
                this.project = project
            }
        })
    }

    openProperties(): void {
        this.propertiesDialogService.open({
            component: ProjectPropertiesComponent,
            title: 'Project',
            onInit: (component: ProjectPropertiesComponent) => {
                component.setProject(this.project)
            }
        })
    }

    downloadProject(): void {
        // check if a project is loaded
        if (!this.project) {
            return
        }
        // download the project
        Downloader.downloadPorjects([this.project])
    }

    execute(): void {
        if (Utils.isNullOrUndefined(this.project)) {
            return
        }
        this.router.navigate(["/executor", this.project.id])
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}