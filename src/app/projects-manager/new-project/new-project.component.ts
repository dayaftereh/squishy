import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FormUtils } from 'src/app/utils/form-utils';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './new-project.component.html'
})
export class NewProjectComponent extends AbstractPropertiesDialogChildComponent {

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
    ) {
        super(activatedRoute, projectsService)
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        const name: string = this.getFormValue('name', 'Noname')
        this.projectsService.create(name)
    }
}