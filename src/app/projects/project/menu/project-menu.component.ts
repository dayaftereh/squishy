import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../service/projects.service';
import { SquishyProject } from '../../service/squishy-project';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { ProjectPropertiesComponent } from '../properties/project-properties.component';

@Component({
    templateUrl: './project-menu.component.html',
    selector: 'app-project-menu'
})
export class ProjectMenuComponent {

    project: SquishyProject | undefined

    private subscription: Subscription | undefined

    constructor(
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

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}