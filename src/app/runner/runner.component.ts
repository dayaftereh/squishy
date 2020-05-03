import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SquishyProject } from '../projects-service/squishy-project';
import { Utils } from '../utils/utils';

@Component({
    templateUrl: './runner.component.html'
})
export class RunnerComponent {

    constructor(private readonly router: Router) {

    }

    onProject(project: SquishyProject): void {
        if (Utils.isNullOrUndefined(project)) {
            return
        }

        this.router.navigate(['/executor', project.id])
    }

}