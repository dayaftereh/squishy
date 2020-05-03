import { Component, OnInit, OnDestroy } from '@angular/core';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';

@Component({
    templateUrl: './executor.component.html'
})
export class ExecutorComponent implements OnInit, OnDestroy {

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
                this.router.navigate(['/runner'])
            }
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}