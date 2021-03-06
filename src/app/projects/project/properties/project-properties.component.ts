import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectsService } from '../../../projects-service/projects.service';
import { SquishyProject } from '../../../projects-service/squishy-project';
import { ProjectGraphService } from '../graph/service/project-graph.service';

@Component({
    templateUrl: './project-properties.component.html'
})
export class ProjectPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        // check if a project given
        if (Utils.isNullOrUndefined(this.project)) {
            return
        }

        this.project.name = this.getFormValue('name', this.project.name)

        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setProject(project: SquishyProject | undefined): void {
        if (Utils.isNullOrUndefined(project)) {
            return
        }

        this.project = project

        // check if porject exists
        if (this.formGroup) {
            this.formGroup.patchValue({
                name: this.project.name
            })
        }
    }
}