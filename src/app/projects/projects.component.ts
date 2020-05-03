import { Component } from '@angular/core';
import { SquishyProject } from '../projects-service/squishy-project';
import { Router } from '@angular/router';
import { Utils } from '../utils/utils';

@Component({
    templateUrl: './projects.component.html'
})
export class ProjectsComponent {

    constructor(private readonly router: Router) {

    }

    onProject(project: SquishyProject): void {
        if (Utils.isNullOrUndefined(project)) {
            return
        }
        
        this.router.navigate(['/project', project.id])
    }

}