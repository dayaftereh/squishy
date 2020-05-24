import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { Downloader } from 'src/app/utils/downloader';
import { Utils } from 'src/app/utils/utils';
import { ProjectsService } from '../../../projects-service/projects.service';
import { SquishyProject } from '../../../projects-service/squishy-project';
import { ProjectPropertiesComponent } from '../properties/project-properties.component';

@Component({
    templateUrl: './project-menu.component.html',
    selector: 'app-project-menu'
})
export class ProjectMenuComponent implements OnInit, OnDestroy {

    project: SquishyProject | undefined

    private subscription: Subscription | undefined

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly projectsService: ProjectsService,
        private readonly translateService: TranslateService,
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

    async openProperties(): Promise<void> {
        const title: string = await this.translateService.get(`projects.project.properties.header`).toPromise()

        this.propertiesDialogService.open({
            component: ProjectPropertiesComponent,
            title,
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