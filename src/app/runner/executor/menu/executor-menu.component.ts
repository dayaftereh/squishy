import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { Subscription } from 'rxjs';
import { Downloader } from 'src/app/utils/downloader';

@Component({
    templateUrl: './executor-menu.component.html',
    selector: 'app-executor-menu'
})
export class ExecutorMenuComponent {

    project: SquishyProject | undefined

    private subscription: Subscription | undefined

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly projectsService: ProjectsService) {

    }

    ngOnInit(): void {
        this.subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            if (project) {
                this.project = project
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

}