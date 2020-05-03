import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SquishyProject } from '../projects-service/squishy-project';

@Component({
    templateUrl: './projects-manager.component.html',
    selector: 'app-projects-manager'
})
export class ProjectsManagerComponent {

    @Output()
    onProject: EventEmitter<SquishyProject>

    constructor() {
        this.onProject = new EventEmitter<SquishyProject>(true)
    }

    onProjectSelected(project: SquishyProject): void {
        if (this.onProject) {
            this.onProject.emit(project)
        }
    }

}