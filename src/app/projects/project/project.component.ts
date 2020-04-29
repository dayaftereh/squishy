import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SquishyProject } from '../service/squishy-project';
import { ProjectsService } from '../service/projects.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

    project: SquishyProject | undefined

    private subscription: Subscription | undefined

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly projectsService: ProjectsService) {
    }

    ngOnInit(): void {
        this.subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            if (project) {
                this.project = project
            } else {
                this.router.navigate(['/projects'])
            }
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}