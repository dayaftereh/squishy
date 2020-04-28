import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ProjectsService } from './service/projects.service';
import { Subscription, pipe } from 'rxjs';
import { SquishyProject } from './service/squishy-project';
import { map } from 'rxjs/operators';
import { Utils } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
    templateUrl: './projects.component.html',
    styleUrls: [
        './projects.component.scss'
    ]
})
export class ProjectsComponent implements OnInit, OnDestroy {

    projects: SelectItem[] | undefined

    private subscription: Subscription | undefined

    constructor(private readonly projectsService: ProjectsService, private readonly router: Router) {

    }

    ngOnInit(): void {
        this.subscription = this.projectsService.projects()
            .pipe(
                map((projects: { [key: string]: SquishyProject }) => {
                    return Utils.mapProperties(projects, (value: SquishyProject) => {
                        return value
                    })
                }),
                map((projects: SquishyProject[]) => {
                    // convert projects to select items
                    return projects.map((project: SquishyProject) => {
                        return {
                            label: project.name,
                            value: project
                        } as SelectItem
                    })
                })
            )
            .subscribe((projects: SelectItem[]) => {
                this.projects = projects
            })
    }

    async onDblClick(event: any): Promise<void> {
        // check if event fired and has a selection
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.value)) {
            return
        }
        // get the project
        const project: SquishyProject = event.value as SquishyProject
        // open the project by id
        await this.router.navigate(['/project', project.id])
    }

    createProject(): void {
        this.projectsService.create("foo" + this.projects.length)
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}