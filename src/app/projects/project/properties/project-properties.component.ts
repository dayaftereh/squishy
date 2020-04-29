import { Component } from '@angular/core';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectsService } from '../../service/projects.service';
import { Utils } from 'src/app/utils/utils';
import { SquishyProject } from '../../service/squishy-project';

@Component({
    templateUrl: './project-properties.component.html'
})
export class ProjectPropertiesComponent implements PropertiesDialogChild {

    formGroup: FormGroup | undefined

    project: SquishyProject | undefined

    constructor(private readonly projectsService: ProjectsService) {
        this.initFormGroup()
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        // check if a project given
        if (Utils.isNullOrUndefined(this.project)) {
            return
        }
        this.project.name = Utils.getFormValue(this.formGroup, 'name', this.project.name)
        // notify about project change
        this.projectsService.update(this.project)
    }

    async cancel(): Promise<void> {

    }

    setProject(project: SquishyProject | undefined): void {
        this.project = project

        // check if porject exists
        if (this.project) {
            this.formGroup.patchValue({
                name: this.project.name
            })
        }
    }

}